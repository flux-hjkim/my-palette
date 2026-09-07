import { useMemo, useRef, useState } from "react";
import type { RefObject } from "react";
import { motion } from "motion/react";
import { STICKER_PRESETS } from "../data/stickerPresets";
import "./StickerCard.css";
import type { StickerSubColor } from "../data/colorGroups";

type StickerCardProps = {
  subColor: StickerSubColor;
  index: number;
  onSelect: (subColor: StickerSubColor) => void;
  constraintsRef?: RefObject<HTMLDivElement | null>;
  getNextZIndex?: () => number;
  mode?: "board" | "calendar";
};

function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min; // min 이상 max 미만 범위의 숫자
}

function StickerCard({
  subColor,
  index,
  onSelect,
  constraintsRef,
  getNextZIndex,
  mode = "board",
}: StickerCardProps) {
  const isCalendar = mode === "calendar";
  // 각 스티커가 자신의 현재 층을 기억하는 state
  const [zIndex, setZIndex] = useState(1);
  // hover 여부 state
  const [isHovered, setIsHovered] = useState(false);

  const preset = STICKER_PRESETS[index % STICKER_PRESETS.length];

  // 렌더링될 때마다 새 랜덤값이 생기지 않도록 useMemo 사용
  const randomStyle = useMemo(() => {
    return {
      rotation: getRandomNumber(preset.minRotation, preset.maxRotation),
      width: getRandomNumber(preset.minWidth, preset.maxWidth),
      left: getRandomNumber(15, 85),
      top: getRandomNumber(10, 80),
    };
  }, [preset]);

  const frameType = preset.frame;
  const rotation = randomStyle.rotation;
  const stickerWidth = randomStyle.width;
  const left = randomStyle.left;
  const top = randomStyle.top;

  const wasDragged = useRef(false);

  // 원형 스티커 전용 데이터
  const roundTopPathId = `round-top-${subColor.id}`;
  const roundBottomPathId = `round-bottom-${subColor.id}`;

  const keywordText = subColor.keywords
    .slice(0, 2)
    .map((keyword) => `#${keyword}`)
    .join("  ");

  // 페이지별 스타일 분리
  const stickerStyle = isCalendar
    ? {
        "--piece-color": subColor.color,
      }
    : {
        "--piece-color": subColor.color,
        "--sticker-width": `${stickerWidth}px`,
        left: `${left}%`,
        top: `${top}%`,
        width: `${stickerWidth}px`,
        marginLeft: `${stickerWidth / -2}px`,
        zIndex: isHovered ? 9999 : zIndex,
      };

  return (
    <motion.button
      drag={!isCalendar}
      dragConstraints={isCalendar ? undefined : constraintsRef}
      dragMomentum={!isCalendar}
      dragTransition={{
        power: 0.05,
        timeConstant: 180,
        bounceStiffness: 500,
        bounceDamping: 30,
      }}
      type="button"
      className={`piece-sticker piece-sticker--${frameType} ${
        isCalendar ? "piece-sticker--calendar" : ""
      }`}
      style={stickerStyle}
      animate={{
        rotate: isCalendar ? 0 : rotation,
        scale: 1,
      }}
      whileHover={{
        rotate: isCalendar ? 0 : rotation + 3,
        scale: 1.08,
      }}
      whileTap={{
        rotate: isCalendar ? 0 : rotation - 2,
        scale: 0.96,
      }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 22,
      }}
      onHoverStart={() => {
        setIsHovered(true);
      }}
      onHoverEnd={() => {
        setIsHovered(false);
      }}
      onDragStart={() => {
        if (isCalendar) return;
        if (!getNextZIndex) return;

        wasDragged.current = true;
        setIsHovered(false);
        setZIndex(getNextZIndex());
      }}
      onDragEnd={() => {
        if (isCalendar) return;

        setTimeout(() => {
          wasDragged.current = false;
        }, 0);
      }}
      onClick={() => {
        if (wasDragged.current) return;

        setIsHovered(false);
        onSelect(subColor);
      }}
    >
      <span className="piece-sticker-color-name">{subColor.colorName}</span>

      {isCalendar && (
        <span className="piece-sticker-calendar-title">
          {subColor.name.length > 8
            ? `${subColor.name.slice(0, 8)}…`
            : subColor.name}
        </span>
      )}

      {frameType === "round" ? (
        <div className="piece-sticker-info piece-sticker-info--round">
          <svg
            className="piece-sticker-round-svg"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <defs>
              <path id={roundTopPathId} d="M 8 50 A 42 42 0 0 1 92 50" />

              <path id={roundBottomPathId} d="M 8 50 A 42 42 0 0 0 92 50" />
            </defs>

            <text className="piece-sticker-round-category" dy="4">
              <textPath
                href={`#${roundTopPathId}`}
                startOffset="50%"
                textAnchor="middle"
              >
                {subColor.groupName.toUpperCase()}
              </textPath>
            </text>

            <text className="piece-sticker-round-keywords">
              <textPath
                href={`#${roundBottomPathId}`}
                startOffset="50%"
                textAnchor="middle"
              >
                {keywordText}
              </textPath>
            </text>
          </svg>

          <span className="piece-sticker-title piece-sticker-round-title">
            {subColor.name}
          </span>
        </div>
      ) : (
        <div className={`piece-sticker-info piece-sticker-info--${frameType}`}>
          <span className="piece-sticker-category">{subColor.groupName}</span>

          <span className="piece-sticker-title">{subColor.name}</span>

          <div className="piece-sticker-keywords">
            {subColor.keywords.slice(0, 2).map((keyword) => (
              <span key={keyword} className="piece-sticker-keyword">
                #{keyword}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.button>
  );
}

export default StickerCard;
