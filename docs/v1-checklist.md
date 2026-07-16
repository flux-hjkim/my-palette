# MyPalette v1.0 Completion Checklist

## Goal

MyPalette v1.0은 사용자가 자신의 취향, 성향, 관심사, 내면의 특징, 이상향을 색상 카드로 기록하고 카테고리별로 정리할 수 있는 React 기반 포트폴리오 프로젝트로 마무리한다.

v1.0의 목표는 모든 아이디어를 완성하는 것이 아니라, 핵심 사용자 흐름이 끊기지 않는 1차 완성본을 만드는 것이다.

---

## Required for v1.0

### Feature

- [x] 컬러 그룹 목록 확인
- [x] 컬러 그룹 상세 페이지 이동
- [x] SubColor 추가
- [x] SubColor 수정
- [x] SubColor 삭제
- [x] SubColor 상세 Modal 확인
- [x] Add/Edit 공용 Editor Page 사용
- [x] 저장 후 데이터 정상 반영
- [x] 수정 후 데이터 정상 반영
- [x] 삭제 후 데이터 정상 반영

### UI

- [x] Editor Page 기본 디자인 완료
- [x] 모바일 화면에서 크게 깨지는 곳 없음
- [x] PC 화면에서 크게 깨지는 곳 없음
- [x] 주요 버튼 위치 정리
- [x] 주요 여백 정리
- [x] Typography 최종 적용
- [x] 상세 Modal 정보 계층 확인

### Data

- [x] SubColor 추가 시 createdAt이 생성된다.
- [x] SubColor 수정 시 기존 createdAt이 유지된다.
- [x] SubColor 삭제 시 해당 데이터만 제거된다.
- [x] 초기 데이터의 createdAt 필드가 깨지지 않는다.

### Documents

- [x] README 작성
- [x] requirements.md 최신화
- [x] v1-checklist.md 최신화
- [x] roadmap.md 작성
- [x] improvements.md 최신화
- [x] dev-log.md 최신화
- [x] backlog.md 정리

### README

- [x] 프로젝트 소개 작성
- [x] v1.0 목표 작성
- [x] 기술 스택 작성
- [x] 주요 기능 작성
- [x] 핵심 기술적 결정 작성
  - [x] Add/Edit 공용 Form
  - [x] Modal과 Page 역할 분리
  - [x] colorGroups state lifting
  - [x] URL params 기반 Add/Edit 분기
- [x] 실행 방법 작성
- [x] 스크린샷 추가
- [x] 배포 링크 추가
- [x] 향후 개선 계획 작성

### Git

- [x] 작업 단위별 Commit 정리
- [x] 불필요한 파일이 Commit에 포함되지 않았는지 확인
- [x] GitHub에 Push 완료

### Release

- [x] v1.0.0 Git tag 생성
- [x] GitHub Release 작성
- [x] Release note에 v1.0 주요 기능 정리

### Deploy

- [x] Vercel 배포
- [x] 배포 링크 접속 확인
- [x] 배포 환경에서 주요 화면 이동 확인

---

## Final QA Before Deploy

배포 직전에 아래 흐름을 마지막으로 점검한다.

- [x] `/` 첫 화면 접속
- [x] `/mypalette` 이동
- [x] 컬러 그룹 선택
- [x] 그룹 상세 페이지 확인
- [x] SubColor 상세 Modal 열기
- [x] Modal 닫기
- [x] SubColor 추가
- [x] 추가 후 상세 정보 확인
- [x] SubColor 수정
- [x] 수정 후 변경 내용 확인
- [x] SubColor 삭제
- [x] 삭제 후 목록 반영 확인
- [x] 모바일 크기에서 주요 화면 확인
- [x] 새로고침 시 치명적인 오류가 없는지 확인

---

## Move to Future Versions

### v1.1 Candidate

- Pieces of Me
- 전체 컬러칩 모아보기
- 기존 Detail Modal 재사용

### v1.2 Candidate

- Sticker Frame UI
- 컬러 카드 애니메이션
- hover interaction 고도화

### v1.5 Candidate

- TypeScript migration

### v2.0 Candidate

- Zustand 상태관리 리팩토링

### v2.5 Candidate

- Tailwind CSS 적용 또는 스타일 시스템 정리
- 반응형 디자인 세부 polish

### v3.0 Candidate

- localStorage 데이터 저장

### v3.5 Candidate

- 접근성 개선
- 테스트 코드 추가
- custom hook 분리

### v4.0 Candidate

- Firebase 또는 Supabase 연동

---

## Done Criteria

아래 조건을 만족하면 MyPalette v1.0을 완료한 것으로 본다.

- 핵심 기능 Add/Edit/Delete/Detail Modal이 정상 동작한다.
- 사용자가 컬러 그룹을 탐색하고 SubColor를 관리할 수 있다.
- README를 통해 프로젝트 목적과 사용 방법을 이해할 수 있다.
- GitHub에 최종 코드가 Push되어 있다.
- Vercel 배포 링크로 프로젝트에 접속할 수 있다.
