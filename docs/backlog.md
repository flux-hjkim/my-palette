# MyPalette Backlog

## v1.0 Before Deploy

### Responsive UI

- 모바일 화면에서 Navbar 항목이 잘리지 않도록 개선
  - 390px 기준 `HOME / MYPALETTE / PIECES OF ME / PALETTE LOG`가 화면 밖으로 밀리는 문제 확인
  - 줄바꿈, font-size 축소, separator 숨김, 모바일 전용 navigation 방식 검토

- 모바일 화면에서 Editor Page 레이아웃 개선
  - 현재 좌측 preview / 우측 form 구조가 좁은 화면에서 찌그러짐
  - 모바일에서는 preview와 form을 세로 배치로 전환 검토
  - SAVE / BACK 버튼이 사용 가능한 위치에 유지되는지 확인

### Placeholder Pages

- 아직 구현되지 않은 페이지는 빈 화면 대신 Coming Soon 화면으로 처리
  - Pieces of Me
  - Palette Log
  - v1.0에서는 실제 기능 구현 없이 안내 화면만 제공
  - 사용자가 Navigation을 클릭했을 때 빈 화면으로 보이지 않도록 처리

---

## v1.1 Candidate

### Pieces of Me

- 내가 추가한 컬러칩들을 카테고리와 관계없이 한 화면에서 확인
- 전체 `subColors` 데이터를 하나의 배열로 변환
- 좌측에는 자기 탐색 질문 또는 감성 문구 표시
- 우측에는 컬러칩 보드 구성
- 컬러칩 hover 시 title / category / keywords 표시
- 클릭 시 기존 상세 Modal 재사용 검토

---

## v1.2 Candidate

### Sticker Frame UI

- Pieces of Me 페이지의 컬러칩을 빈티지 라벨 / 스티커 형태로 표현
- CSS 이중 테두리 또는 SVG frame 방식 검토
- 컬러칩마다 다른 frame type 적용
- hover 시 scale up + 텍스트 등장 interaction 검토

---

## v2.5 Candidate

### UI / Responsive Polish

- 모바일 Navigation 구조 재설계
  - hover 기반 dropdown을 모바일에서는 click/tap 방식으로 변경
  - 필요한 경우 hamburger 또는 compact menu 검토

- Editor Page 반응형 세부 polish
  - preview / form 세로 배치
  - keyword tag 영역 높이 안정화
  - textarea 줄 수 제한 UX 개선

- Typography / spacing 기준 정리
  - Button, Card, Modal, Form Field 스타일 기준 정리
  - 공통 spacing, radius, shadow 기준 정리

---

## v3.0 Candidate

### Data Persistence

- localStorage 기반 데이터 유지 기능 추가
- 새로고침 후에도 추가 / 수정 / 삭제한 SubColor 유지
- 저장 데이터가 없을 경우 초기 데이터 사용
- 잘못된 저장 데이터가 있을 때 예외 처리 검토

---

## Later Ideas

### Preset Color Selection

- 이미 사용한 preset color를 다시 선택하지 못하도록 처리
  - 같은 컬러 그룹 안에서 이미 저장된 색상은 중복 선택 방지
  - 목록에서 숨길지 disabled 상태로 보여줄지 결정
  - 현재는 disabled 처리 방향 우선 검토
  - 사용자가 “이미 사용한 색상”임을 이해할 수 있도록 시각적으로 구분

### Palette Log

- 월별 달력 형태로 컬러 기록 표시
- `createdAt` 기준으로 날짜별 컬러칩 표시
- 하루에 여러 개 추가된 경우 작은 칩들이 겹쳐 보이는 UI 검토
- 클릭 시 해당 컬러 상세 보기
