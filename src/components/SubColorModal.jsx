function SubColorModal({ subColor, onClose, onDelete, onEdit }) {
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
          width: "min(400px, calc(100vw - 32px))",
          maxHeight: "calc(100vh - 32px)",
          boxSizing: "border-box",
          backgroundColor: "#FEFCF0",
          padding: "64px 62px 32px",
          border: "1px solid #9f988c",
          boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
          textAlign: "center",
          overflowY: "auto",
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

        <h2
          style={{
            margin: 0,
            marginBottom: "34px",
            fontSize: "30px",
            lineHeight: "30px",
            fontFamily: "serif",
            fontWeight: 400,
            color: "#2f2924",
          }}
        >
          {subColor.name}
        </h2>

        <div
          style={{
            width: "min(230px, 70vw)",
            aspectRatio: "1 / 1",
            backgroundColor: subColor.color,
            margin: "0 auto 31px",
            border: "1px solid #8f8a80",
            boxSizing: "border-box",
          }}
        />

        <p
          style={{
            maxWidth: "276px",
            margin: "0 auto",
            lineHeight: 1.45,
            fontSize: "13px",
            color: "#6f665f",
            textAlign: "center",
          }}
        >
          {subColor.description}
        </p>

        <div
          style={{
            marginTop: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              flexWrap: "wrap",
              marginTop: "20px",
            }}
          >
            {subColor.keywords.map((keyword) => (
              <span
                key={keyword}
                style={{
                  padding: "4px 10px",
                  backgroundColor: "transparent",
                  border: "1px solid #b8b0a4",
                  borderRadius: "999px",
                  fontSize: "13px",
                  lineHeight: "1",
                  color: "#6f665f",
                }}
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: "48px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textTransform: "uppercase",
          }}
        >
          <button
            onClick={() => onEdit(subColor)}
            style={{
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontSize: "12px",
              letterSpacing: "0.3px",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#4f4a43",
            }}
          >
            EDIT YOUR STORY
          </button>

          <button
            onClick={() => {
              if (window.confirm("이 컬러를 삭제할까요?")) {
                onDelete(subColor.id);
                onClose();
              }
            }}
            style={{
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontSize: "12px",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#4f4a43",
            }}
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubColorModal;
