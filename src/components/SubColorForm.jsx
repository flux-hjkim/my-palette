import { useState, useRef, useEffect } from "react";
import { presetColorsByGroup } from "../data/presetColors";
import "./SubColorForm.css";

function SubColorForm({
  onClose,
  onAdd,
  onUpdate,
  colorKey,
  groupColorName,
  groupMainColor,
  initialData,
}) {
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

  const MAX_DESCRIPTION_LINES = 6;

  const handleDescriptionKeyDown = (e) => {
    if (e.key !== "Enter") return;

    const lines = description.split("\n");

    const hasSelectedText = e.target.selectionStart !== e.target.selectionEnd;

    if (lines.length >= MAX_DESCRIPTION_LINES && !hasSelectedText) {
      e.preventDefault();
    }
  };

  const handleKeywordKeyDown = (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

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
    <form className="sub-color-form">
      <div className="sub-color-form__body">
        <section className="sub-color-form__preview-section">
          <div className="sub-color-form__preview-text">
            <h2 className="sub-color-form__preview-title">
              Paint Your True Colors
            </h2>

            <p className="sub-color-form__preview-color-name">
              from{" "}
              <span
                className="sub-color-form__preview-group-color-name"
                style={{ color: groupMainColor }}
              >
                {groupColorName}
              </span>
            </p>
          </div>

          <div className="sub-color-form__color-preview-wrap">
            <button
              type="button"
              ref={colorButtonRef}
              className="sub-color-form__color-preview"
              style={{
                backgroundColor: selectedColor.color,
              }}
              onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
              aria-label="색상 선택하기"
            >
              <span className="sub-color-form__color-preview-overlay" />
              <span className="sub-color-form__color-info">
                <span className="sub-color-form__color-name">
                  {selectedColor.name}
                </span>
                <span className="sub-color-form__color-hex">
                  {selectedColor.color}
                </span>
              </span>
            </button>

            {isColorPickerOpen && (
              <div
                ref={colorPickerRef}
                className="sub-color-form__color-picker"
              >
                <div className="sub-color-form__color-picker-scroll">
                  <div className="sub-color-form__color-grid">
                    {presetColors.slice(0, 4).map((preset) => {
                      const isSelected = selectedColor.name === preset.name;

                      return (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => setSelectedColor(preset)}
                          className={`sub-color-form__preset-button ${
                            isSelected ? "is-selected" : ""
                          }`}
                          style={{
                            backgroundColor: preset.color,
                          }}
                        />
                      );
                    })}

                    <button
                      type="button"
                      onClick={() => setShowAllColors(!showAllColors)}
                      className="sub-color-form__more-button"
                    >
                      more
                    </button>
                  </div>

                  {showAllColors && (
                    <>
                      <div className="sub-color-form__picker-divider" />

                      <div className="sub-color-form__color-grid">
                        {presetColors.slice(5).map((preset) => {
                          const isSelected = selectedColor.name === preset.name;
                          return (
                            <button
                              key={preset.name}
                              type="button"
                              onClick={() => setSelectedColor(preset)}
                              className={`sub-color-form__preset-button ${
                                isSelected ? "is-selected" : ""
                              }`}
                              style={{
                                backgroundColor: preset.color,
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

          <p className="sub-color-form__preview-message">
            Let this color reflect a part of you,
            <br />
            softly and honestly.
          </p>
        </section>

        <div className="sub-color-form__divider" />

        <section className="sub-color-form__fields-section">
          <div className="sub-color-form__field">
            <label className="sub-color-form__label">TITLE</label>
            <input
              className="sub-color-form__input"
              placeholder="ex. 클래식"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="sub-color-form__field">
            <label className="sub-color-form__label">DESCRIPTION</label>
            <textarea
              className="sub-color-form__textarea"
              placeholder="이 색에 담긴 기억을 적어보세요."
              maxLength={200}
              value={description}
              onChange={(e) => {
                const textarea = e.target;
                const value = e.target.value;

                setDescription(value.slice(0, 200));

                requestAnimationFrame(() => {
                  if (textarea.scrollHeight > textarea.clientHeight) {
                    setDescription(description);
                  }
                });
              }}
              onKeyDown={handleDescriptionKeyDown}
            />
            <div className="sub-color-form__count">
              {description.length} / 200
            </div>
          </div>

          <div className="sub-color-form__field">
            <label className="sub-color-form__label">KEYWORDS</label>

            <input
              className="sub-color-form__input"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={handleKeywordKeyDown}
              placeholder="키워드를 입력하고 Enter"
            />

            <div className="sub-color-form__keywords">
              {keywords.map((keyword, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => removeKeyword(index)}
                  className="sub-color-form__keyword"
                >
                  #{keyword} x
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="sub-color-form__actions">
        <button
          type="button"
          onClick={onClose}
          className="sub-color-form__cancel-button"
        >
          취소
        </button>

        <button
          type="button"
          onClick={handleSave}
          className="sub-color-form__save-button"
        >
          저장하기
        </button>
      </div>
    </form>
  );
}

export default SubColorForm;
