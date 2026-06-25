import { useState, useEffect } from "react";

function SubColorModal({ subColor, onClose, onDelete, onEdit }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [subColor]);

  if (!subColor) return null; // 선택된 컬러가 없으면 모달 닫기

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "280px",
          backgroundColor: "#fff",
          padding: "14px 14px 24px",
          boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
          textAlign: "left",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "0px",
            right: "0px",
            background: "transparent",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            color: "#8d8178",
          }}
        >
          ×
        </button>
        <div
          style={{
            width: "100%",
            aspectRatio: "4 / 5",
            backgroundColor: subColor.color,
            marginTop: "10px",
            marginBottom: "12px",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "3px",
              opacity: 0.5,
              marginBottom: "4px",
            }}
          >
            SUB COLOR
          </p>
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
              color: "#8d8178",
            }}
          >
            ⋯
          </button>

          {isMenuOpen && (
            <div
              style={{
                position: "absolute",
                right: "28px",
                top: "-2px",
                display: "flex",
                gap: "8px",
                padding: "4px 8px",
                backgroundColor: "#fff",
                border: "1px solid #e6ded4",
                boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
              }}
            >
              <button onClick={() => onEdit(subColor)}>✎</button>
              <button
                onClick={() => {
                  if (window.confirm("이 컬러를 삭제할까요?")) {
                    onDelete(subColor.id);
                    onClose();
                  }
                }}
              >
                🗑
              </button>
            </div>
          )}
        </div>
        <h2
          style={{
            margin: 0,
            fontSize: "22px",
            fontFamily: "serif",
          }}
        >
          {subColor.name}
        </h2>

        <p
          style={{
            marginTop: "14px",
            lineHeight: 1.7,
            fontSize: "14px",
            color: "#5f564f",
          }}
        >
          {subColor.description}
        </p>

        <p
          style={{
            marginTop: "18px",
            fontSize: "11px",
            letterSpacing: "2px",
            opacity: 0.5,
          }}
        >
          # KEYWORDS
        </p>

        <div
          style={{
            display: "flex",
            marginTop: "8px",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          {subColor.keywords.map((keyword) => (
            <span
              key={keyword}
              style={{
                padding: "4px 12px",
                backgroundColor: "#f3eee7",
                borderRadius: "999px",
                fontSize: "12px",
              }}
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SubColorModal;
