import { useParams, useNavigate } from "react-router-dom";
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

  if (!selectedGroup) {
    return <main>존재하지 않는 컬러 그룹입니다.</main>;
  }

  const handleClose = () => {
    navigate(`/mypalette/${id}`);
  };

  return (
    <main className="editor-page">
      <article className="editor-postcard">
        <header className="editor-page__topbar">
          <button
            type="button"
            className="editor-page__back-button"
            onClick={handleClose}
          >
            BACK
          </button>

          <div className="editor-page__title-group">
            <p className="editor-page__eyebrow">{selectedGroup.name}</p>
            <h1 className="editor-page__title">
              {isEditMode ? "EDIT COLOR" : "NEW COLOR"}
            </h1>
          </div>

          <button type="button" className="editor-page__save-button">
            --SAVE
          </button>
        </header>

        <section className="editor-page__content">
          <SubColorForm
            isPageMode={true}
            colorKey={selectedGroup.colorKey}
            initialData={isEditMode ? selectedSubColor : null}
            groupColorName={selectedGroup.colorName}
            groupMainColor={selectedGroup.mainColor}
            onClose={() => navigate(`/mypalette/${id}`)}
            onAdd={(newSubColor) => {
              onAdd(id, newSubColor);
              navigate(`/mypalette/${id}`);
            }}
            onUpdate={(updatedSubColor) => {
              onUpdate(id, updatedSubColor);
              navigate(`/mypalette/${id}`, {
                state: { reopenSubColorId: updatedSubColor.id },
              });
            }}
          />
        </section>
      </article>
    </main>
  );
}

export default ColorEditorPage;
