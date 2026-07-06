import { useState } from "react";
import ColorGroupCard from "../components/ColorGroupCard";
import "./MyPalette.css";

function MyPalette({ colorGroups }) {
  //현재 hover중인 컬러 그룹 기억
  const [activeId, setActiveId] = useState(null);
  //그룹 내 특성 퍼센티지 계산
  const totalSubColorCount = colorGroups.reduce(
    (sum, group) => sum + group.subColors.length,
    0,
  );

  return (
    <main className="page-container">
      <section className="mypalette-layout">
        <aside className="mypalette-intro">
          <p className="mypalette-intro__label">INTRO</p>

          <h1 className="mypalette-intro__title">
            My Primary
            <br />
            Color Palette
          </h1>

          <p className="mypalette-intro__description">
            Five color groups that collect my tastes, interests, moods, and
            ideal self.
          </p>
        </aside>

        <div className="mypalette-grid">
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
      </section>
    </main>
  );
}

export default MyPalette;
