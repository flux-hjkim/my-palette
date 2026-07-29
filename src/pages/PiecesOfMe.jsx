import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PiecesOfMe.css";
import SubColorModal from "../components/SubColorModal";
import StickerCard from "../components/StickerCard";

function PiecesOfMe({ colorGroups, onDelete }) {
  const navigate = useNavigate();

  const [selectedGroupId, setSelectedGroupId] = useState(
    String(colorGroups[0]?.id ?? ""),
  );

  const [selectedSubColor, setSelectedSubColor] = useState(null);

  const [isToolsOpen, setIsToolsOpen] = useState(false);

  const boardRef = useRef(null);

  // subColors에 그룹 정보 추가
  const allSubColors = useMemo(
    () =>
      colorGroups.flatMap((group) =>
        group.subColors.map((subColor) => ({
          ...subColor,
          groupId: group.id,
          groupName: group.groupName,
        })),
      ),
    [colorGroups],
  );

  // 그래프에 필요한 정보만 뽑아 새 배열 생성 (파생 데이터)
  const groupCounts = useMemo(
    () =>
      colorGroups.map((group) => ({
        id: group.id,
        name: group.groupName,
        count: group.subColors.length,
      })),
    [colorGroups],
  );

  // 모든 그룹에서 subColor의 최대 개수
  const maxCount = Math.max(...groupCounts.map((group) => group.count), 1);

  const handleAddColor = () => {
    if (!selectedGroupId) return;

    navigate(`/mypalette/${selectedGroupId}/new`);
  };

  const handleEdit = (subColor) => {
    navigate(`/mypalette/${subColor.groupId}/edit/${subColor.id}`, {
      state: {
        returnTo: "/pieces-of-me",
      },
    });
  };

  const handleDelete = (subColorId) => {
    onDelete(selectedSubColor.groupId, subColorId);
    setSelectedSubColor(null);
  };

  return (
    <main className="page-container">
      <section className="pieces-of-me-page">
        <aside className="pieces-of-me-sidebar">
          <div className="pieces-of-me-sidebar-inner">
            <div className="pieces-of-me-intro">
              <p className="pieces-of-me-eyebrow">PIECES OF ME</p>

              <h1>What color feels most like you today?</h1>

              <p className="pieces-of-me-description">
                작은 취향과 기억이 모여 지금의 나를 만듭니다.
              </p>
            </div>

            <button
              type="button"
              className="pieces-of-me-tools-toggle"
              aria-expanded={isToolsOpen}
              aria-controls="pieces-of-me-tools"
              onClick={() => setIsToolsOpen((prev) => !prev)}
            >
              ADD COLOR & VIEW BALANCE
            </button>

            <div
              id="pieces-of-me-tools"
              className={`pieces-of-me-tools ${isToolsOpen ? "is-open" : ""}`}
            >
              <div className="pieces-of-me-add">
                <label htmlFor="pieces-group-select">
                  Where does this color belong?
                </label>

                <select
                  id="pieces-group-select"
                  value={selectedGroupId}
                  onChange={(event) => setSelectedGroupId(event.target.value)}
                >
                  {colorGroups.map((group) => (
                    <option key={group.id} value={String(group.id)}>
                      {group.groupName}
                    </option>
                  ))}
                </select>

                <button type="button" onClick={handleAddColor}>
                  ADD A NEW COLOR
                </button>
              </div>

              <section className="pieces-of-me-stats">
                <p className="pieces-of-me-section-title">YOUR COLOR BALANCE</p>

                <ul>
                  {groupCounts.map((group) => (
                    <li key={group.id} className="pieces-of-me-stat">
                      <div className="pieces-of-me-stat-info">
                        <span>{group.name}</span>
                        <span>{group.count}</span>
                      </div>

                      <div className="pieces-of-me-stat-track">
                        <div
                          className="pieces-of-me-stat-bar"
                          style={{
                            width: `${(group.count / maxCount) * 100}%`,
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </aside>

        <section ref={boardRef} className="pieces-of-me-board">
          {allSubColors.map((subColor, index) => (
            <StickerCard
              key={`${subColor.groupId}-${subColor.id}`}
              subColor={subColor}
              index={index}
              onSelect={setSelectedSubColor}
              constraintsRef={boardRef}
            />
          ))}

          {allSubColors.length === 0 && (
            <p className="pieces-of-me-empty">Your colors will gather here.</p>
          )}
        </section>
      </section>

      <SubColorModal
        subColor={selectedSubColor}
        onClose={() => setSelectedSubColor(null)}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </main>
  );
}

export default PiecesOfMe;
