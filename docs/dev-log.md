## MY PALETTE DEV LOG

### 2026-06-04

#### 오늘 한 일

- Notion 구조 및 docs 폴더 생성
- `dev-log.md`, `requirements.md`, `backlog.md` 작성 시작
- AddSubColorForm 모달 UI 디자인 수정 (컬러 선택 프리셋 추가)
- preset color 데이터 구조 설계
- `presetColors.js` 파일 생성 및 색상 데이터 분리
- 선택한 컬러에 따라 미리보기 색상 변경 구현
- 컬러 프리셋을 선택할 수 있도록 동그란 컬러칩 UI 구현 (`map()` 활용)
- 선택된 컬러 강조 애니메이션 추가
- 컬러 선택 토글 UI 구현
- Red / Blue / Black / Orange / Green / Yellow 컬러 프리셋 데이터 추가

#### 문제

- AddSubColorForm 부모 컴포넌트에서 `colorKey` props 전달 누락
- 컬러칩 UI가 한 번에 모두 표시되며 모달 높이가 과도하게 길어짐

#### 해결

- AddSubColorForm 부모 컴포넌트에 'colorKey={selectedGroup.colorKey}' 추가
- 컬러 선택 영역을 토글 방식으로 수정 (버튼 클릭 시 나타남)

#### 배운 점

- React에서 `map()`은 배열 데이터를 UI로 변환할 때 핵심적으로 사용됨

#### 다음 할 일

- keyword 입력 및 Enter 추가 기능 구현
- 저장된 keyword UI 표시
- selectedColor 기반 저장 기능 테스트
- 모달 width 및 여백 디자인 수정
- 컬러칩 hover 효과 추가
- "more" 형태의 컬러칩 펼치기 UI 고민
- 카드 상세페이지 레이아웃 정리

### 2026-06-05

#### 오늘 한 일

- preset color 기반 컬러 선택 드롭다운 UI 구현
- 선택된 컬러를 버튼 형태의 컬러칩으로 표시
- 컬러칩 클릭 시 `selectedColor` state 변경 구현
- 드롭다운: sample 컬러칩 (4개) + `more` 버튼 구조 설계
- `showAllColors` state 추가 및 컬러칩 펼치기 구현 (`more` 버튼 클릭 시 펼치기)
- 전체 컬러칩 영역에 scroll UI 적용
- `scrollbarGutter: "stable"` 적용으로 스크롤 생성 전후 레이아웃 흔들림 방지 (위치 이동 x)
- 드롭다운을 `position: absolute` 방식으로 수정하여 AddSubColorForm 전체 높이가 늘어나지 않도록 개선
- 드롭다운 외부 클릭 시 자동 닫힘 기능 구현 (`useRef`, `useEffect` 활용)
- 버튼 재클릭 시 드롭다운 toggle 되도록 수정

#### 문제

- 드롭다운 open 시 AddSubColorForm 전체 높이가 늘어남
- 컬러칩 grid width 계산 문제로 컬러칩이 영역 밖으로 튀어나감
- `more` 버튼을 클릭하여 스크롤이 생성되면 컬러칩 위치가 스크롤 크기만큼 이동하는 현상 발생
- 드롭다운 외부 클릭 감지 시 버튼 클릭도 외부 클릭으로 인식됨

#### 해결

- 드롭다운을 `position: absolute` 방식으로 변경
- 컬러칩 grid를 기존 6열에서 5열 기준으로 수정
- scroll wrapper에 `scrollbarGutter: "stable"` 적용
- `padding` 및 `justifyContent` 조정으로 컬러칩 위치 보정
- `colorButtonRef` 와 `colorPickerRef`를 분리하여 외부 클릭 감지 수정 (드롭다운과 버튼 외 클릭 시 드롭다운 닫기)

#### 배운 점

- `useRef`는 특정 DOM 요소를 참조할 때 사용됨
- `useEffect`는 컴포넌트 렌더 이후 실행되는 side effect 처리에 사용됨
- `addEventListener` 사용 시 cleanup(`removeEventListener`)이 중요함
- cleanup을 하지 않으면 이벤트 중복 등록 및 memory leak 문제가 발생할 수 있음
- `contains()` 는 특정 요소가 내부에 포함되어 있는지 boolean 값으로 반환함
- `absolute positioning`을 활용하면 UI 크기 변화 없이 dropdown/popup 구현 가능
- `scrollbarGutter: stable` 속성으로 스크롤 생성 시 레이아웃 흔들림을 줄일 수 있음

#### 다음 할 일

- keyword 입력 후 Enter 추가 기능 구현
- keyword 삭제 기능 구현
- 저장된 keyword UI 출력
- selectedColor 기반 저장 데이터 최종 확인
- dropdown animation 추가 여부 고민
- 카드 상세페이지 레이아웃 정리
- 폰트 및 전체 typography 정리

### 2026-06-09

#### 오늘 한 일

- keyword 입력, 배열 state 추가 (`keywordInput`, `keywords`)
- Enter 입력 시 keyword 배열에 추가되도록 구현 (`onKeyDown`)
- 공백 입력 방지 처리 (`trim`)
- keyword 추가 후 input 초기화 구현
- `map()`을 사용하여 저장된 keyword UI 출력 구현
- keyword 데이터 흐름 확인을 위한 console.log 테스트 진행
- `keywords.includes()`를 사용하여 중복 keyword 입력 방지 구현

#### 문제

- 동일 state를 중복 선언하여 redeclare 에러 발생 (`keywordInput`, `keywords`를 중복 추가함)

#### 해결

- 중복 선언된 state 제거

#### 배운 점

- `onKeyDown`으로 특정 키(Enter) 입력 감지 가능
- `e.key`를 통해 사용자가 누른 키를 확인할 수 있음
- `map()`을 사용하여 배열 데이터를 JSX로 렌더링할 수 있음
- `map()`의 첫 번째 인자는 현재 요소, 두 번째 인자는 index(순번)임
- `map()` 인자 이름은 자유롭게 지정할 수 있지만 의미가 드러나는 이름을 사용하는 것이 좋음
- `() => (JSX)`는 JSX를 반환하는 화살표 함수 축약 문법임

#### 다음 할 일

- keyword 삭제 기능 구현
- selectedColor 기반 저장 데이터 최종 확인
- dropdown animation 추가 여부 고민
- 카드 상세페이지 레이아웃 정리
- 폰트 및 전체 typography 정리

### 2026-06-10

#### 오늘 한 일

- `selectedColor` 기반 저장 데이터 최종 확인
- 저장된 sub color 데이터가 카드 UI에 정상 출력되는지 확인
- `filter()`를 사용하여 keyword 삭제 기능 구현
- keyword 클릭 시 해당 index 기준으로 배열에서 제거되도록 처리
- editor modal open 시 body scroll lock 적용 (모달 뒤 배경의 스크롤바가 이동하지 않도록 수정)
- `description` textarea 200자 입력 제한 적용
- 컬러 그룹 추가 기능 제거 검토 및 고정 카테고리 구조로 방향성 정리
- SubColor 상세 모달 UI 구조 개선 방향 설계
- 상세 모달에 `...` 메뉴 추가
- Delete 메뉴 구현
- 상세 모달에서 sub color 삭제 기능 구현

#### 문제

- 삭제 기능 구현 시 하위 컴포넌트(SubColorModal)에서 상위 state(`subColors`)에 직접 접근할 수 없음
- 모달이 열려 있을 때 배경 페이지가 함께 스크롤됨

#### 해결

- 삭제 함수(`deleteSubColor`)를 state를 관리하는 상위 컴포넌트에 생성
- props를 통해 `onDelete` 전달하여 하위 컴포넌트에서 삭제 요청 처리
- `useEffect`를 사용하여 modal mount 시 `document.body.style.overflow = "hidden"` 적용
- cleanup 함수에서 기존 overflow 상태 복구

#### 배운 점

- React에서는 배열을 직접 수정하기보다 `filter()`를 사용해 새로운 배열을 만들어 state를 업데이트하는 패턴을 사용함
- `filter((item, index) => ...)`에서 `item`은 현재 요소, `index`는 현재 순번을 의미함
- `item`을 사용하지 않을 경우 `_`로 표기할 수 있음
- `setState((prev) => ...)` 패턴에서 `prev`는 React가 전달하는 이전 상태값임
- 화살표 함수 `=>`는 함수를 만드는 문법이며, 축약형에서는 return이 생략될 수 있음
- `useEffect`의 cleanup 함수는 컴포넌트가 제거될 때 실행됨
- `document.body.style.overflow = "hidden"`으로 페이지 스크롤을 잠글 수 있음
- 모달 컴포넌트가 mount/unmount 되는 시점에 맞춰 전역 UI 상태를 제어할 수 있음
- CRUD 관점에서 Create, Read, Delete 기능을 구현 완료함

#### 다음 할 일

- Edit 기능 구현
- AddSubColorForm 재사용 구조 적용
- 기존 데이터 기반 수정 모드(initial data) 구성
- 상세 모달 좌측 정렬 레이아웃 적용
- `# Keywords` 섹션 UI 정리
- 상세 모달 `...` 메뉴 UI 개선
- dropdown animation 추가 여부 고민
- 폰트 및 전체 typography 정리

### 2026-06-12

#### 오늘 한 일

- 상세 모달(`SubColorModal`)의 `...` 메뉴 상태 초기화 버그 수정
- `useEffect(() => { setIsMenuOpen(false); }, [subColor])` 적용
- 상세 모달 제목 및 설명 영역 좌측 정렬 적용 (`textAlign: "left"`)
- `# KEYWORDS` 섹션 헤더 추가

#### 문제

- `...` 메뉴를 연 상태로 모달을 닫았다가 다시 열면 메뉴가 열린 상태로 유지됨
- 상세 모달의 제목, 설명, 키워드 영역의 시각적 계층(Hierarchy)이 약하게 느껴짐

#### 해결

- `subColor`가 변경될 때 `isMenuOpen`을 `false`로 초기화하여 메뉴 상태 리셋
- 텍스트를 좌측 정렬하여 정보 구조를 보다 명확하게 표시
- `# KEYWORDS` 헤더를 추가하여 키워드 영역을 별도 섹션으로 분리

#### 배운 점

- `useEffect(..., [subColor])`는 `subColor` 값이 변경될 때마다 실행됨
- 모달을 닫을 때 `selectedSubColor`가 `null`로 변경되며, 다시 열 때 새로운 값이 전달되어 effect가 실행됨

#### 다음 할 일

- Edit 기능 구현
- AddSubColorForm 재사용 구조 적용
- 기존 데이터 기반 수정 모드(initial data) 구성
- 상세 모달 spacing 규칙 정리
- typography 규칙(Label / Title / Body / Tag) 정리
- 상세 모달 `...` 메뉴 UI 개선
- dropdown animation 추가 여부 고민
- 전체 디자인 시스템 정리

### 2026-06-17

#### 오늘 한 일

- 상세 모달의 Edit 버튼 클릭 시 editor modal이 열리도록 구현
- `editingSubColor` state 추가
- Edit 클릭 시 수정 대상 데이터를 `editingSubColor`에 저장하도록 구현
- `AddSubColorForm`에 `initialData` props 전달
- Add 모드와 Edit 모드에서 동일한 Form 컴포넌트를 재사용하도록 구조 변경
- `initialData`를 활용하여 기존 데이터(`name`, `description`, `keywords`, `selectedColor`) 자동 입력 구현
- `handleSave()`에서 Add / Edit 분기 처리 구현
- `updateSubColor()` 함수 구현
- `map()`을 사용하여 동일 id를 가진 subColor 데이터 교체 처리
- 수정 저장 후 `selectedSubColor` 상태 동기화
- 수정된 데이터가 상세 모달에 즉시 반영되도록 구현
- editor modal z-index 조정

#### 문제

- Edit 기능 구현 시 Add 로직과 Edit 로직을 구분할 기준이 필요
- 수정 저장 후 상세 모달에 기존 데이터가 그대로 표시됨
- editor modal이 상세 모달 뒤에 렌더링되어 정상적으로 보이지 않음

#### 해결

- `initialData` 존재 여부를 기준으로 Add / Edit 모드 분기 처리
- `updateSubColor()` 함수를 생성하여 기존 데이터 수정 로직 구현
- 수정 완료 후 `setSelectedColor(updatedSubColor)`를 호출하여 상세 모달 상태 동기화
- editor modal의 z-index를 상세 모달보다 높게 설정하여 레이어 문제 해결

#### 배운 점

- 하나의 Form 컴포넌트를 Add / Edit 용도로 재사용할 수 있음
- `initialData`를 활용하면 수정 모드에서 기존 데이터를 state 초기값으로 사용할 수 있음
- 배열 데이터 수정 시 `map()`을 사용하여 특정 요소만 교체할 수 있음
- 수정 대상 데이터(`editingSubColor`)와 현재 선택된 데이터(`selectedSubColor`)는 서로 다른 역할의 state임
- Modal UI는 상태(state)와 z-index를 조합하여 계층 구조를 관리할 수 있음

#### 다음 할 일

- Edit 저장 후 상세 모달 유지 여부 UX 결정
- 상세 모달 spacing 규칙 정리
- typography 규칙(Label / Title / Body / Tag) 정리
- 상세 모달 `...` 메뉴 UI 개선
- Edit / Delete 아이콘 디자인 적용
- editor modal postcard 비율 조정
- keyword 영역 2줄 이상 처리 방식 결정
- dropdown animation 추가 여부 고민
- 전체 디자인 시스템 정리

### 2026-06-22

#### 오늘 한 일

- MyPalette의 메인 카테고리 구조를 새롭게 정리
- 기존 `Music / 성향 / 취향 / 감정 / 루틴` 구조를 `About Me / Taste / Interest / My Sides / Ideal Me`로 변경
- 각 카테고리의 역할과 의미를 재정의
  - `About Me`: 나를 기본적으로 설명하는 이야기
  - `Taste`: 내가 좋아하는 감각과 취향
  - `Interest`: 내가 몰입하고 관심을 가지는 것
  - `My Sides`: 내 안의 여러 면과 특징
  - `Ideal Me`: 내가 되고 싶은 모습과 방향
- 각 카테고리의 `subColors` 데이터를 새 컨셉에 맞게 수정
- `subColor` 카드 정보 구조를 변경
  - 기존: 컬러칩 + title
  - 변경: 컬러칩 + `colorName` + HEX + title
- `SubColorSquare` 컴포넌트의 레이아웃 수정
- 컬러칩보다 텍스트 영역이 더 넓게 보이도록 카드 width와 swatch width를 분리
- 카드 텍스트를 좌측 정렬로 변경하여 컬러 팔레트 레퍼런스 느낌 적용
- `AddSubColorSquare` 컴포넌트 생성 ( '+' 버튼)
- Add Color 버튼을 일반 컬러칩 카드와 동일한 정보 구조로 변경
- Add Color 카드에도 hover motion 적용
- 상세 모달을 열 때 컬러칩만 클릭하도록 구현할 지 결정 필요 (현재 글자 클릭해도 모달 오픈)
- Add/Edit Editor를 Modal이 아닌 Page로 분리하는 방향 결정
- 상세보기는 Modal로 유지하고, Add/Edit은 별도 Editor Page에서 처리하는 구조로 변경 예정
- Editor Page 관련 route 구조 초안 정리
  - `/mypalette/:groupId/new`
  - `/mypalette/:groupId/edit/:subColorId`
- 새로운 페이지 아이디어 백로그 정리
  - 컬러칩 스티커 보드 형태의 `Pieces of Me` 페이지
  - 날짜별 컬러 기록을 보여주는 `Palette Log` 또는 Calendar 페이지

#### 문제

- 기존 카테고리명이 프로젝트의 목적과 잘 맞지 않음
- `Music`, `감정`, `루틴` 등은 “나는 누구인가”를 설명하는 큰 카테고리로 쓰기에는 범위가 애매함
- `Strength`, `Value`, `Pattern`, `Defense` 등은 너무 좁거나 추상적으로 느껴짐
- Add Color 버튼이 일반 컬러칩 카드와 시각적으로 따로 노는 느낌이 있음
- Editor Modal 안에 Add/Edit 기능을 계속 넣으면 레이아웃과 CSS가 복잡해질 가능성이 있음
- 입력 폼이 단순 모달보다 독립된 페이지에 더 적합해 보임

#### 해결

- 카테고리를 더 쉽고 보편적인 이름으로 재정의
  - `About Me`
  - `Taste`
  - `Interest`
  - `My Sides`
  - `Ideal Me`
- `groupName`, `percentage`, `subColors` 내용만 새 컨셉에 맞게 수정
- Add Color 전용 컴포넌트인 `AddSubColorSquare`를 분리하여 생성
- Add Color 카드도 `add color / NEW / 새로운 색 기록` 구조로 표시
- 버튼 기본 스타일을 reset하여 일반 컬러칩 카드와 시각적으로 더 자연스럽게 맞춤
- Add/Edit은 Modal에서 Page로 분리하고, 상세보기 Modal은 유지하는 방향으로 UX 결정

#### 배운 점

- Modal은 빠른 확인이나 간단한 입력에는 좋지만, 입력 항목이 많고 레이아웃이 중요한 경우 Page 구조가 더 적합할 수 있음
- 상세보기는 Modal, 작성/수정은 Page로 분리하면 UX 역할이 더 명확해짐
- 같은 컬러 데이터도 목록, 스티커 보드, 달력 등 여러 방식으로 시각화할 수 있음

#### 다음 할 일

- `ColorEditorPage.jsx` 생성
- Add/Edit Editor를 Modal에서 Page 구조로 전환
- `/mypalette/:groupId/new` route 추가
- `/mypalette/:groupId/edit/:subColorId` route 추가
- AddSubColorSquare 클릭 시 New Editor Page로 이동하도록 구현
- 상세 모달의 Edit 클릭 시 Edit Editor Page로 이동하도록 구현
- Editor Page에서 `useParams()`로 `groupId`, `subColorId` 가져오기
- `subColorId` 존재 여부에 따라 Add / Edit 모드 분기
- Edit 모드에서 기존 데이터 자동 입력
- Save 후 `/mypalette/:groupId`로 돌아가기
- 가능하다면 Save 후 방금 추가/수정한 상세 모달 자동 오픈 구현
- Editor Page 레이아웃 설계
  - 좌측: 카테고리 가이드 / 감성 문구 / 컬러 프리뷰
  - 우측: Title / Description / Keywords / Color 입력폼
- Editor Page 디자인 레퍼런스 기반으로 form UI 정리
- 상세 모달 spacing 및 typography 정리
- hover motion 개선 아이디어 보류 후 추후 적용 검토
- Navigation Bar 구조 설계
- `Pieces of Me` 페이지 아이디어 구체화
- `Palette Log` 또는 Calendar 페이지 아이디어 구체화

### 2026-06-23

#### 오늘 한 일

- `ColorEditorPage.jsx` 생성
- Add/Edit Editor를 Modal 구조에서 Page 구조로 전환
- App Router에 Add/Edit route 추가
  - `/mypalette/:id/new`
  - `/mypalette/:id/edit/:subColorId`

- `AddSubColorSquare` 클릭 시 `/mypalette/:id/new`로 이동하도록 구현
- 상세 모달의 Edit 버튼 클릭 시 `/mypalette/:id/edit/:subColorId`로 이동하도록 구현
- `useNavigate()`를 사용하여 클릭 이벤트에서 페이지 이동 처리
- `useParams()`를 사용하여 URL의 `id`, `subColorId` 값을 가져오도록 구현
- `ColorEditorPage`에서 `subColorId` 존재 여부를 기준으로 Add / Edit 모드 분기
- `Boolean(subColorId)`를 사용하여 `isEditMode` 값 생성
- `id`를 기준으로 `selectedGroup` 데이터 찾기 구현
- `subColorId`를 기준으로 `selectedSubColor` 데이터 찾기 구현
- Edit Page에서 기존 subColor 데이터가 form에 자동 입력되도록 구현
- `colorGroups` state를 `MyPalette`가 아닌 `App.jsx`에서 관리하도록 구조 변경
- `App.jsx`에 `addSubColor`, `updateSubColor` 함수 구현
- `MyPalette`, `ColorGroupDetail`, `ColorEditorPage`가 동일한 `colorGroups` state를 props로 공유하도록 수정
- `ColorGroupDetail`에서 `initialColorGroups` 대신 props로 받은 `colorGroups`를 사용하도록 변경
- 기존 `subColors` local state를 제거하고 `selectedGroup.subColors`를 기준으로 렌더링하도록 변경
- Delete 기능을 `setColorGroups` 기준으로 수정
- Add / Edit 저장 시 App state가 정상적으로 업데이트되도록 구현
- 저장 후 `/mypalette/:id`로 이동하도록 구현
- 저장 후 방금 추가/수정한 subColor 상세 모달이 자동으로 열리도록 구현
- `navigate()`의 `state`로 `reopenSubColorId` 전달
- `ColorGroupDetail`에서 `useLocation()`과 `useEffect()`를 사용하여 `reopenSubColorId`를 감지
- `reopenSubColorId`에 해당하는 subColor를 찾아 `selectedSubColor`로 설정
- `SubColorModal`이 `selectedSubColor` 값을 받아 자동으로 다시 열리도록 구현
- `SubColorForm` 저장 로직에서 `onClose()` 자동 호출 제거
- 저장 로직과 닫기 로직을 분리
- 기존 모달용 form wrapper 제거
- `AddSubColorForm`을 페이지용 form 구조로 변경
- `AddSubColorForm` 컴포넌트 이름을 `SubColorForm`으로 변경
- 전체 검색을 사용하여 `AddSubColorForm` 이름이 남아있지 않은지 확인

#### 문제

- Add/Edit Editor를 Modal로 유지하면 레이아웃과 상태 관리가 복잡해짐
- `ColorEditorPage`에서 데이터를 수정해도 다른 페이지에 변경사항이 반영되지 않음
- 각 페이지가 `initialColorGroups`를 따로 import해서 사용하고 있어 동일한 데이터 상태를 공유하지 못함
- 기존 `ColorGroupDetail`의 `subColors` local state와 App state가 혼재되어 삭제/수정 반영이 꼬일 가능성이 있음
- `setSubColors`를 제거한 뒤에도 삭제 로직에서 `setSubColors`를 호출하고 있어 삭제 기능이 동작하지 않음
- 저장 후 상세 페이지로 돌아갔을 때 수정한 상세 모달이 자동으로 열리지 않음
- `navigate`로 `state`를 전달했지만 `AddSubColorForm` 내부의 `handleSave()`에서 `onClose()`가 다시 실행되어 state 없는 navigate가 한 번 더 발생함
- 기존 `AddSubColorForm`이 fixed overlay, backdrop, z-index 등 모달 스타일을 가지고 있어 Page 안에서도 모달처럼 보임
- `AddSubColorForm`이라는 이름이 Add/Edit 공용 form 역할과 맞지 않게 됨
- `reopenSubColorId`의 대소문자 오타 가능성 때문에 location state 확인이 필요했음

#### 해결

- Add/Edit Editor를 별도 Page인 `ColorEditorPage`로 분리
- Route를 통해 Add/Edit URL과 `ColorEditorPage`를 연결
- Add 버튼과 Edit 버튼에는 `navigate()`를 연결하여 페이지 이동 처리
- `ColorEditorPage`에서 `useParams()`로 `id`, `subColorId`를 받아 Add/Edit 모드를 구분
- `selectedGroup`, `selectedSubColor`를 URL params 기반으로 찾도록 구현
- `colorGroups` state를 `App.jsx`로 끌어올려 단일 데이터 소스로 관리
- `MyPalette`, `ColorGroupDetail`, `ColorEditorPage`에 `colorGroups`를 props로 전달
- Add/Edit 저장 함수도 App에서 관리하고 하위 페이지에 props로 전달
- `ColorGroupDetail`에서 `subColors` local state를 제거하고 `selectedGroup.subColors`를 직접 사용
- Delete 로직도 `setColorGroups`를 사용하도록 변경
- 저장 후 `navigate(`/mypalette/${id}`, { state: { reopenSubColorId } })` 형태로 이동
- `ColorGroupDetail`에서 `useLocation()`으로 전달받은 state를 확인
- `useEffect()`에서 `reopenSubColorId`에 해당하는 subColor를 찾아 `setSelectedColor()` 호출
- `SubColorModal`은 `selectedSubColor`가 존재할 때 렌더링되므로 저장 후 상세 모달이 자동으로 열리게 됨
- `SubColorForm`의 `handleSave()`에서 `onClose()` 자동 호출 제거
- Save는 `onAdd` / `onUpdate`, Cancel은 `onClose`로 역할 분리
- 기존 form의 modal overlay wrapper 제거
- fixed, inset, backdrop, z-index, modal box-shadow, maxHeight, overflowY 등 모달 전용 스타일 제거
- form을 Page 안에서 자연스럽게 보이는 구조로 수정
- `AddSubColorForm`을 `SubColorForm`으로 이름 변경

#### 배운 점

- Route는 URL과 Page 컴포넌트를 연결하고, navigate는 실제 URL 이동을 실행한다
- `useParams()`는 URL 안의 동적 값을 꺼낼 때 사용한다
- `:id`, `:subColorId`는 Route가 데이터를 아는 것이 아니라 URL의 위치에 이름을 붙여주는 구조다
- 데이터의 `id`를 navigate URL에 넣고, 이동한 페이지에서 params로 다시 꺼내 실제 데이터를 찾는 흐름을 이해함
- Page 컴포넌트는 데이터를 준비하고, UI 컴포넌트는 props로 받은 데이터를 표시하는 구조가 깔끔하다
- 여러 페이지가 같은 데이터를 수정해야 할 때는 state를 공통 부모로 끌어올려야 한다
- local state와 App state가 동시에 존재하면 데이터 반영이 꼬일 수 있다
- 저장 후 특정 UI 상태를 복원하고 싶을 때 `navigate`의 `state`를 활용할 수 있다
- `useLocation()`과 `useEffect()`를 함께 사용하면 페이지 이동 후 전달된 state를 감지할 수 있다
- 저장 로직과 닫기 로직은 분리하는 것이 안전하다
- 모달로 쓰던 컴포넌트를 페이지로 옮길 때는 기능 로직뿐 아니라 wrapper 스타일도 함께 정리해야 한다
- 컴포넌트 이름은 실제 역할이 바뀌면 함께 바꾸는 것이 유지보수에 좋다
- 전체 검색을 사용하면 리팩토링 후 남은 이름이나 import를 확인할 수 있다

#### 다음 할 일

- `ColorEditorPage` 상단 테스트용 텍스트 정리
  - `group id`
  - `group name`
  - `sub color id`
  - `sub color name`

- `ColorEditorPage` 전용 페이지 레이아웃 설계
- `SubColorForm` 페이지용 spacing / typography 정리
- Cancel / Save 버튼 위치와 스타일 정리
- `SubColorForm` 내부 불필요한 모달 관련 스타일이 남아있는지 최종 확인
- `ColorGroupDetail`의 `useEffect` 안 console.log 제거
- `reopenSubColorId` 관련 로직에 간단한 주석 추가
- 저장 후 Add 모드에서도 상세 모달 자동 오픈 유지할지 최종 결정
- 상세 모달 spacing 및 typography 정리
- `SubColorModal`의 Edit / Delete 메뉴 UI 개선
- 전체 코드에서 사용하지 않는 props, state, 주석 정리
- `requirements.md`에 Add/Edit Page 전환 완료 내용 반영
- `Pieces of Me` 페이지 아이디어 구체화
- `Palette Log` 또는 Calendar 페이지 아이디어 구체화

### 2026-06-24

#### 오늘 한 일

- `ColorEditorPage` 상단 테스트용 텍스트 제거
  - `group id`
  - `group name`
  - `sub color id`
  - `sub color name`

#### 문제

#### 해결

#### 배운 점

#### 다음 할 일

- `ColorEditorPage` 전용 페이지 레이아웃 설계
- `SubColorForm` 페이지용 spacing / typography 정리
- Cancel / Save 버튼 위치와 스타일 정리
- `SubColorForm` 내부 불필요한 모달 관련 스타일이 남아있는지 최종 확인
- `reopenSubColorId` 관련 로직에 간단한 주석 추가
- 저장 후 Add 모드에서도 상세 모달 자동 오픈 유지할지 최종 결정
- 상세 모달 spacing 및 typography 정리
- `SubColorModal`의 Edit / Delete 메뉴 UI 개선
- 전체 코드에서 사용하지 않는 props, state, 주석 정리
- `requirements.md`에 Add/Edit Page 전환 완료 내용 반영
- `Pieces of Me` 페이지 아이디어 구체화
- `Palette Log` 또는 Calendar 페이지 아이디어 구체화

### 2026-06-25

#### 오늘 한 일

- `ColorEditorPage`를 postcard 형태의 Editor Page로 리디자인 시작
- Editor Page 바깥 배경과 중앙 postcard 카드 구조 적용
- `SubColorForm` 내부 구조를 좌측 color preview / 우측 입력폼 구조로 재배치
- 기존 form 내부의 중복 header 영역 제거
- preview section과 fields section 사이에 가운데 divider 영역 추가
- Title / Description / Keywords 입력 영역을 밑줄형 input 스타일로 변경
- Description textarea에 다이어리 줄노트 느낌의 background line 스타일 적용
- Color preview, color name, HEX, color picker button 배치 정리
- Save / Cancel 버튼 영역을 하단 action bar로 정리

#### 문제

- Description textarea에 줄노트 스타일을 적용하는 과정에서 글자 위치와 배경 줄 위치가 잘 맞지 않음
- textarea 높이를 6줄 기준으로 고정하자 마지막 줄에서 Enter 입력 시 커서가 깜빡이는 현상이 발생함
- 줄 수 제한을 넘는 텍스트를 붙여넣으면 기존 내용으로 되돌아가며 입력이 실패한 것처럼 보임

#### 해결

- `line-height`와 `repeating-linear-gradient()`의 반복 간격을 맞춰 textarea 줄노트 스타일을 조정
- textarea 내부 스크롤을 막기 위해 `overflow: hidden` 적용
- 붙여넣기와 줄 수 제한 UX는 현재 방식으로 완전히 해결하지 않고 후속 개선 작업으로 분리

#### 배운 점

- `repeating-linear-gradient()`를 사용하면 이미지 없이 CSS만으로 반복되는 줄 배경을 만들 수 있다.
  - `to bottom`은 위에서 아래 방향으로 gradient를 만든다는 의미다.
  - `transparent 0 ~ 24px` 구간은 보이지 않는 빈 공간이다.
  - `rgba(...) 24px ~ 25px` 구간은 1px 두께의 선이다.
  - 이 패턴이 반복되면서 textarea에 노트 줄 같은 배경을 만들 수 있다.

- textarea에 줄노트 스타일을 적용할 때는 `height`, `line-height`, `background-image`의 반복 간격을 함께 맞춰야 한다.
  - 예: `line-height: 25px`이면 gradient도 25px 단위로 반복되도록 맞추는 것이 좋다.
  - `height: 150px`은 `line-height: 25px` 기준으로 6줄을 보여주는 높이가 된다.

- `scrollHeight`와 `clientHeight`를 비교하면 textarea 내용이 보이는 영역을 넘었는지 확인할 수 있다.
  - `scrollHeight`: 스크롤을 포함한 전체 콘텐츠 높이
  - `clientHeight`: 실제 화면에 보이는 요소 높이
  - `scrollHeight > clientHeight`이면 입력 내용이 textarea 높이를 넘친 상태다.

- `requestAnimationFrame()`은 브라우저가 다음 화면을 그리기 전에 콜백을 실행한다.
  - state 변경 후 실제 DOM 높이를 확인해야 할 때 사용할 수 있다.
  - 다만 입력 후 이전 state로 되돌리는 방식은 붙여넣기 시 화면이 깜빡이는 UX 문제가 생길 수 있다.

- `onKeyDown`에서 `e.key === "Enter"`를 확인하면 textarea의 Enter 입력을 따로 제어할 수 있다.
  - `e.preventDefault()`를 사용하면 Enter로 새 줄이 추가되는 기본 동작을 막을 수 있다.
  - `description.split("\n")`으로 현재 입력된 줄 수를 계산할 수 있다.

#### 다음 할 일

- Description textarea 붙여넣기 / 줄 수 제한 UX 개선
- postcard editor의 종이 질감, 스티커, 테이프, 나뭇잎 장식 추가 검토
- Color preview 영역 아래 감성 문구 추가 여부 결정
- Color picker dropdown 위치와 스타일 재확인
- Editor Page 모바일 반응형 구조 정리

### 2026-06-26

#### 오늘 한 일

- Editor Page에서 Enter 입력 시 의도치 않게 저장되는 문제 수정
- Save 버튼 클릭 시에만 저장되도록 동작 방식 정리
- Editor postcard 상단의 BACK / NEW COLOR / SAVE typography 조정
- 왼쪽 color preview 영역을 클릭 가능한 컬러 선택 영역으로 변경
- color preview 안에 선택한 색상명과 색상 코드를 표시
- preview 문구의 `from` 뒤에 상위 카테고리의 대표 colorName을 표시
- Add/Edit 화면에서 preview, color picker, Save, Cancel 동작 확인

#### 문제

- keyword input에서 Enter를 누르면 keyword 추가와 동시에 저장되는 문제가 있었음
- Editor Page 리디자인 중 page wrapper와 form 내부 역할이 섞여 구조가 흔들릴 수 있었음
- 밝은 색상 preview에서는 흰색 color name / color code의 가독성이 낮을 수 있음

#### 해결

- form submit 저장 흐름을 제거하고 Save 버튼 클릭 시에만 저장되도록 변경
- `ColorEditorPage`는 배경과 postcard wrapper를 담당하고, `SubColorForm`은 form 내부 preview와 입력 영역을 담당하도록 역할을 다시 정리
- color preview 자체를 button으로 변경하여 클릭 시 color picker가 열리도록 수정
- 부모 카테고리의 `colorName`, `mainColor`를 `SubColorForm`에 props로 전달하여 preview 문구에 반영
- color preview overlay는 hover 시에만 보이도록 조정

#### 배운 점

- form 내부 input에서 Enter를 누르면 기본 submit 동작이 발생할 수 있음
- 작성형 Editor에서는 Enter 저장보다 Save 버튼 클릭 저장이 더 안전한 UX가 될 수 있음
- React에서 부모 데이터가 필요한 하위 컴포넌트에는 props로 필요한 값만 전달할 수 있음
- `p`는 문단 단위의 block 요소이고, `span`은 문장 안 일부만 스타일링할 때 쓰는 inline 요소임
- JSX에서 `{" "}`는 텍스트 사이 공백을 명시적으로 넣을 때 사용할 수 있음

#### 다음 할 일

- 상세 모달을 첨부 레퍼런스처럼 큰 제목 / 큰 컬러 블록 / 설명 / keyword 중심으로 리디자인
- Editor preview title typography 후보 재검토
- Editor Page 색상 톤과 postcard 배경색 레퍼런스 추가 확인

### 2026-07-01

#### 오늘 한 일

- MyPalette v1.0 종료 조건을 정리하기 위해 `v1-checklist.md` 파일 생성
- Editor Page의 상단 `BACK / SAVE` 버튼을 실제 동작 버튼으로 연결
- `SubColorForm` 내부에 흩어져 있던 입력 state를 `formData` 구조로 정리
- `name`, `description`, `selectedColor`, `keywords`를 하나의 form state로 관리하도록 변경
- 저장 로직(`handleSave`)을 `SubColorForm`에서 `ColorEditorPage`로 이동
- `SubColorForm`은 입력 UI를 담당하고, `ColorEditorPage`는 페이지 이동과 저장 흐름을 담당하도록 역할 정리
- Editor Page 하단의 `취소 / 저장하기` 버튼 제거
- 상단 `SAVE` 클릭 시 Add/Edit 저장 후 상세 Modal이 열리는지 확인
- 상단 `BACK` 클릭 시 이전 화면으로 돌아가는 흐름 확인

#### 문제

- 상단 `SAVE` 버튼은 `ColorEditorPage`에 있었지만, 실제 저장 로직은 `SubColorForm` 내부에 있어 버튼 위치와 저장 로직 위치가 분리되어 있었음
- `name`, `description`, `selectedColor`, `keywords`가 각각 별도 state로 관리되어 상위 컴포넌트에서 저장 로직을 사용하기 어려웠음
- 하단 `취소 / 저장하기` 버튼과 상단 `BACK / SAVE` 버튼이 동시에 존재하면 Editor Page의 주요 동작 버튼이 중복될 수 있었음
- `navigate(-1)`만으로는 Edit 진입 전 보고 있던 상세 Modal 상태가 자동으로 복원되지 않을 수 있음을 확인함

#### 해결

- `ColorEditorPage`에서 `formData`와 `setFormData`를 생성하여 Editor 입력값을 상위 컴포넌트에서 관리하도록 변경
- `formData` 안에 실제 저장 대상인 `name`, `description`, `selectedColor`, `keywords`를 묶어서 관리
- `presetColors`, `keywordInput`, `isColorPickerOpen`, `showAllColors`처럼 저장 대상이 아닌 값은 `formData`에 포함하지 않고 별도 UI 상태로 유지
- `handleSave`를 `ColorEditorPage`로 이동하여 상단 `SAVE` 버튼과 직접 연결
- `SubColorForm`은 `formData`, `setFormData`, `presetColors`를 props로 받아 입력 화면만 렌더링하도록 정리
- 하단 `취소 / 저장하기` 버튼을 제거하여 상단 `BACK / SAVE` 중심의 Editor Page 구조로 변경
- 저장 후에는 `navigate`의 `state`로 `reopenSubColorId`를 전달하여 저장한 SubColor의 상세 Modal이 열리도록 유지

#### 배운 점

- React에서 여러 입력값이 하나의 저장 대상이라면 `formData` 객체로 묶어 관리할 수 있음
- 상위 컴포넌트의 버튼이 하위 컴포넌트의 입력값을 사용해야 할 때는 state를 부모로 올리는 방식이 필요함
- state lifting은 state를 무조건 위로 올리는 것이 아니라, 해당 state를 필요로 하는 가장 가까운 공통 부모로 이동시키는 것임
- 저장될 데이터와 저장되지 않는 UI 상태를 구분해야 form 구조가 단순해짐
- `presetColors`는 선택 가능한 목록이고, `selectedColor`는 사용자가 선택한 저장 대상이므로 서로 다른 역할을 가짐
- `keywordInput`은 Enter 입력 전 임시값이고, `keywords`는 실제 저장될 데이터임
- `navigate(-1)`은 이전 URL로 돌아갈 수 있지만, Modal처럼 내부 state로 열린 화면 상태까지 항상 복원해주지는 않음

#### 다음 할 일

- 상세 Modal 리디자인
- Edit 진입 후 `BACK` 클릭 시 상세 Modal 복원 흐름 개선 여부 재검토
- MyPalette v1.0 필수 기능 기준으로 남은 UI 정리 항목 확인

### 2026-07-02

#### 오늘 한 일

- SubColor 상세 Modal 리디자인
- 기존 `...` 메뉴 방식의 edit/delete UI 제거
- 레퍼런스 카드 디자인을 참고하여 title, color preview, description, keyword, action 영역 재배치
- Edit/Delete 버튼을 모달 하단 액션 영역으로 이동
- Delete 후 `navigate()`로 상세 페이지 state를 초기화하여 Modal이 다시 열리는 문제 수정

#### 문제

- 기존 상세 Modal은 컬러 preview가 먼저 보이고 title/detail 정보가 아래에 있어 레퍼런스 카드 느낌과 거리가 있었음
- Delete 후 저장 복원용 location state가 남아 Modal이 다시 열리는 문제가 있었음
- description과 footer action의 시각적 강약 조절이 필요했음

#### 해결

- Modal 구조를 `Title → Color Preview → Description → Keywords → Footer Actions` 순서로 재배치
- `EDIT YOUR STORY`, `DELETE`를 하단 버튼으로 배치
- Delete 실행 후 `/mypalette/:groupId`로 이동하면서 `replace: true`, `state: null`을 적용
- description font size와 색상, footer button font weight를 조정하여 가독성과 분위기 균형을 맞춤

#### 배운 점

- Modal 내부에서 삭제 후에도 이전 `location.state`가 남아 있으면 의도치 않게 UI 상태가 복원될 수 있다.

#### 다음 할 일

- Navigation Bar 리디자인
- MyPalette 메뉴 hover 시 카테고리 dropdown 표시
- Landing Page 레퍼런스 조사 후 방향 결정

### 2026-07-03

#### 오늘 한 일

- Navigation Bar 리디자인
- 상단 메뉴를 `HOME / MYPALETTE / PIECES OF ME / PALETTE LOG` 형태로 정리
- `App.jsx`에서 `Navbar`로 `colorGroups` 데이터 전달
- `MYPALETTE` 메뉴 hover 시 카테고리 submenu 표시
- submenu를 `ABOUT ME / TASTE / INTEREST / MY SIDES / IDEAL ME` 가로형 메뉴로 구성
- 각 submenu 클릭 시 `/mypalette/:id` 경로로 이동하도록 연결
- `/mypalette` 계열 페이지에서는 submenu가 항상 보이도록 처리
- 현재 선택된 submenu 항목이 active 상태로 진하게 보이도록 수정
- 페이지별 스크롤바 유무에 따라 Navbar 위치가 흔들리지 않도록 `scrollbar-gutter: stable` 적용

#### 문제

- 처음에는 `group.name`을 사용해 화면이 렌더링되지 않았음
- 실제 카테고리 데이터 필드명이 `groupName`이어서 `group.name.toUpperCase()`에서 오류가 발생했음
- submenu가 작은 세로 dropdown 박스 형태로 표시되어 원하는 레퍼런스와 달랐음
- hover 시 submenu가 나타나면서 Navbar 높이가 변하는 문제가 있었음
- MYPALETTE에서 submenu로 마우스를 이동할 때 hover가 끊겨 메뉴가 사라졌음
- 페이지마다 스크롤바 유무가 달라 Navbar 위치가 좌우로 미세하게 움직였음
- submenu 클릭 후 현재 카테고리 항목이 active 상태로 표시되지 않았음

#### 해결

- 실제 데이터 구조에 맞춰 `group.groupName.toUpperCase()`를 사용
- submenu를 Navbar 내부의 가로형 메뉴로 변경
- `position: absolute`를 사용해 Navbar 높이를 고정한 상태에서 submenu가 표시되도록 구성
- `visibility`, `opacity`를 사용해 submenu 표시 여부를 제어
- submenu 영역에 padding을 추가해 마우스 이동 중 메뉴가 쉽게 사라지지 않도록 조정
- `NavLink`의 active 상태를 활용해 현재 메뉴와 submenu 항목이 진하게 표시되도록 수정
- `scrollbar-gutter: stable`을 적용해 스크롤바 유무에 따른 레이아웃 흔들림을 줄임
- `:root`, `html`, `body`의 배경색을 정리해 gutter 영역의 배경색이 튀지 않도록 조정

#### 배운 점

- `NavLink`는 현재 경로와 일치하는 링크에 active 상태를 줄 수 있다.
- 데이터 필드명과 컴포넌트에서 사용하는 속성명이 다르면 렌더링 오류가 발생할 수 있다.
- `display: none`은 요소 공간 자체를 없애고, `visibility: hidden`은 공간을 유지한 채 숨긴다.
- hover submenu는 보이는 위치뿐 아니라 마우스가 이동하는 경로까지 고려해야 한다.
- `position: absolute`는 레이아웃을 밀지 않고 특정 위치에 UI를 얹을 때 유용하다.
- 스크롤바 유무도 중앙 정렬 위치에 영향을 줄 수 있다.

#### 다음 할 일

- Home 화면을 서비스 소개 화면처럼 정리
- Landing Page를 별도로 만들지 Home 화면으로 대체할지 최종 결정
- Editor Page의 작은 UI 개선 진행
