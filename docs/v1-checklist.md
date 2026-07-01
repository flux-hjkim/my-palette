# MyPalette v1.0 Completion Checklist

## Goal

MyPalette v1.0은 사용자가 자신의 취향, 성향, 관심사, 내면의 특징, 이상향을 색상 카드로 기록하고 카테고리별로 정리할 수 있는 React 기반 포트폴리오 프로젝트로 마무리한다.

v1.0의 목표는 모든 아이디어를 완성하는 것이 아니라, 핵심 사용자 흐름이 끊기지 않는 1차 완성본을 만드는 것이다.

---

## Required for v1.0

### Feature

- [ ] 컬러 그룹 목록 확인
- [ ] 컬러 그룹 상세 페이지 이동
- [ ] SubColor 추가
- [ ] SubColor 수정
- [ ] SubColor 삭제
- [ ] SubColor 상세 Modal 확인
- [ ] Add/Edit 공용 Editor Page 사용
- [ ] 저장 후 데이터 정상 반영
- [ ] 수정 후 데이터 정상 반영
- [ ] 삭제 후 데이터 정상 반영

### UI

- [ ] Editor Page 기본 디자인 완료
- [ ] 모바일 화면에서 크게 깨지는 곳 없음
- [ ] PC 화면에서 크게 깨지는 곳 없음
- [ ] 주요 버튼 위치 정리
- [ ] 주요 여백 정리
- [ ] Typography 최종 적용
- [ ] 상세 Modal 정보 계층 확인

### Documents

- [ ] README 작성
- [ ] 프로젝트 소개 작성
- [ ] 기술 스택 작성
- [ ] 주요 기능 작성
- [ ] 실행 방법 작성
- [ ] 스크린샷 추가
- [ ] dev-log 최신화
- [ ] backlog 정리

### Git

- [ ] 작업 단위별 Commit 정리
- [ ] 불필요한 파일이 Commit에 포함되지 않았는지 확인
- [ ] GitHub에 Push 완료

### Deploy

- [ ] Vercel 배포
- [ ] 배포 링크 접속 확인
- [ ] 배포 환경에서 주요 화면 이동 확인

---

## Final QA Before Deploy

배포 직전에 아래 흐름을 마지막으로 점검한다.

- [ ] `/` 첫 화면 접속
- [ ] `/mypalette` 이동
- [ ] 컬러 그룹 선택
- [ ] 그룹 상세 페이지 확인
- [ ] SubColor 상세 Modal 열기
- [ ] Modal 닫기
- [ ] SubColor 추가
- [ ] 추가 후 상세 정보 확인
- [ ] SubColor 수정
- [ ] 수정 후 변경 내용 확인
- [ ] SubColor 삭제
- [ ] 삭제 후 목록 반영 확인
- [ ] 모바일 크기에서 주요 화면 확인
- [ ] 새로고침 시 치명적인 오류가 없는지 확인

---

## Move to v1.1

아래 작업은 v1.0 이후 개선 항목으로 미룬다.

- 상세 Modal 대규모 리디자인
- Edit/Delete 버튼 위치 재검토
- Framer Motion 적용
- Tailwind CSS 적용 또는 스타일 시스템 정리
- Pieces of Me 기능 고도화
- 컬러 카드 애니메이션
- 반응형 디자인 세부 polish
- 데이터 저장 방식 개선
- localStorage 또는 backend 연동 검토
- 접근성 개선
- 테스트 코드 추가

---

## Done Criteria

아래 조건을 만족하면 MyPalette v1.0을 완료한 것으로 본다.

- 핵심 기능 Add/Edit/Delete/Detail Modal이 정상 동작한다.
- 사용자가 컬러 그룹을 탐색하고 SubColor를 관리할 수 있다.
- README를 통해 프로젝트 목적과 사용 방법을 이해할 수 있다.
- GitHub에 최종 코드가 Push되어 있다.
- Vercel 배포 링크로 프로젝트에 접속할 수 있다.
