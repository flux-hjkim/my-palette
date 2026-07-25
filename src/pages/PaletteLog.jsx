import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PaletteLog.css";
import SubColorModal from "../components/SubColorModal";

const MONTH_NAMES = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

function PaletteLog({ colorGroups, onDelete }) {
  const [selectedSubColor, setSelectedSubColor] = useState(null);

  const navigate = useNavigate();

  const location = useLocation();

  // 전체 컬러를 한 배열로 만들기
  const allSubColors = useMemo(() => {
    return colorGroups.flatMap((group) =>
      group.subColors.map((subColor) => ({
        ...subColor,
        groupId: group.id,
        groupName: group.groupName,
      })),
    );
  }, [colorGroups]);

  /* 기록이 존재하는 월 목록 만들기 */
  // YYYY-MM 형태로 createdAt만 모은 배열 생성
  const recordedMonths = allSubColors.map((subColor) => {
    return subColor.createdAt.slice(0, 7);
  });
  // 배열 내 중복 제거 후 새 배열 저장
  const uniqueMonths = [...new Set(recordedMonths)];
  // 중복 제거된 배열을 날짜순으로 정렬
  const sortedMonths = [...uniqueMonths].sort();

  // 현재 보고 있는 월의 위치 번호
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    sortedMonths.length > 0 ? sortedMonths.length - 1 : 0,
  );
  // 현재 월의 마지막 기록 삭제 시 currentMonthIndex가 배열 범위를 벗어나지 않도록 보정
  useEffect(() => {
    if (sortedMonths.length === 0) {
      setCurrentMonthIndex(0);
      return;
    }

    if (currentMonthIndex > sortedMonths.length - 1) {
      setCurrentMonthIndex(sortedMonths.length - 1);
    }
  }, [sortedMonths.length, currentMonthIndex]);

  useEffect(() => {
    const returnMonth = location.state?.returnMonth;
    const reopenSubColorId = location.state?.reopenSubColorId;

    if (!returnMonth && !reopenSubColorId) return;

    // Edit 후 원래 보고 있던 달로 리턴
    if (returnMonth) {
      const returnMonthIndex = sortedMonths.indexOf(returnMonth);

      if (returnMonthIndex !== -1) {
        setCurrentMonthIndex(returnMonthIndex);
      }
    }

    // Edit 후 모달 재오픈
    if (reopenSubColorId) {
      const reopenedSubColor = allSubColors.find(
        (subColor) => subColor.id === Number(reopenSubColorId),
      );

      if (reopenedSubColor) {
        setSelectedSubColor(reopenedSubColor);
      }
    }

    // 복귀 정보 삭제
    navigate(location.pathname, {
      replace: true,
      state: null,
    });
  }, [location.state, location.pathname, sortedMonths, allSubColors, navigate]);

  // 현재 보고 있는 월 값 ("YYYY-MM")
  const currentMonth = sortedMonths[currentMonthIndex] ?? "";

  /* 달력 계산 */
  // 연, 월 분리
  const [yearString, monthString] = currentMonth.split("-");
  // 연, 월을 string에서 number로 변경
  const year = currentMonth ? Number(yearString) : null;
  const month = currentMonth ? Number(monthString) - 1 : null;

  // 해당 월이 며칠까지 있는지 계산
  const daysInMonth = currentMonth ? new Date(year, month + 1, 0).getDate() : 0;
  // 해당 월 1일이 무슨 요일인지 계산
  const firstDayOfMonth = currentMonth ? new Date(year, month, 1).getDay() : 0;

  // 월 이름 계산
  const monthName = currentMonth ? MONTH_NAMES[Number(monthString) - 1] : "";

  const groupedSubColors = useMemo(() => {
    return allSubColors.reduce((groupedByDate, subColor) => {
      const dateKey = subColor.createdAt.slice(0, 10);

      if (!groupedByDate[dateKey]) {
        groupedByDate[dateKey] = [];
      }

      groupedByDate[dateKey].push(subColor);

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

    const totalDays = emptyDays.length + monthDays.length;
    const endEmptyCount = (7 - (totalDays % 7)) % 7; // 이미 7칸 단위인 달은 뒤에 빈칸 추가 x
    const endEmptyDays = Array(endEmptyCount).fill(null);

    return [...emptyDays, ...monthDays, ...endEmptyDays];
  }, [currentMonth, firstDayOfMonth, daysInMonth]); // 이 값들이 변경되면 계산 다시 실행

  const handleEdit = (subColor) => {
    navigate(`/mypalette/${subColor.groupId}/edit/${subColor.id}`, {
      state: {
        returnTo: "/palette-log",
        returnMonth: currentMonth,
      },
    });
  };

  const handleDelete = (subColorId) => {
    onDelete(selectedSubColor.groupId, subColorId);
    setSelectedSubColor(null);
  };

  return (
    <main className="palette-log-page">
      {sortedMonths.length === 0 ? (
        <section className="palette-log-empty">
          <p>No color records yet.</p>
        </section>
      ) : (
        <>
          <header className="palette-log-header">
            <button
              type="button"
              className="palette-log-prev-button"
              onClick={() => setCurrentMonthIndex((prevIndex) => prevIndex - 1)}
              disabled={currentMonthIndex === 0}
            >
              ‹
            </button>

            <div className="palette-log-title">
              <h1>{monthName}</h1>
              <span>{yearString}</span>
            </div>

            <button
              type="button"
              className="palette-log-next-button"
              onClick={() => setCurrentMonthIndex((prevIndex) => prevIndex + 1)}
              disabled={currentMonthIndex === sortedMonths.length - 1}
            >
              ›
            </button>
          </header>

          <section className="palette-log-calendar">
            <div className="palette-log-weekdays">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                <span key={day}>{day}</span>
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
                    <span className="palette-log-day-number">
                      {String(day).padStart(2, "0")}
                    </span>

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

          <p className="palette-log-message">
            Every shade holds a piece of you.
          </p>

          {selectedSubColor && (
            <SubColorModal
              subColor={selectedSubColor}
              onClose={() => setSelectedSubColor(null)}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
        </>
      )}
    </main>
  );
}

export default PaletteLog;
