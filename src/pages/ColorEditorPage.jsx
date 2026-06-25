import { useParams, useNavigate } from "react-router-dom";
import SubColorForm from "../components/SubColorForm";

function ColorEditorPage({ colorGroups, onAdd, onUpdate }) {
  const { id, subColorId } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(subColorId);

  const selectedGroup = colorGroups.find((group) => group.id === Number(id));

  if (!selectedGroup) {
    return <main>존재하지 않는 컬러 그룹입니다.</main>;
  }

  const selectedSubColor = selectedGroup?.subColors.find(
    (subColor) => subColor.id === Number(subColorId),
  );

  return (
    <main>
      <h1>{isEditMode ? "Edit Color" : "Add Color"}</h1>

      <SubColorForm
        isPageMode={true}
        colorKey={selectedGroup.colorKey}
        initialData={isEditMode ? selectedSubColor : null}
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
    </main>
  );
}

export default ColorEditorPage;
