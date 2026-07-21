import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PiecesOfMe.css";
import SubColorModal from "../components/SubColorModal";

function PiecesOfMe({ colorGroups, onDelete }) {
  const navigate = useNavigate();

  const [selectedGroupId, setSelectedGroupId] = useState(
    String(colorGroups[0]?.id ?? ""),
  );

  const [selectedSubColor, setSelectedSubColor] = useState(null);

  const [isToolsOpen, setIsToolsOpen] = useState(false);

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

  // 제목 20자 제한
  const getShortText = (title, maxLength) =>
    title.length > maxLength ? title.slice(0, maxLength) + "..." : title;

  return (
    <main className="pieces-of-me-page page-container">
      <aside className="pieces-of-me-sidebar">
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
      </aside>

      <section className="pieces-of-me-board">
        {allSubColors.map((subColor, index) => (
          <button
            key={`${subColor.groupId}-${subColor.id}`}
            type="button"
            className="piece-sticker"
            style={{
              "--piece-color": subColor.color,
              "--piece-rotation": `${getStickerRotation(index)}deg`,
              "--piece-offset": `${getStickerOffset(index)}px`,
            }}
            onClick={() => setSelectedSubColor(subColor)}
          >
            <span className="piece-sticker-color-name">
              {subColor.colorName}
            </span>

            <div className="piece-sticker-info">
              <span className="piece-sticker-category">
                {subColor.groupName}
              </span>
              <span className="piece-sticker-title">
                {getShortText(subColor.name, 8)}
              </span>
              <div className="piece-sticker-keywords">
                {subColor.keywords.slice(0, 2).map((keyword) => (
                  <span key={keyword} className="piece-sticker-keyword">
                    #{keyword}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}

        {allSubColors.length === 0 && (
          <p className="pieces-of-me-empty">Your colors will gather here.</p>
        )}
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

function getStickerRotation(index) {
  const rotations = [-5, 3, -2, 6, -4, 2, 5, -3];

  return rotations[index % rotations.length];
}

function getStickerOffset(index) {
  const offsets = [0, 14, -6, 8, -12, 4];

  return offsets[index % offsets.length];
}

export default PiecesOfMe;
