import { useNavigate } from "react-router-dom";

function ColorGroupCard({
  id,
  groupName,
  colorName,
  percentage,
  count,
  mainColor,
  activeId,
  setActiveId,
}) {
  const navigate = useNavigate();

  const isActive = activeId === id; // 현재 선택된 카드인가?

  return (
    <div
      onMouseEnter={() => setActiveId(id)}
      onMouseLeave={() => setActiveId(null)}
      onClick={() => navigate(`/mypalette/${id}`)}
      style={{
        cursor: "pointer",
      }}
    >
      <div
        style={{
          backgroundColor: mainColor,
          aspectRatio: "1 / 1",
          width: "100%",
          borderRadius: "2px",
          transform: isActive ? "rotate(3deg) translateY(-6px)" : "none",
          transition: "transform 0.25s ease",
        }}
      />
      <div
        style={{
          marginTop: "12px",
          fontSize: "12px",
          letterSpacing: "3px",
          fontWeight: "700",
        }}
      >
        {colorName}
      </div>

      <div
        style={{
          marginTop: "4px",
          fontSize: "14px",
        }}
      >
        {groupName} · {percentage}%
      </div>
    </div>
  );
}

export default ColorGroupCard;
