import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import SubColorSquare from "../components/SubColorSquare";
import SubColorModal from "../components/SubColorModal";
import AddSubColorSquare from "../components/AddSubColorSquare";

function ColorGroupDetail({ colorGroups, setColorGroups }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedSubColor, setSelectedColor] = useState(null);

  const selectedGroup = colorGroups.find((group) => group.id === Number(id));
  const subColors = selectedGroup?.subColors ?? [];

  useEffect(() => {
    console.log("location.state", location.state);
    console.log("subColors", subColors);

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

  // const subColors = selectedGroup.subColors;

  // SubColor Delete 기능
  const deleteSubColor = (subColorId) => {
    setColorGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id === Number(id)) {
          return {
            ...group,
            subColors: group.subColors.filter(
              (subColor) => subColor.id !== subColorId,
            ),
          };
        }

        return group;
      }),
    );

    setSelectedColor(null);
  };

  // SubColor Edit 기능
  const handleEdit = (subColor) => {
    navigate(`/mypalette/${id}/edit/${subColor.id}`);
  };

  return (
    <div
      style={{
        backgroundColor: "#F9F5EA", //#E6E6DE, #FEFCF0
        minHeight: "100vh",
        padding: "72px 40px",
      }}
    >
      <div
        style={{
          maxWidth: "980px",
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              letterSpacing: "8px",
              fontSize: "36px",
              margin: 0,
            }}
          >
            {selectedGroup.groupName}
          </h1>

          <p
            style={{
              marginTop: "12px",
              letterSpacing: "2px",
              color: selectedGroup.mainColor,
            }}
          >
            {selectedGroup.colorName}
          </p>

          <p
            style={{
              marginTop: "8px",
              fontSize: "14px",
              color: "#7a6a5f",
            }}
          >
            이 컬러 그룹에 담긴 나의 취향과 기억들
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, 92px)",
            gap: "42px 70px",
            justifyContent: "center",
            marginTop: "40px",
            alignItems: "start",
          }}
        >
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
          onDelete={deleteSubColor}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}

export default ColorGroupDetail;
