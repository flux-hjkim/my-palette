# MyPalette Improvements

## UX Improvements

### 1. 컬러 선택 UI 구조 개선

**Before**
컬러칩이 한 번에 모두 표시되어 Add Form의 높이가 과도하게 길어짐.

**After**
sample 컬러칩 + more 버튼 + dropdown 구조로 변경.

**Reason**
컬러 선택 영역이 입력 화면 전체를 과도하게 차지하지 않도록 하기 위함.

**Result**
form 전체 높이를 안정적으로 유지하면서 컬러 선택 가능.

---

### 2. 컬러 dropdown 레이아웃 안정화

**Before**
dropdown open 시 Add Form 전체 높이가 늘어나고, 스크롤 생성 시 컬러칩 위치가 이동함.

**After**
dropdown을 `position: absolute`로 분리하고 `scrollbar-gutter: stable` 적용.

**Reason**
컬러 선택 UI가 열려도 기존 form 레이아웃이 흔들리지 않도록 하기 위함.

**Result**
dropdown 표시 여부와 관계없이 안정적인 화면 구조 유지 가능.

---

### 3. 컬러 dropdown 외부 클릭 닫힘 개선

**Before**
dropdown 외부 클릭 감지 시 컬러 버튼 클릭도 외부 클릭으로 인식됨.

**After**
`colorButtonRef`와 `colorPickerRef`를 분리하여 dropdown과 버튼 외부 클릭 시에만 닫히도록 구현.

**Reason**
사용자가 컬러 버튼을 다시 눌렀을 때 의도와 다르게 dropdown이 닫히는 흐름을 방지하기 위함.

**Result**
컬러 선택 버튼과 dropdown의 상호작용을 더 자연스럽게 처리 가능.

---

### 4. keyword 입력 경험 개선

**Before**
keyword 입력 후 별도 처리 흐름이 없고, 동일 keyword 중복 입력 가능.

**After**
Enter 입력 시 keyword 추가, 공백 입력 방지, 중복 keyword 입력 방지 구현.

**Reason**
사용자가 빠르게 keyword를 추가하면서도 불필요한 중복 데이터를 만들지 않도록 하기 위함.

**Result**
keyword 입력 흐름 단순화 및 데이터 품질 유지 가능.

---

### 5. 모달 배경 스크롤 방지

**Before**
editor modal open 시 배경 페이지가 함께 스크롤됨.

**After**
modal mount 시 `document.body.style.overflow = "hidden"` 적용, unmount 시 기존 상태 복구.

**Reason**
modal에 집중해야 하는 상황에서 배경 페이지가 움직이지 않도록 하기 위함.

**Result**
modal 사용 중 화면 초점 유지 가능.

---

### 6. 상세 Modal 메뉴 상태 초기화

**Before**
상세 Modal의 `...` 메뉴를 연 상태로 닫았다가 다시 열면 메뉴가 열린 상태로 유지됨.

**After**
`subColor` 변경 시 `isMenuOpen`을 `false`로 초기화하도록 구현.

**Reason**
Modal 재진입 시 이전 UI 상태가 남아있지 않도록 하기 위함.

**Result**
상세 Modal을 항상 초기 상태에서 확인 가능.

---

### 7. 상세 Modal 정보 계층 개선

**Before**
상세 Modal의 제목, 설명, keyword 영역 간 시각적 계층이 약함.

**After**
제목과 설명 영역 좌측 정렬, `# KEYWORDS` 섹션 헤더 추가.

**Reason**
사용자가 상세 정보를 제목 → 설명 → keyword 순서로 읽기 쉽도록 하기 위함.

**Result**
상세 정보의 읽기 흐름 개선.

---

### 8. Add/Edit 입력 경험 개선

**Before**
Add/Edit 입력을 Modal 내부에서 처리하여 레이아웃과 상태 관리가 복잡해짐.

**After**
Add/Edit 입력을 독립된 `ColorEditorPage` 구조로 분리.

**Reason**
상세보기는 Modal, 작성/수정은 Page로 역할을 명확히 나누기 위함.

**Result**
입력 화면의 레이아웃 자유도 향상 및 Add/Edit 흐름 분리 가능.

---

### 9. 저장 후 상세 Modal 자동 오픈

**Before**
Add/Edit 저장 후 상세 페이지로 돌아왔을 때 방금 추가/수정한 항목을 바로 확인하기 어려움.

**After**
저장 후 해당 subColor의 상세 Modal이 자동으로 열리도록 구현.

**Reason**
사용자가 저장 결과를 즉시 확인할 수 있는 흐름을 만들기 위함.

**Result**
저장 이후의 사용자 피드백 흐름 개선.

---

### 10. 정보구조 재설계

**Before**
`Music / 성향 / 취향 / 감정 / 루틴` 구조가 자기 표현 서비스의 큰 분류로 사용하기에는 범위가 애매함.

**After**
`About Me / Taste / Interest / My Sides / Ideal Me` 구조로 변경.

**Reason**
사용자가 기록 위치를 더 직관적으로 판단할 수 있도록 하기 위함.

**Result**
자기소개, 취향, 관심사, 내면의 특징, 이상향 흐름으로 정보 분류 가능.

---

### 11. subColor 카드 정보 구조 개선

**Before**
subColor 카드가 컬러칩 + title 중심으로 표시됨.

**After**
컬러칩 + `colorName` + HEX + title 구조로 변경.

**Reason**
컬러 자체의 정보와 사용자가 붙인 의미를 함께 보여주기 위함.

**Result**
카드 목록에서 색상 정보와 기록 내용을 함께 파악 가능.

---

### 12. Add Color 카드 일관성 개선

**Before**
Add Color 버튼이 일반 subColor 카드와 시각적으로 따로 노는 느낌이 있음.

**After**
`AddSubColorSquare` 컴포넌트를 생성하고 일반 카드와 유사한 정보 구조로 변경.

**Reason**
추가 버튼도 같은 카드 목록 안의 요소처럼 인식되도록 하기 위함.

**Result**
카드 리스트의 시각적 일관성 향상.

---

## Technical Decisions

### 1. preset color 데이터 분리

**Description**
컬러 프리셋 데이터를 `presetColors.js` 파일로 분리.

**Reason**
컬러 데이터를 컴포넌트 내부에 직접 두지 않고 별도 데이터로 관리하기 위함.

**Result**
컬러 그룹별 데이터 관리 및 UI 렌더링 구조 분리 가능.

---

### 2. Add/Edit Form 재사용

**Description**
Add와 Edit에서 동일한 Form 컴포넌트를 재사용하도록 구조 변경.

**Reason**
Add UI와 Edit UI가 거의 동일하여 중복 컴포넌트를 줄이기 위함.

**Result**
`initialData` 유무를 기준으로 Add/Edit 모드 분기 가능.

---

### 3. updateSubColor 로직 구현

**Description**
`map()`을 사용하여 동일 id를 가진 subColor만 교체하도록 구현.

**Reason**
배열 전체를 직접 수정하지 않고 특정 데이터만 안전하게 업데이트하기 위함.

**Result**
기존 subColor 목록을 유지하면서 수정 대상 데이터만 교체 가능.

---

### 4. colorGroups state lifting

**Description**
`colorGroups` state를 `MyPalette`가 아닌 `App.jsx`에서 관리하도록 변경.

**Reason**
`MyPalette`, `ColorGroupDetail`, `ColorEditorPage`가 동일한 데이터를 공유해야 하기 때문.

**Result**
Add/Edit/Delete 결과를 여러 페이지에서 일관되게 반영 가능.

---

### 5. local state 제거 및 단일 데이터 소스 적용

**Description**
`ColorGroupDetail`의 기존 `subColors` local state를 제거하고 `selectedGroup.subColors` 기준으로 렌더링하도록 변경.

**Reason**
App state와 local state가 동시에 존재하면 데이터 반영이 꼬일 수 있기 때문.

**Result**
단일 데이터 소스를 기준으로 상세 페이지 렌더링 가능.

---

### 6. URL params 기반 Add/Edit 모드 분기

**Description**
`/mypalette/:id/new`, `/mypalette/:id/edit/:subColorId` route를 추가하고 `useParams()`로 값을 가져오도록 구현.

**Reason**
URL 기반으로 group과 subColor 데이터를 찾고 Add/Edit 화면의 역할을 구분하기 위함.

**Result**
`subColorId` 존재 여부에 따라 Add/Edit 모드 분기 가능.

---

### 7. navigate state를 활용한 Modal 복원

**Description**
저장 후 `navigate()`의 `state`로 `reopenSubColorId` 전달.

**Reason**
페이지 이동 후에도 방금 저장한 항목의 상세 Modal을 다시 열기 위함.

**Result**
`useLocation()`과 `useEffect()`를 활용한 UI 상태 복원 가능.

---

### 8. Save와 Cancel 역할 분리

**Description**
`SubColorForm` 저장 로직에서 `onClose()` 자동 호출 제거.

**Reason**
Save 후 이동 흐름과 Cancel 닫기 흐름이 섞이지 않도록 하기 위함.

**Result**
Save는 `onAdd` / `onUpdate`, Cancel은 `onClose`로 역할 분리 가능.

---

### 9. Modal Form을 Page Form으로 리팩토링

**Description**
기존 form의 fixed overlay, backdrop, z-index, modal box-shadow 등 modal 전용 스타일 제거.

**Reason**
Modal로 쓰던 form을 Page 안에서 자연스럽게 표시하기 위함.

**Result**
`SubColorForm`을 페이지용 form 구조로 재사용 가능.

---

### 10. 컴포넌트 이름 역할 정리

**Description**
`AddSubColorForm`을 `SubColorForm`으로 이름 변경.

**Reason**
해당 컴포넌트가 Add 전용이 아니라 Add/Edit 공용 form 역할을 하게 되었기 때문.

**Result**
컴포넌트 이름만 보고도 실제 역할 파악 가능.
