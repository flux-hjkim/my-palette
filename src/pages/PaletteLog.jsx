import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PaletteLog.css";
import SubColorModal from "../components/SubColorModal";

function PaletteLog({ colorGroups, onDelete }) {
  const [selectedSubColor, setSelectedSubColor] = useState(null);

  const navigate = useNavigate();

  const allSubColors = useMemo(() => {
    return colorGroups.flatMap((group) =>
      group.subColors.map((subColor) => ({
        ...subColor,
        groupId: group.id,
        groupName: group.groupName,
      })),
    );
  }, [colorGroups]);

  // YYYY-MM 형태로 createdAt만 모은 배열 생성
  const recordedMonths = allSubColors.map((subColor) => {
    return subColor.createdAt.slice(0, 7);
  });

  // 배열 내 중복 제거 후 새 배열 저장
  const uniqueMonths = [...new Set(recordedMonths)];
  // 중복 제거된 배열을 날짜순으로 정렬
  const sortedMonths = [...uniqueMonths].sort();
  // 가장 최근 월 위치 번호 state 기억
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    sortedMonths.length > 0 ? sortedMonths.length - 1 : 0,
  );
  // 현재 보고 있는 월의 위치 번호 currentMonthIndex를 통해 현재 보고 있는 월 저장
  const currentMonth = sortedMonths[currentMonthIndex] ?? "";
  // 연, 월 분리
  const [yearString, monthString] = currentMonth.split("-");
  // 연, 월을 string에서 number로 변경
  const year = currentMonth ? Number(yearString) : null;
  const month = currentMonth ? Number(monthString) - 1 : null;

  // 매월 몇일까지 있는지 계산, 각 달의 1일이 무슨 요일인지 계산(요일은 0부터 숫자로 나타남)
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const groupedSubColors = useMemo(() => {
    return allSubColors.reduce((groupedByDate, subColor) => {
      if (!groupedByDate[subColor.createdAt]) {
        groupedByDate[subColor.createdAt] = [];
      }

      groupedByDate[subColor.createdAt].push(subColor);

      return groupedByDate;
    }, {});
  }, [allSubColors]);

  // 공백을 포함한 월별 날짜 배열 만들기
  const calendarDays = useMemo(() => {
    if (!currentMonth) {
      return []; // 기록이 없을 때 빈 배열 반환
    }
    const emptyDays = Array(firstDayOfMonth).fill(null);
    const monthDays = Array.from(
      { length: daysInMonth },
      (_, index) => index + 1,
    );

    return [...emptyDays, ...monthDays];
  }, [firstDayOfMonth, daysInMonth]);

  const handleEdit = (subColor) => {
    navigate(`/mypalette/${subColor.groupId}/edit/${subColor.id}`, {
      state: {
        returnTo: "/palette-log",
      },
    });
  };

  const handleDelete = (subColorId) => {
    onDelete(selectedSubColor.groupId, subColorId);
    setSelectedSubColor(null);
  };

  return (
    <main className="palette-log-page">
      <header className="palette-log-header">
        <h1>{currentMonth}</h1>
      </header>

      <section className="palette-log-calendar">
        <div className="palette-log-weekdays">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <span key={`${day}-${index}`}>{day}</span>
          ))}
        </div>

        <div className="palette-log-grid">
          {calendarDays.map((day, index) => {
            if (!day) {
              return (
                <div
                  key={`empty-${index}`}
                  className="palette-log-day palette-log-day-empty"
                />
              );
            }

            const dateKey = `${year}-${String(month + 1).padStart(
              2,
              "0",
            )}-${String(day).padStart(2, "0")}`;

            const colorsForDay = groupedSubColors[dateKey] || [];
            return (
              <div key={dateKey} className="palette-log-day">
                <span>{day}</span>

                <div className="palette-log-colors">
                  {colorsForDay.map((subColor) => (
                    <button
                      key={`${subColor.groupId}-${subColor.id}`}
                      type="button"
                      className="palette-log-color"
                      style={{ backgroundColor: subColor.color }}
                      aria-label={`${subColor.name} 상세 보기`}
                      onClick={() => setSelectedSubColor(subColor)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {selectedSubColor && (
        <SubColorModal
          subColor={selectedSubColor}
          onClose={() => setSelectedSubColor(null)}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </main>
  );
}

export default PaletteLog;
