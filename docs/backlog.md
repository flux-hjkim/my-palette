### Editor Modal 개선 작업

#### Layout

- 에디터 모달을 postcard 형태로 축소
- 배경 대비 postcard 비율 조정
- 좌측 입력 영역 / 우측 컬러 영역 비율 재검토
- 하단 버튼 영역 정렬 정리

#### Keyword

- keyword tag UI 디자인
- keyword가 2줄 이상일 때 처리 방식 결정
  - 영역 고정 + 내부 스크롤
  - 2줄까지만 표시
  - 자동 높이 증가

#### Textarea

- description 200자 초과 입력 방지
- 현재 글자 수 카운트 표시 유지

#### Modal Behavior

- editor modal open 시 body scroll 막기
- modal close 시 body scroll 복구
- backdrop 영역 클릭 시 닫힘 여부 결정

#### Motion

- modal open/close animation
- dropdown animation
- keyword tag animation

#### Sub Color 관리

- sub color 상세 모달에 edit / delete 액션 추가
- edit 클릭 시 기존 데이터를 불러와 수정 가능하도록 처리
- delete 클릭 시 해당 sub color 삭제
- delete 전 확인 confirm 적용 여부 결정

#### Detail Modal 개선

- 제목/설명 좌측 정렬
- # Keywords 헤더 추가
- 우측 상단 ⋯ 버튼 추가
- ⋯ 클릭 시 아이콘 메뉴 표시
- Edit → AddSubColorForm 재사용
- Delete → 삭제 로직 연결

#### 추가 이슈

- 상세 모달에서 `...` 메뉴를 연 상태로 모달을 닫은 뒤 다시 열면 메뉴가 열린 상태로 유지됨

#### 해결 예정

- 모달 close 시 `isMenuOpen`을 `false`로 초기화
- 또는 `subColor`가 변경될 때마다 `isMenuOpen`을 `false`로 초기화

### Editor Page 전환 작업

#### 목표

- Add/Edit Editor를 Modal에서 Page로 전환
- 상세보기 Modal은 유지
- Add/Edit은 독립된 Editor Page에서 처리

#### Route 구조

- `/mypalette/:groupId/new`
- `/mypalette/:groupId/edit/:subColorId`

#### 작업 목록

- [ ] `ColorEditorPage.jsx` 생성
- [ ] AddSubColorSquare 클릭 시 new 페이지로 이동
- [ ] 상세 모달 Edit 클릭 시 edit 페이지로 이동
- [ ] 기존 데이터 Editor Page에 채우기
- [ ] Save 후 그룹 상세 페이지로 이동
- [ ] Save 후 상세 모달 자동 오픈 여부 검토

### UI Interaction Backlog

- SubColor card는 전체 영역 클릭 가능 유지
- hover 시 컬러칩 scale motion은 유지
- 추후 hover 시 text color 변화 검토
- Pieces of Me 페이지에서는 컬러칩을 vintage sticker frame 형태로 표현
- ColorGroupDetail은 정돈된 color archive, Pieces of Me는 sticker board로 역할 분리

### Future Pages

#### Pieces of Me

- 내가 추가한 컬러칩들을 스티커처럼 흩뿌려 보여주는 페이지
- 좌측에는 자기 탐색 질문 또는 감성 문구 표시
- 우측에는 컬러칩 스티커 보드 구성
- 컬러칩 hover 시 scale up
- hover 시 title/category/keywords가 아래에서 위로 등장
- 클릭 시 상세 모달 또는 상세 페이지 열기

#### Palette Log

- 월별 달력 형태로 컬러 기록을 보여주는 페이지
- createdAt 기준으로 날짜별 컬러칩 표시
- 하루에 여러 개 추가된 경우 작은 칩들이 겹쳐 보임
- hover 시 서랍처럼 펼쳐지는 인터랙션
- 클릭 시 해당 컬러 상세 보기

#### Pieces of Me - Sticker Frame UI

- 컬러칩을 정사각형 표본이 아닌 빈티지 라벨/스티커 형태로 표현
- 첨부한 vintage vector frame 레퍼런스처럼 다양한 테두리 형태 적용
- CSS 이중 테두리 또는 SVG frame 방식 검토
- 컬러칩마다 frame type을 다르게 적용하여 스티커 모음처럼 보이게 구성
- hover 시 scale up + 텍스트가 아래에서 위로 등장
- 기본 팔레트 페이지와 차별화하기 위해 Pieces of Me 페이지 전용 스타일로 적용

### Editor Page 개선 및 후속 정리

#### 완료된 작업

- Add/Edit Editor를 Modal 구조에서 Page 구조로 전환
- `ColorEditorPage.jsx` 생성
- Add/Edit route 추가
  - `/mypalette/:id/new`
  - `/mypalette/:id/edit/:subColorId`

- `AddSubColorSquare` 클릭 시 New Editor Page로 이동하도록 구현
- 상세 모달의 Edit 클릭 시 Edit Editor Page로 이동하도록 구현
- `useParams()`를 사용하여 URL의 `id`, `subColorId` 값을 가져오도록 구현
- `ColorEditorPage`에서 `id`로 `selectedGroup` 찾기
- `subColorId`로 `selectedSubColor` 찾기
- Edit 모드에서 기존 subColor 데이터 자동 입력
- `colorGroups` state를 `App.jsx`로 끌어올림
- `MyPalette`, `ColorGroupDetail`, `ColorEditorPage`가 동일한 `colorGroups` state를 props로 공유하도록 구조 변경
- Add / Edit / Delete 기능이 App state 기준으로 반영되도록 수정
- 저장 후 `/mypalette/:id`로 돌아가도록 구현
- 저장 후 방금 추가/수정한 subColor 상세 모달이 자동으로 열리도록 구현
- `navigate`의 `state`를 활용하여 `reopenSubColorId` 전달
- `ColorGroupDetail`에서 `useLocation()`과 `useEffect()`를 사용하여 상세 모달 자동 오픈 처리
- 기존 `AddSubColorForm`의 모달 overlay 구조 제거
- `AddSubColorForm`을 페이지용 form 컴포넌트로 정리
- `AddSubColorForm`을 `SubColorForm`으로 이름 변경

#### 남은 작업

- `ColorEditorPage` 디자인 정리
  - 상단 테스트용 `group id`, `group name`, `sub color id` 표시 제거
  - Editor Page 전용 heading / description 구성
  - 좌측 안내 영역 + 우측 입력폼 구조 검토

- `SubColorForm` 디자인 정리
  - 페이지용 form 레이아웃으로 spacing 조정
  - 기존 modal 느낌이 남아있는 스타일 제거
  - Cancel / Save 버튼 위치 정리
  - X 버튼 제거 상태 최종 확인

- `SubColorForm` 역할 정리
  - Add / Edit 공용 form임을 코드 주석 또는 문서에 기록
  - Save는 `onAdd` / `onUpdate`만 실행
  - Close / Cancel은 `onClose`만 실행하도록 역할 분리 유지

- 저장 후 상세 모달 자동 오픈 로직 정리
  - `reopenSubColorId` 처리 로직 주석 추가
  - `navigate(location.pathname, { replace: true, state: null })` 유지 여부 검토

- 코드 정리
  - 사용하지 않는 state 삭제 확인
  - 사용하지 않는 props 삭제 확인
  - console.log 제거
  - 주석 처리된 옛날 modal 관련 코드 제거

- UI/UX 후순위 개선
  - Editor Page 진입/저장 시 transition 추가 검토
  - 저장 후 toast 메시지 추가 검토
  - Add 저장 후에도 상세 모달 자동 오픈 유지 여부 결정
  - 상세 모달 spacing / typography 정리
  - `Pieces of Me` 페이지 아이디어 구체화
  - `Palette Log` 또는 Calendar 페이지 아이디어 구체화

### MyPalette 카테고리 dropdown navigation

- 세부 컬러 화면에서 다른 카테고리로 바로 이동할 수 있도록 Navbar 개선
- `MyPalette` 메뉴 hover 시 5개 카테고리 dropdown 표시
  - About Me
  - Taste
  - Interest
  - My Sides
  - Ideal Me

- 카테고리 클릭 시 해당 `/mypalette/:id` 페이지로 이동
- dropdown은 위에서 아래로 글자가 떨어지듯 나타나는 motion 적용 검토
- 모바일에서는 hover 대신 click/tap 방식 필요

### Editor Page 추가 개선사항

- Description textarea 입력 제한 UX 개선
  - 현재는 줄 수 제한을 넘는 붙여넣기 시 기존 내용으로 되돌아가며 깜빡이는 현상이 있음
  - `return`으로 입력을 무시하는 방식 대신, 허용 가능한 줄 수까지만 잘라서 반영하는 방식 검토
  - textarea 높이, line-height, background line 간격을 유지하면서 200자 제한과 줄 수 제한을 함께 처리하는 방법 개선
  - 필요하면 사용자에게 “최대 6줄까지만 입력할 수 있어요” 안내 메시지 표시
