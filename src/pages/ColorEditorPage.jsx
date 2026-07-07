import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { presetColorsByGroup } from "../data/presetColors";
import SubColorForm from "../components/SubColorForm";
import "./ColorEditorPage.css";

function ColorEditorPage({ colorGroups, onAdd, onUpdate }) {
  const { id, subColorId } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(subColorId);

  const selectedGroup = colorGroups.find((group) => group.id === Number(id));

  const selectedSubColor = selectedGroup?.subColors.find(
    (subColor) => subColor.id === Number(subColorId),
  );

  const presetColors = presetColorsByGroup[selectedGroup?.colorKey] || [];

  const [formData, setFormData] = useState({
    name: selectedSubColor?.name || "",
    description: selectedSubColor?.description || "",
    selectedColor: selectedSubColor
      ? {
          name: selectedSubColor.colorName,
          color: selectedSubColor.color,
        }
      : presetColors[0],
    keywords: selectedSubColor?.keywords || [],
  });

  // Editor Page 저장 검증
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    selectedColor: "",
  });

  if (!selectedGroup) {
    return <main>존재하지 않는 컬러 그룹입니다.</main>;
  }

  const handleBack = () => {
    if (isEditMode && selectedSubColor) {
      navigate(`/mypalette/${id}`, {
        state: { reopenSubColorId: selectedSubColor.id },
      });
      return;
    }

    navigate(`/mypalette/${id}`);
  };

  const handleSave = () => {
    // 검사 결과를 임시로 nextErrors에 계산
    const nextErrors = {
      name: "",
      description: "",
      selectedColor: "",
    };

    // 입력값 검사
    if (!formData.name.trim()) {
      nextErrors.name = "제목을 입력해주세요.";
    }

    if (!formData.description.trim()) {
      nextErrors.description = "설명을 입력해주세요.";
    }

    if (!formData.selectedColor) {
      nextErrors.selectedColor = "컬러를 선택해주세요.";
    }

    // 에러 확인, 에러 메시지가 하나라도 있으면 참
    const hasError = Object.values(nextErrors).some((message) => message);

    // 에러가 있으면 저장 중단
    if (hasError) {
      setErrors(nextErrors); // 화면에 에러 메시지 출력
      return;
    }

    // 에러가 없으면 에러 초기화 ( 빈 값으로 SAVE 눌러 에러 발생 이후 정상 입력 시 저장을 위함)
    setErrors({
      name: "",
      description: "",
      selectedColor: "",
    });

    // 저장할 데이터
    const savedSubColor = {
      id: selectedSubColor ? selectedSubColor.id : Date.now(),
      name: formData.name.trim(),
      colorName: formData.selectedColor.name,
      color: formData.selectedColor.color,
      description: formData.description.trim(),
      keywords: formData.keywords,
      createdAt: selectedSubColor
        ? selectedSubColor.createdAt
        : new Date().toISOString(),
    };

    // ADD/EDIT 분기
    if (selectedSubColor) {
      onUpdate(id, savedSubColor);

      navigate(`/mypalette/${id}`, {
        state: { reopenSubColorId: savedSubColor.id },
      });

      return;
    }

    onAdd(id, savedSubColor);

    // 페이지 이동 (모달)
    navigate(`/mypalette/${id}`, {
      state: { reopenSubColorId: savedSubColor.id },
    });
  };

  return (
    <main className="editor-page">
      <article className="editor-postcard">
        <header className="editor-page__topbar">
          <button
            type="button"
            className="editor-page__back-button"
            onClick={handleBack}
          >
            BACK
          </button>

          <div className="editor-page__title-group">
            <p className="editor-page__eyebrow">{selectedGroup.name}</p>
            <h1 className="editor-page__title">
              {isEditMode ? "EDIT COLOR" : "NEW COLOR"}
            </h1>
          </div>

          <button
            type="button"
            className="editor-page__save-button"
            onClick={handleSave}
          >
            --SAVE
          </button>
        </header>

        <section className="editor-page__content">
          <SubColorForm
            formData={formData}
            setFormData={setFormData}
            presetColors={presetColors}
            groupColorName={selectedGroup.colorName}
            groupMainColor={selectedGroup.mainColor}
            errors={errors}
          />
        </section>
      </article>
    </main>
  );
}

export default ColorEditorPage;
