import { useState } from "react";
import StickerCard from "./StickerCard";
import type { StickerSubColor } from "../data/colorGroups";

type PaletteLogDayProps = {
  day: number;
  colorsForDay: StickerSubColor[];
  allSubColors: StickerSubColor[];
  onSelect: (subColor: StickerSubColor) => void;
};

function PaletteLogDay({
  day,
  colorsForDay,
  allSubColors,
  onSelect,
}: PaletteLogDayProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSubColor = colorsForDay[activeIndex];

  return (
    <div className="palette-log-day">
      <span className="palette-log-day-number">
        {String(day).padStart(2, "0")}
      </span>

      {activeSubColor && (
        <>
          <div className="palette-log-day-sticker">
            <StickerCard
              subColor={activeSubColor}
              index={allSubColors.findIndex(
                (item) =>
                  item.groupId === activeSubColor.groupId &&
                  item.id === activeSubColor.id,
              )}
              onSelect={onSelect}
              mode="calendar"
            />
          </div>

          {colorsForDay.length > 1 && (
            <div className="palette-log-day-dots">
              <div className="palette-log-day-dots-track">
                {colorsForDay.map((subColor, index) => (
                  <button
                    key={`${subColor.groupId}-${subColor.id}`}
                    type="button"
                    className={`palette-log-day-dot ${
                      index === activeIndex ? "is-active" : ""
                    }`}
                    style={{ backgroundColor: subColor.color }}
                    aria-label={`${subColor.name} 대표 스티커로 보기`}
                    onClick={() => setActiveIndex(index)}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PaletteLogDay;
