import { useState } from "react";
import ColorGroupCard from "../components/ColorGroupCard";

function MyPalette({ colorGroups }) {
  //현재 hover중인 컬러 그룹 기억
  const [activeId, setActiveId] = useState(null);
  //그룹 내 특성 퍼센티지 계산
  const totalSubColorCount = colorGroups.reduce(
    (sum, group) => sum + group.subColors.length,
    0,
  );

  return (
    <div
      style={{
        backgroundColor: "var(--page-bg)",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <h1>My Primary Color Palette</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "40px",
          maxWidth: "760px",
          margin: "60px auto",
        }}
      >
        {colorGroups.map((group) => (
          <ColorGroupCard
            key={group.id}
            id={group.id}
            colorName={group.colorName}
            groupName={group.groupName}
            count={group.subColors.length}
            mainColor={group.mainColor}
            activeId={activeId}
            setActiveId={setActiveId}
            percentage={
              totalSubColorCount === 0
                ? 0
                : Math.round(
                    (group.subColors.length / totalSubColorCount) * 100,
                  )
            }
          />
        ))}
      </div>
    </div>
  );
}

export default MyPalette;
