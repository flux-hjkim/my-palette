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
    if (!formData.selectedColor) return;

    const savedSubColor = {
      id: selectedSubColor ? selectedSubColor.id : Date.now(),
      name: formData.name,
      colorName: formData.selectedColor.name,
      color: formData.selectedColor.color,
      description: formData.description,
      keywords: formData.keywords,
      createdAt: selectedSubColor
        ? selectedSubColor.createdAt
        : new Date().toISOString(),
    };

    if (selectedSubColor) {
      onUpdate(id, savedSubColor);

      navigate(`/mypalette/${id}`, {
        state: { reopenSubColorId: savedSubColor.id },
      });

      return;
    }

    onAdd(id, savedSubColor);

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
            // isPageMode={true}
            // colorKey={selectedGroup.colorKey}
            // initialData={isEditMode ? selectedSubColor : null}
            // groupColorName={selectedGroup.colorName}
            // groupMainColor={selectedGroup.mainColor}
            // onClose={() => navigate(`/mypalette/${id}`)}
            // onAdd={(newSubColor) => {
            //   onAdd(id, newSubColor);
            //   navigate(`/mypalette/${id}`);
            // }}
            // onUpdate={(updatedSubColor) => {
            //   onUpdate(id, updatedSubColor);
            //   navigate(`/mypalette/${id}`, {
            //     state: { reopenSubColorId: updatedSubColor.id },
            //   });
            // }}
            formData={formData}
            setFormData={setFormData}
            presetColors={presetColors}
            groupColorName={selectedGroup.colorName}
            groupMainColor={selectedGroup.mainColor}
          />
        </section>
      </article>
    </main>
  );
}

export default ColorEditorPage;
