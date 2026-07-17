import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import SubColorSquare from "../components/SubColorSquare";
import SubColorModal from "../components/SubColorModal";
import AddSubColorSquare from "../components/AddSubColorSquare";
import "./ColorGroupDetail.css";

function ColorGroupDetail({ colorGroups, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedSubColor, setSelectedColor] = useState(null);

  const selectedGroup = colorGroups.find((group) => group.id === Number(id));
  const subColors = selectedGroup?.subColors ?? [];

  useEffect(() => {
    const reopenSubColorId = location.state?.reopenSubColorId;
    console.log("reopenSubColorId", reopenSubColorId);
    if (!reopenSubColorId) return;

    const targetSubColor = subColors.find(
      (subColor) => subColor.id === Number(reopenSubColorId),
    );

    if (targetSubColor) {
      setSelectedColor(targetSubColor);
    }

    // navigate(location.pathname, { replace: true, state: null });
  }, [location.state, location.pathname, navigate, subColors]);

  if (!selectedGroup) {
    return <div>컬러 그룹을 찾을 수 없습니다.</div>;
  }

  // // const subColors = selectedGroup.subColors;

  // SubColor Delete 기능
  const handleDelete = (subColorId) => {
    onDelete(id, subColorId);
    setSelectedColor(null);
  };

  // const deleteSubColor = (subColorId) => {
  //   setColorGroups((prevGroups) =>
  //     prevGroups.map((group) => {
  //       if (group.id === Number(id)) {
  //         return {
  //           ...group,
  //           subColors: group.subColors.filter(
  //             (subColor) => subColor.id !== subColorId,
  //           ),
  //         };
  //       }

  //       return group;
  //     }),
  //   );

  //   setSelectedColor(null);
  // };

  // SubColor Edit 기능
  const handleEdit = (subColor) => {
    navigate(`/mypalette/${id}/edit/${subColor.id}`);
  };

  return (
    <main className="page-container">
      <section className="color-group-detail">
        <header className="color-group-detail__header">
          <div className="color-group-detail__title-row">
            <h1 className="color-group-detail__title">
              {selectedGroup.groupName}
            </h1>

            <p
              className="color-group-detail__color-name"
              style={{ color: selectedGroup.mainColor }}
            >
              {selectedGroup.colorName}
            </p>
          </div>

          <p className="color-group-detail__description">
            {selectedGroup.description}
          </p>
        </header>

        <div className="color-group-detail__grid">
          {subColors.map((subColor) => (
            <SubColorSquare
              key={subColor.id}
              subColor={subColor}
              onClick={() => setSelectedColor(subColor)}
            />
          ))}
          <AddSubColorSquare onClick={() => navigate(`/mypalette/${id}/new`)} />
        </div>

        <SubColorModal
          subColor={selectedSubColor}
          onClose={() => setSelectedColor(null)}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </section>
    </main>
  );
}

export default ColorGroupDetail;
