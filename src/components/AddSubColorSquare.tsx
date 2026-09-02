import { useState } from "react";

function AddSubColorSquare({ onClick }) {
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
      <button
        type="button"
        style={{
          width: "92px",
          aspectRatio: "1 / 1",
          boxSizing: "border-box",

          padding: 0,
          margin: 0,
          border: "1px dashed rgba(139, 124, 112, 0.65)",
          backgroundColor: "transparent",
          appearance: "none",
          WebkitAppearance: "none",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          fontFamily: "inherit",
          fontSize: "22px",
          lineHeight: 1,
          color: "#2f2724",

          cursor: "pointer",

          transform: isHovered
            ? "translateY(-5px) scale(1.03)"
            : "translateY(0) scale(1)",
          transition: "transform 0.25s ease",
        }}
      >
        +
      </button>

      <div
        style={{
          marginTop: "12px",
          width: "130px",
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
          add color
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
          NEW
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
          새로운 색 기록
        </p>
      </div>
    </div>
  );
}

export default AddSubColorSquare;
