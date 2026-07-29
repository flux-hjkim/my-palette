import { useMemo } from "react";
import { motion } from "motion/react";
import { STICKER_PRESETS } from "../data/stickerPresets.js";
import "./StickerCard.css";

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min; // min 이상 max 미만 범위의 숫자
}

function StickerCard({ subColor, index, onSelect }) {
  // 제목 8자 제한
  const getShortText = (title, maxLength) =>
    title.length > maxLength ? title.slice(0, maxLength) + "..." : title;

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

  return (
    <motion.button
      type="button"
      className={`piece-sticker piece-sticker--${frameType}`}
      style={{
        "--piece-color": subColor.color,
        left: `${left}%`,
        top: `${top}%`,
        width: `${stickerWidth}px`,
        marginLeft: `${stickerWidth / -2}px`,
      }}
      animate={{
        rotate: rotation,
        scale: 1,
      }}
      whileHover={{
        rotate: rotation + 3,
        scale: 1.08,
      }}
      whileTap={{
        rotate: rotation - 2,
        scale: 0.96,
      }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 22,
      }}
      onClick={() => onSelect(subColor)}
    >
      <span className="piece-sticker-color-name">{subColor.colorName}</span>

      <div className="piece-sticker-info">
        <span className="piece-sticker-category">{subColor.groupName}</span>
        <span className="piece-sticker-title">
          {getShortText(subColor.name, 8)}
        </span>
        <div className="piece-sticker-keywords">
          {subColor.keywords.slice(0, 2).map((keyword) => (
            <span key={keyword} className="piece-sticker-keyword">
              #{keyword}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

export default StickerCard;
