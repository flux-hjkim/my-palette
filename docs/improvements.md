# MyPalette Improvements

## UX Improvements

### 1. 컬러 선택 UI 구조 개선

**Before**
컬러칩이 한 번에 모두 표시되어 Add Form의 높이가 과도하게 길어짐.

**After**
일부 대표 컬러칩과 more 버튼, dropdown을 사용하는 구조로 변경.

**Reason**
컬러 선택 영역이 입력 화면 전체를 과도하게 차지하지 않도록 하기 위함.

**Result**
Form 전체 높이를 안정적으로 유지하면서 다양한 컬러 선택 가능.

---

### 2. 컬러 dropdown 레이아웃 안정화

**Before**
dropdown을 열면 Add Form 전체 높이가 늘어나고, 스크롤 생성 시 컬러칩 위치가 이동함.

**After**
dropdown이 기존 Form 높이에 영향을 주지 않도록 `position: absolute`를 적용하고, `scrollbar-gutter: stable`로 스크롤 생성에 따른 위치 이동 방지.

**Reason**
컬러 선택 UI가 열려도 기존 form 레이아웃이 흔들리지 않도록 하기 위함.

**Result**
dropdown 표시 여부와 관계없이 안정적인 Form 높이와 컬러칩 위치 유지.

---

### 3. 컬러 dropdown 외부 클릭 닫힘 개선

**Before**
dropdown 외부 클릭을 감지하는 과정에서 컬러 버튼 클릭도 외부 클릭으로 인식됨.

**After**
`colorButtonRef`와 `colorPickerRef`를 분리하여 dropdown과 컬러 버튼의 바깥 영역을 클릭했을 때만 닫히도록 구현.

**Reason**
사용자가 컬러 버튼을 다시 눌렀을 때 의도와 다르게 dropdown이 닫히는 흐름을 방지하기 위함.

**Result**
사용자의 클릭 위치에 따른 컬러 버튼과 dropdown의 자연스러운 열기·닫기 처리.

---

### 4. keyword 입력 경험 개선

**Before**
keyword 입력 후 별도의 추가 흐름이 없고, 동일한 keyword 중복 입력 가능.

**After**
Enter 입력 시 keyword 추가, 공백 입력 방지, 중복 keyword 입력 방지.

**Reason**
사용자가 빠르게 keyword를 추가하면서도 불필요한 중복 데이터를 만들지 않도록 하기 위함.

**Result**
간단한 keyword 입력 흐름과 공백·중복 데이터 생성 방지.

---

### 5. Modal 배경 스크롤 방지

**Before**
Editor Modal을 열었을 때 배경 페이지가 함께 스크롤됨.

**After**  
Editor Modal이 열리면 `document.body.style.overflow = "hidden"`을 적용해 배경 스크롤을 막고, Modal이 닫히면 이전 스크롤 상태로 복구.

**Reason**
Modal을 사용하는 동안 사용자의 시선과 조작이 Modal 내부에 유지되도록 하기 위함.

**Result**
Modal 사용 중 배경 페이지 스크롤 방지 및 현재 작업에 대한 집중 유지.

---

### 6. 상세 Modal 메뉴 상태 초기화

**Before**
상세 Modal의 `...` 메뉴를 연 상태로 닫았다가 다시 열면 메뉴가 열린 상태로 유지됨.

**After**
표시 대상 `subColor` 변경 시 `isMenuOpen`을 `false`로 초기화.

**Reason**
Modal을 다시 열었을 때 이전에 사용한 메뉴 상태가 남아 있지 않도록 하기 위함.

**Result**
상세 Modal을 열 때마다 닫힌 상태로 표시되는 메뉴.

---

### 7. 상세 Modal 정보 계층 개선

**Before**
상세 Modal의 제목, 설명, keyword 영역 간 시각적 계층이 약함.

**After**
제목과 설명 영역 왼쪽 정렬, `# KEYWORDS` 섹션 헤더 추가.

**Reason**
사용자가 상세 정보를 제목 → 설명 → keyword 순서로 읽기 쉽도록 하기 위함.

**Result**
제목, 설명, keyword가 구분되는 명확한 정보 탐색 순서 제공.

---

### 8. Add/Edit 화면을 Modal에서 Page로 분리

**Before**
Add/Edit 입력을 Modal 내부에서 처리하여 레이아웃과 상태 관리가 복잡함.

**After**
Add/Edit 입력을 독립된 `ColorEditorPage`에서 처리하도록 구조 변경.

**Reason**
상세보기는 Modal, 작성/수정은 Page로 역할을 명확히 나누기 위함.

**Result**
넓은 입력 공간 확보 및 상세보기와 작성·수정 흐름의 명확한 역할 분리.

---

### 9. 저장 후 상세 Modal 자동 오픈

**Before**
Add/Edit 저장 후 상세 페이지로 돌아왔을 때 방금 추가하거나 수정한 항목을 바로 확인하기 어려움.

**After**
저장 후 방금 추가하거나 수정한 `subColor`의 상세 Modal 자동 오픈.

**Reason**
사용자가 저장 결과를 즉시 확인할 수 있는 흐름을 만들기 위함.

**Result**
저장 직후 추가·수정 결과 확인 및 명확한 사용자 피드백 제공.

---

### 10. 정보구조 재설계

**Before**
`Music / 성향 / 취향 / 감정 / 루틴` 구조는 자기 표현 서비스의 큰 분류로 사용하기에 각 항목의 범위가 불명확함.

**After**
카테고리를 `About Me / Taste / Interest / My Sides / Ideal Me` 구조로 변경.

**Reason**
사용자가 자신의 기록을 어느 카테고리에 추가할지 더 직관적으로 판단할 수 있도록 하기 위함.

**Result**
자기소개, 취향, 관심사, 내면의 특징, 이상향을 기준으로 한 기록 분류 가능.

---

### 11. SubColor 카드 정보 구조 개선

**Before**
SubColor 카드가 컬러칩과 제목 중심으로 표시되어 색상 자체의 정보를 확인하기 어려움.

**After**
컬러칩, `colorName`, HEX 코드, 제목을 함께 표시하는 정보 구조 적용.

**Reason**
컬러 자체의 정보와 사용자가 붙인 의미를 함께 보여주기 위함.

**Result**
카드 목록에서 색상 정보와 사용자가 작성한 기록을 함께 파악 가능.

---

### 12. Add Color 카드 일관성 개선

**Before**
Add Color 버튼이 일반 SubColor 카드와 다른 형태로 표시되어 카드 목록 안에서 시각적으로 분리되어 보임.

**After**
`AddSubColorSquare` 컴포넌트를 생성하고 일반 SubColor 카드와 유사한 정보 구조와 크기 적용.

**Reason**
추가 버튼도 같은 카드 목록 안의 요소처럼 인식되도록 하기 위함.

**Result**
SubColor 목록과 Add Color 카드 사이의 시각적 일관성 유지.

---

### 13. Editor Form validation 추가

**Before**  
제목 또는 설명이 비어 있어도 SubColor 저장 가능.

**After**  
저장 전 제목과 설명의 빈 값 검사. 필수 입력값이 없으면 저장 중단.

**Reason**  
내용이 없는 컬러 기록 생성을 방지하고 사용자가 필수 입력값을 인지할 수 있도록 하기 위함.

**Result**  
필수 입력값 검증 및 잘못된 SubColor 데이터 저장 방지.

---

### 14. 전체 컬러 통합 보기 추가

**Before**  
사용자가 추가한 컬러가 카테고리별 화면에 나뉘어 있어 전체 기록을 한눈에 확인하기 어려웠음.

**After**  
모든 카테고리의 컬러를 Pieces of Me 화면의 하나의 스티커 보드에서 표시.

**Reason**  
카테고리별 탐색뿐 아니라 사용자가 기록한 전체 컬러의 분위기와 분포를 한 화면에서 살펴볼 수 있도록 하기 위함.

**Result**  
동일한 데이터를 카테고리별 목록과 통합 시각화 화면에서 각각 활용하고, 전체 컬러 기록을 한눈에 확인 가능.

---

### 15. 페이지 이동 시 스크롤 위치 초기화

**Before**  
페이지를 아래로 스크롤한 상태에서 Editor Page로 이동하면 이전 페이지의 스크롤 위치가 유지되어 새 화면의 중간 또는 하단부터 표시됨.

**After**  
경로 변경 시 공통 `ScrollToTop` 컴포넌트에서 화면을 최상단으로 이동.

**Reason**  
사용자가 새로운 페이지로 이동했을 때 화면의 시작 지점부터 자연스럽게 내용을 확인할 수 있도록 하기 위함.

**Result**  
모든 페이지 이동 시 화면 상단에서 시작하는 일관된 탐색 흐름 제공.

---

## Technical Decisions

### 1. preset color 데이터 분리

**Description**
컬러 프리셋 데이터를 `presetColors.js` 파일로 분리.

**Reason**
컬러 데이터를 컴포넌트 내부에 직접 두지 않고 별도 파일에서 관리하기 위함.

**Result**
컬러 데이터와 UI 렌더링 역할 분리.

---

### 2. Add/Edit Form 재사용

**Description**
Add와 Edit에서 동일한 `SubColorForm` 컴포넌트 재사용.

**Reason**
Add UI와 Edit UI가 거의 동일하여 중복 컴포넌트를 줄이기 위함.

**Result**
`initialData` 유무에 따른 Add/Edit 모드 분기 및 동일한 입력 UI·검증 흐름 사용 가능.

---

### 3. updateSubColor 로직 구현

**Description**
기존 배열은 유지하고 수정 대상과 동일한 id를 가진 SubColor만 교체하도록 `map()` 사용.

**Reason**
기존 배열을 직접 변경하지 않고 수정 대상 데이터만 안전하게 교체하기 위함.

**Result**
기존 SubColor 목록 유지 및 수정 대상 데이터만 선택적으로 교체 가능.

---

### 4. colorGroups state lifting

**Description**
`colorGroups` state를 `MyPalette.jsx`가 아닌 `App.jsx`에서 관리.

**Reason**
`MyPalette`, `ColorGroupDetail`, `ColorEditorPage`가 동일한 데이터를 공유하고 변경 결과를 함께 반영해야 하기 때문.

**Result**
Add/Edit/Delete 결과를 `colorGroups`를 사용하는 여러 페이지에 일관되게 반영 가능.

---

### 5. local state 제거 및 단일 데이터 소스 적용

**Description**
`ColorGroupDetail`의 기존 `subColors` local state를 제거하고 `selectedGroup.subColors` 기준으로 렌더링.

**Reason**
`App.jsx`의 state와 `ColorGroupDetail`의 local state가 동시에 존재하면 서로 다른 값을 가질 수 있기 때문.

**Result**
`App.jsx`의 `colorGroups`를 단일 데이터 소스로 사용하고 Add/Edit/Delete 결과를 상세 화면에 즉시 반영 가능.

---

### 6. URL params 기반 Add/Edit 모드 분기

**Description**
`/mypalette/:id/new`, `/mypalette/:id/edit/:subColorId` 경로를 추가하고 `useParams()`로 `id`와 `subColorId` 확인.

**Reason**
URL을 기준으로 카테고리와 SubColor를 찾고 Add 화면과 Edit 화면의 역할을 구분하기 위함.

**Result**
`subColorId` 존재 여부에 따라 동일한 Editor Page에서 Add/Edit 모드 분기 가능.

---

### 7. navigate state를 활용한 Modal 복원

**Description**
저장 후 `navigate()`의 state에 `reopenSubColorId`를 담아 이전 상세 페이지로 전달.

**Reason**
페이지 이동 후에도 방금 저장한 항목의 상세 Modal을 다시 열기 위함.

**Result**
`useLocation()`으로 전달된 값을 확인하고 `useEffect()`에서 해당 SubColor 상세 Modal 자동 오픈 가능.

---

### 8. Save와 Cancel 역할 분리

**Description**
`SubColorForm` 저장 로직에서 `onClose()` 자동 호출 제거.

**Reason**
Save 후 페이지 이동 흐름과 Cancel의 화면 닫기 흐름이 하나의 함수 안에서 섞이지 않도록 하기 위함.

**Result**
Save는 `onAdd` 또는 `onUpdate`, Cancel은 `onClose`가 담당하는 명확한 책임 분리.

---

### 9. Modal Form을 Page Form으로 리팩토링

**Description**
기존 Form의 fixed overlay, backdrop, z-index, Modal용 box-shadow 등 Modal 전용 스타일 제거.

**Reason**
Modal로 쓰던 form을 Page 안에서 자연스럽게 표시하기 위함.

**Result**
`SubColorForm`을 Add/Edit Editor Page에서 재사용할 수 있는 일반 Form 구조 확보.

---

### 10. 컴포넌트 이름 역할 정리

**Description**
`AddSubColorForm`을 `SubColorForm`으로 이름 변경.

**Reason**
해당 컴포넌트가 Add 전용이 아니라 Add/Edit에서 함께 사용하는 Form 역할을 하기 때문.

**Result**
컴포넌트 이름만으로 Add/Edit 공용 Form 역할 파악 가능.

---

### 11. 저장 전 validation 흐름 추가

**Description**  
`handleSave`에서 `nextErrors` 객체를 생성하고, `Object.values().some()`으로 에러 존재 여부를 확인한 뒤 저장 여부 결정.

**Reason**  
Form 입력 UI와 실제 저장 로직을 분리하면서도, 저장 직전에 필수 입력값을 한 번 더 검증하기 위함.

**Result**  
Add/Edit 공용 Editor Page에서 동일한 validation 흐름 사용 및 에러 데이터의 저장 함수 전달 방지.

---

### 12. 공통 ScrollToTop 컴포넌트 적용

**Description**  
`useLocation()`으로 현재 `pathname`을 확인하고, 경로 변경 시 `useEffect()`에서 `window.scrollTo(0, 0)` 실행.

**Reason**  
각 이동 버튼이나 페이지에 스크롤 초기화 코드를 반복하지 않고 Router를 통한 모든 페이지 이동에 공통 적용하기 위함.

**Result**  
스크롤 초기화 책임을 하나의 컴포넌트에서 관리하고, 중복 코드 감소 및 일관된 페이지 이동 동작 유지.
