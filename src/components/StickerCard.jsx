function StickerCard({ subColor, index, onSelect }) {
  // 제목 8자 제한
  const getShortText = (title, maxLength) =>
    title.length > maxLength ? title.slice(0, maxLength) + "..." : title;

  return (
    <button
      type="button"
      className="piece-sticker"
      style={{
        "--piece-color": subColor.color,
        "--piece-rotation": `${getStickerRotation(index)}deg`,
        "--piece-offset": `${getStickerOffset(index)}px`,
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
    </button>
  );
}

function getStickerRotation(index) {
  const rotations = [-5, 3, -2, 6, -4, 2, 5, -3];

  return rotations[index % rotations.length];
}

function getStickerOffset(index) {
  const offsets = [0, 14, -6, 8, -12, 4];

  return offsets[index % offsets.length];
}

export default StickerCard;
