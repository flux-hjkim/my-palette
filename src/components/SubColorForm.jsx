import { useState, useRef, useEffect } from "react";
import { presetColorsByGroup } from "../data/presetColors";

function SubColorForm({ onClose, onAdd, onUpdate, colorKey, initialData }) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );

  const presetColors = presetColorsByGroup[colorKey] || [];
  const [selectedColor, setSelectedColor] = useState(
    initialData
      ? {
          name: initialData.colorName,
          color: initialData.color,
        }
      : presetColors[0],
  );

  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const [showAllColors, setShowAllColors] = useState(false);

  const colorPickerRef = useRef(null);
  const colorButtonRef = useRef(null); // 컬러 선택하기 버튼

  // 키워드 추가·삭제 기능
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState(initialData?.keywords || []);

  const handleKeywordKeyDown = (e) => {
    if (e.key !== "Enter") return;

    const value = keywordInput.trim();
    if (!value) return;

    if (keywords.includes(value)) {
      setKeywordInput("");
      return;
    }

    setKeywords((prev) => [...prev, value]);
    setKeywordInput("");
  };

  const removeKeyword = (indexToRemove) => {
    setKeywords((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // 입력한 정보 저장하는 함수
  const handleSave = () => {
    const savedSubColor = {
      id: initialData ? initialData.id : Date.now(),
      name,
      colorName: selectedColor.name,
      color: selectedColor.color,
      description,
      keywords,
      createdAt: initialData ? initialData.createdAt : new Date().toISOString(),
    };

    if (initialData) {
      onUpdate(savedSubColor);
    } else {
      onAdd(savedSubColor);
    }
  };

  // Color Picker 외부 클릭 닫기 기능
  useEffect(() => {
    function handleClickOutside(event) {
      const clickedPicker =
        colorPickerRef.current && colorPickerRef.current.contains(event.target);
      const clickedButton =
        colorButtonRef.current && colorButtonRef.current.contains(event.target);

      if (!clickedPicker && !clickedButton) {
        // 버튼 & 드롭다운 바깥 클릭 시 드롭다운 닫기
        setIsColorPickerOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div
      // onClick={onClose}
      style={{
        width: "min(820px, 86vw)",
        minHeight: "500px",
        backgroundColor: "#F8EFE4",
        padding: "36px 48px",
        position: "relative",
        boxSizing: "border-box",
        margin: "40px auto 80px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1
          style={{
            margin: 0,
            letterSpacing: "2px",
            fontSize: "42px",
            color: "#6B4E3D",
          }}
        >
          EDIT PALETTE
        </h1>
        <p
          style={{
            marginTop: "14px",
            color: "#7E6A58",
            fontSize: "18px",
          }}
        >
          For Me Only.
        </p>
        <div
          style={{
            width: "54px",
            height: "1px",
            backgroundColor: "rgba(107,78,61,0.28)",
            margin: "16px auto 0",
          }}
        />
        <p
          style={{
            marginTop: "16px",
            color: "#9A8472",
            fontStyle: "italic",
            fontSize: "14px",
            fontFamily: "Georgia, serif",
          }}
        >
          This space is where I record the pieces of me.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: "50px",
          marginTop: "48px",
          alignItems: "start",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                textAlign: "left",
              }}
            >
              NAME
            </label>

            <input
              placeholder="ex. 클래식"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                marginTop: "8px",
                backgroundColor: "transparent",
                border: "1px solid rgba(90,64,44,0.14)",
                padding: "14px 16px",

                fontSize: "14px",
                color: "#5D4634",
                fontFamily: "'Noto Serif KR', serif",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                textAlign: "left",
              }}
            >
              DESCRIPTION
            </label>

            <textarea
              placeholder="이 색에 담긴 기억을 적어보세요."
              maxLength={200}
              value={description}
              onChange={(e) => {
                const value = e.target.value;
                setDescription(value.slice(0, 200));
              }}
              style={{
                width: "100%",
                minHeight: "180px",
                marginTop: "10px",
                resize: "none",
                outline: "none",

                padding: "14px",

                backgroundColor: "transparent",
                border: "1px solid rgba(90,64,44,0.14)",

                fontSize: "14px",
                lineHeight: "1.6",
                color: "#5D4634",
                fontFamily: "'Noto Serif KR', serif",

                boxSizing: "border-box",
              }}
            />
            <div
              style={{
                textAlign: "right",
                marginTop: "8px",
                color: "#9A8472",
                boxSizing: "border-box",
              }}
            >
              {description.length} / 200
            </div>
          </div>

          <div>
            <label
              style={{
                display: "block",
                textAlign: "left",
              }}
            >
              KEYWORDS
            </label>

            <input
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={handleKeywordKeyDown}
              placeholder="키워드를 입력하고 Enter"
              style={{
                width: "100%",
                marginTop: "8px",
              }}
            />
            <div>
              {keywords.map((keyword, index) => (
                <span
                  key={index}
                  onClick={() => removeKeyword(index)}
                  style={{
                    cursor: "pointer",
                    marginRight: "8px",
                  }}
                >
                  #{keyword} x
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            borderLeft: "1px solid rgba(80, 60, 45, 0.35)",
            paddingLeft: "48px",
            position: "relative",
          }}
        >
          <label>COLOR</label>

          <div
            style={{
              width: "100%",
              aspectRatio: "3 / 4",
              backgroundColor: selectedColor.color,
              marginTop: "16px",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <div style={{ textAlign: "left" }}>
              <p style={{ margin: 0 }}>{selectedColor.name}</p>
              <p style={{ margin: 0 }}>{selectedColor.color}</p>
            </div>

            <button
              ref={colorButtonRef}
              onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                border: "2px solid #5d4634",
                backgroundColor: selectedColor.color,
                cursor: "pointer",
              }}
            />
          </div>

          {isColorPickerOpen && (
            <div
              ref={colorPickerRef}
              style={{
                position: "absolute",
                top: "calc(100% + 4px)",
                right: 0,
                width: "236px",
                padding: "10px",
                backgroundColor: "#F8EFE4",
                border: "1px solid rgba(90,64,44,0.18)",
                boxShadow: "0 18px 50px rgba(0,0,0,0.18)",
                zIndex: 10,
              }}
            >
              <div
                style={{
                  maxHeight: "160px",
                  overflowY: "auto",
                  padding: "10px 10px 10px",
                  boxSizing: "border-box",
                  scrollbarGutter: "stable",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 34px)",
                    gap: "10px",
                    justifyContent: "center",
                  }}
                >
                  {presetColors.slice(0, 4).map((preset) => {
                    const isSelected = selectedColor.name === preset.name;

                    return (
                      <button
                        key={preset.name}
                        onClick={() => setSelectedColor(preset)}
                        style={{
                          width: "34px",
                          height: "34px",
                          borderRadius: "50%",
                          border: isSelected
                            ? "2px solid #5D4634"
                            : "1px solid rgba(90,64,44,0.15)",
                          backgroundColor: preset.color,
                          cursor: "pointer",
                          transform: isSelected ? "scale(1.08)" : "scale(1)",
                          transition: "all 0.2s ease",
                        }}
                      />
                    );
                  })}

                  <button
                    onClick={() => setShowAllColors(!showAllColors)}
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      border: "1px solid rgba(90,64,44,0.18)",
                      backgroundColor: "#E8E1D8",
                      fontSize: "9px",
                      cursor: "pointer",
                    }}
                  >
                    more
                  </button>
                </div>

                {showAllColors && (
                  <>
                    <div
                      style={{
                        borderTop: "1px solid rgba(90,64,44,0.18)",
                        margin: "14px 0",
                      }}
                    />

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(5, 34px)",
                        gap: "10px",
                        justifyContent: "center",
                      }}
                    >
                      {presetColors.slice(5).map((preset) => {
                        const isSelected = selectedColor.name === preset.name;
                        return (
                          <button
                            key={preset.name}
                            onClick={() => setSelectedColor(preset)}
                            style={{
                              width: "34px",
                              height: "34px",
                              borderRadius: "50%",
                              border: isSelected
                                ? "2px solid #5D4634"
                                : "1px solid rgba(90,64,44,0.2)",
                              backgroundColor: preset.color,
                              cursor: "pointer",
                            }}
                          />
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "16px",
          borderTop: "1px solid rgba(80, 60, 45, 0.25)",
          marginTop: "48px",
          paddingTop: "24px",
        }}
      >
        <button onClick={onClose}>취소</button>
        <button onClick={handleSave}>저장하기</button>
      </div>
    </div>
  );
}

export default SubColorForm;
