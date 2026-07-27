import { motion } from "motion/react";
import "./StickerCard.css";

function getStickerRotation(index) {
  const rotations = [-5, 3, -2, 6, -4, 2, 5, -3];

  return rotations[index % rotations.length];
}

function getStickerOffset(index) {
  const offsets = [0, 14, -6, 8, -12, 4];

  return offsets[index % offsets.length];
}

function getStickerXOffset(index) {
  const offsets = [-18, 14, -8, 20, -14, 10];

  return offsets[index % offsets.length];
}

function getStickerScale(index) {
  const scales = [1, 0.9, 1.05, 0.95, 1.02];

  return scales[index % scales.length];
}

function getStickerFrame(index) {
  const frames = ["square", "round", "label"];

  return frames[index % frames.length];
}

function StickerCard({ subColor, index, onSelect }) {
  // 제목 8자 제한
  const getShortText = (title, maxLength) =>
    title.length > maxLength ? title.slice(0, maxLength) + "..." : title;

  const frameType = getStickerFrame(index);
  const rotation = getStickerRotation(index);
  const yOffset = getStickerOffset(index);
  const xOffset = getStickerXOffset(index);
  const stickerScale = getStickerScale(index);

  return (
    <motion.button
      type="button"
      className={`piece-sticker piece-sticker--${frameType}`}
      style={{
        "--piece-color": subColor.color,
      }}
      animate={{
        x: xOffset,
        y: yOffset,
        rotate: rotation,
        scale: stickerScale,
      }}
      whileHover={{
        rotate: rotation + 2,
        scale: stickerScale * 1.08,
      }}
      whileTap={{
        rotate: rotation - 2,
        scale: stickerScale * 0.96,
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
