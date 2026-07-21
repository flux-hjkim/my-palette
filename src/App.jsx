import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import MyPalette from "./pages/MyPalette";
import PiecesOfMe from "./pages/PiecesOfMe";
import PaletteLog from "./pages/PaletteLog";
import ColorGroupDetail from "./pages/ColorGroupDetail";
import ColorEditorPage from "./pages/ColorEditorPage";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { initialColorGroups } from "./data/colorGroups";

function App() {
  const [colorGroups, setColorGroups] = useState(initialColorGroups);

  //특정 컬러 그룹에 subColors 추가
  const addSubColor = (groupId, newSubColor) => {
    setColorGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id === Number(groupId)) {
          return {
            ...group,
            subColors: [...group.subColors, newSubColor],
          };
        }

        return group;
      }),
    );
  };

  //특정 컬러 그룹에 subColors 업데이트
  const updateSubColor = (groupId, updatedSubColor) => {
    setColorGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id === Number(groupId)) {
          return {
            ...group,
            subColors: group.subColors.map((subColor) =>
              subColor.id === updatedSubColor.id ? updatedSubColor : subColor,
            ),
          };
        }
        return group;
      }),
    );
  };

  // 특정 컬러 그룹의 SubColor 삭제
  const deleteSubColor = (groupId, subColorId) => {
    setColorGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id === Number(groupId)) {
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
  };

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Navbar colorGroups={colorGroups} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/mypalette"
          element={<MyPalette colorGroups={colorGroups} />}
        />
        <Route
          path="/mypalette/:id"
          element={
            <ColorGroupDetail
              colorGroups={colorGroups}
              onDelete={deleteSubColor}
            />
          }
        />
        <Route
          path="/mypalette/:id/new"
          element={
            <ColorEditorPage
              colorGroups={colorGroups}
              onAdd={addSubColor}
              onUpdate={updateSubColor}
            />
          }
        />
        <Route
          path="/mypalette/:id/edit/:subColorId"
          element={
            <ColorEditorPage
              colorGroups={colorGroups}
              onAdd={addSubColor}
              onUpdate={updateSubColor}
            />
          }
        />
        <Route
          path="/pieces-of-me"
          element={
            <PiecesOfMe colorGroups={colorGroups} onDelete={deleteSubColor} />
          }
        />
        <Route
          path="/palette-log"
          element={
            <PaletteLog colorGroups={colorGroups} onDelete={deleteSubColor} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
