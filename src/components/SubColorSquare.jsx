import { useState } from "react";

function SubColorSquare({ subColor, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "130px",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          backgroundColor: subColor.color,
          aspectRatio: "1 / 1",
          width: "92px",
          transform: isHovered
            ? "translateY(-6px) scale(1.04)"
            : "translateY(0) scale(1)",
          transition: "transform 0.25s ease",
        }}
      />

      <div
        style={{
          marginTop: "14px",
          textAlign: "left",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "14px",
            lineHeight: "1.15",
            letterSpacing: "0.04em",
            fontWeight: "600",
            fontStyle: "italic",
            color: "#2f2724",
            textTransform: "lowercase",
          }}
        >
          {subColor.colorName}
        </p>
        <p
          style={{
            margin: "4px 0 0",
            fontSize: "11px",
            lineHeight: "1.25",
            letterSpacing: "0.02em",
            color: "#6f625c",
            textTransform: "uppercase",
          }}
        >
          {subColor.color}
        </p>
        <p
          style={{
            margin: "4px 0 0",
            fontSize: "13px",
            lineHeight: "1.45",
            letterSpacing: "0.01em",
            color: "#4f4250",
            wordBreak: "keep-all",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "34px",
          }}
        >
          {subColor.name}
        </p>
      </div>
    </div>
  );
}

export default SubColorSquare;
