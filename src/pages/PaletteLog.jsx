import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PaletteLog.css";
import SubColorModal from "../components/SubColorModal";

function PaletteLog({ colorGroups, onDelete }) {
  const year = 2026;
  const month = 6;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

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
        <h1>July</h1>
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
