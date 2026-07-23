# MyPalette Version Roadmap

## Project Overview

MyPalette는 사용자가 자신의 취향, 기억, 성향, 관심사, 이상향을 색상 카드로 기록하고 카테고리별로 정리할 수 있는 React 기반 웹 애플리케이션이다.

이 프로젝트의 포트폴리오 목표는 단순히 예쁜 컬러 기록 앱을 만드는 것이 아니라, React 프로젝트를 버전별로 개선하면서 각 기술이 어떤 문제를 해결했는지 보여주는 것이다.

---

## Version Strategy

MyPalette는 한 번 완성하고 끝나는 프로젝트가 아니라, 버전별로 기능과 기술을 점진적으로 개선하는 성장형 포트폴리오 프로젝트로 관리한다.

각 버전은 다음 기준을 따른다.

- 해당 버전의 목표가 명확해야 한다.
- 어떤 문제를 해결하는지 설명할 수 있어야 한다.
- 적용한 기술이 무엇을 개선했는지 설명할 수 있어야 한다.
- 결과물은 Git commit, Git tag, README, 개선 문서에 남긴다.

---

## Version Summary

| Version | Focus                | Main Goal                               |
| ------- | -------------------- | --------------------------------------- |
| v1.0.0  | React Foundation     | React 기본기로 핵심 CRUD 완성           |
| v1.1.0  | Pieces of Me         | 전체 컬러칩 모아보기 페이지 추가        |
| v1.2.0  | Palette Log          | createdAt 기반 월별 기록 화면 추가      |
| v1.3.0  | Pieces of Me UI      | 스티커 배치와 인터랙션 고도화           |
| v1.5.0  | TypeScript Migration | 데이터와 props 타입 안정성 확보         |
| v2.0.0  | Zustand Refactoring  | 상태 관리 구조 개선                     |
| v2.5.0  | UI System            | Tailwind 또는 스타일 시스템 정리        |
| v3.0.0  | Data Persistence     | localStorage로 데이터 유지              |
| v3.5.0  | Quality Improvement  | 접근성, 예외 처리, custom hook 개선     |
| v3.8.0  | External Color API   | 색상 이름과 컬러 조합 추천 기능 추가    |
| v4.0.0  | Backend Expansion    | Firebase 또는 Supabase 기반 서비스 확장 |

---

# v1.0.0 — React Foundation

## Goal

React 기본 기능만으로 MyPalette의 핵심 사용자 흐름을 완성한다.

v1.0은 모든 아이디어를 구현하는 버전이 아니라, 사용자가 컬러 그룹을 탐색하고 세부 컬러를 추가, 수정, 삭제, 확인할 수 있는 1차 완성본이다.

## Scope

- Home 화면
- MyPalette 메인 화면
- 5개 카테고리 표시
  - About Me
  - Taste
  - Interest
  - My Sides
  - Ideal Me
- 카테고리 상세 페이지
- SubColor 목록
- SubColor 상세 Modal
- SubColor 추가
- SubColor 수정
- SubColor 삭제
- Add/Edit 공용 Editor Page
- Keyword 추가 / 삭제
- Keyword 공백 및 중복 입력 방지
- Preset color 선택
- 선택한 색상 preview 표시
- 저장 후 데이터 반영
- 저장 후 상세 정보 확인
- createdAt 필드 유지

## Technologies

- React
- JavaScript
- React Router
- Props
- State
- Event handling
- Conditional rendering
- List rendering
- Form handling
- CSS
- Git / GitHub

## What This Version Proves

- React 기본 구조 이해
- CRUD 기능 구현
- Router 기반 화면 분리
- Add/Edit 공용 Form 재사용
- Modal과 Page의 역할 분리
- 상위 컴포넌트에서 데이터 관리
- 사용자 입력값 검증
- 기본적인 UI/UX 개선 경험

## Required Outputs

- 동작하는 v1.0 프로젝트
- GitHub repository
- Vercel 배포 링크
- README.md
- requirements.md 정리본
- v1-checklist.md 완료본
- improvements.md 최신화
- dev-log.md 최신화
- backlog.md 정리
- Git tag: `v1.0.0`
- GitHub Release: `v1.0.0`

## Completion Criteria

- Add/Edit/Delete/Detail Modal이 정상 동작한다.
- 사용자가 카테고리와 SubColor를 탐색할 수 있다.
- Editor Page에서 입력, 저장, 취소가 가능하다.
- Keyword와 Color Picker가 정상 동작한다.
- createdAt이 추가 시 생성되고 수정 시 유지된다.
- README를 통해 프로젝트 목적과 실행 방법을 이해할 수 있다.
- 배포 링크로 프로젝트를 확인할 수 있다.

---

# v1.1.0 — Pieces of Me

## Goal

사용자가 추가한 모든 컬러칩을 카테고리와 관계없이 한 화면에서 모아볼 수 있는 시각적 요약 페이지를 추가한다.

## Problem

v1.0에서는 컬러가 카테고리별로 분리되어 있어, 사용자가 자신이 기록한 전체 컬러를 한눈에 보기 어렵다.

## Scope

- Pieces of Me 페이지 추가
- 전체 subColor 데이터 모아보기
- 카테고리별로 흩어진 subColors를 하나의 배열로 변환
- 좌측 자기 탐색 질문 또는 감성 문구 표시
- 우측 컬러칩 보드 구성
- 컬러칩 hover 시 기본 정보 표시
- hover 시 title, category, keywords 표시
- 컬러칩 클릭 시 기존 상세 Modal 재사용

## Technologies

- React Router
- Array `flatMap`
- Component reuse
- Modal reuse
- Hover interaction
- Conditional rendering

## What This Version Proves

- 중첩 데이터를 화면 목적에 맞게 재가공하는 능력
- 기존 Modal 컴포넌트 재사용
- 같은 데이터를 다른 UI로 표현하는 능력
- 인터랙션 기반 UI 구성 경험

## Required Outputs

- Pieces of Me 페이지
- Navigation에 Pieces of Me 진입 경로 추가
- 기존 상세 Modal 재사용 확인
- README에 v1.1 기능 설명 추가
- improvements.md에 Pieces of Me 추가 이유 기록
- Git tag: `v1.1.0`
- GitHub Release: `v1.1.0`

## Completion Criteria

- 모든 SubColor가 Pieces of Me 페이지에 표시된다.
- 각 컬러칩이 원래 카테고리 정보를 유지한다.
- hover 시 정보가 표시된다.
- 클릭 시 상세 정보를 확인할 수 있다.
- 기존 카테고리 상세 흐름이 깨지지 않는다.

---

# v1.2.0 — Palette Log

## Goal

createdAt 기준으로 사용자의 컬러 기록을 월별 달력 형태로 보여주는 Palette Log 페이지를 추가한다.

## Problem

컬러 데이터에 createdAt이 저장되어 있지만, 기존 화면에서는 날짜별 기록 흐름을 시각적으로 확인할 수 없다.

## Scope

- Palette Log 페이지 추가
- createdAt 기준으로 SubColor 그룹핑
- 월별 달력 UI 구성
- 날짜별 컬러칩 표시
- 하루에 여러 개 추가된 경우 겹친 칩 UI 적용
- hover 시 펼쳐지는 interaction 검토
- 클릭 시 해당 컬러 상세 보기

## Technologies

- Date handling
- Array grouping
- Calendar UI
- Conditional rendering
- Hover interaction
- Modal reuse

## What This Version Proves

- 날짜 기반 데이터 모델링
- 데이터를 기준에 따라 그룹핑하는 능력
- 달력형 UI 구현 경험
- createdAt 필드를 활용한 기능 확장

## Required Outputs

- Palette Log 페이지
- 월 이동 기능 optional
- 날짜별 컬러칩 렌더링
- 클릭 시 상세 보기
- README에 Palette Log 설명 추가
- improvements.md에 기록형 UI 추가 이유 작성
- Git tag: `v1.2.0`
- GitHub Release: `v1.2.0`

## Completion Criteria

- createdAt 기준으로 날짜별 컬러가 표시된다.
- 같은 날짜에 여러 개가 있어도 UI가 깨지지 않는다.
- 컬러칩 클릭 시 상세 정보를 확인할 수 있다.
- 기존 데이터 구조와 충돌하지 않는다.

---

# v1.3.0 — Pieces of Me Sticker UI Improvement

## Goal

v1.1에서 구현한 Pieces of Me의 기본 스티커 보드를 시각적 배치와 인터랙션 중심으로 고도화한다.

## Problem

v1.1의 Pieces of Me가 단순 컬러칩 나열에 그치면 MyPalette의 감성적 정체성이 약하게 보일 수 있다.

## Scope

- Pieces of Me 전용 StickerCard 컴포넌트 추가
- CSS 이중 테두리 또는 SVG frame 방식 검토
- 컬러칩마다 frame type 다르게 적용
- hover 확대 및 애니메이션 고도화
- hover 시 텍스트가 아래에서 위로 등장
- 기본 카테고리 카드와 다른 시각 스타일 적용

## Technologies

- Component variant
- CSS border
- SVG frame optional
- Hover animation
- UI interaction
- CSS transform / transition

## What This Version Proves

- 같은 데이터를 다른 UI 패턴으로 표현하는 능력
- 컴포넌트 variant 설계
- 감성적 UI와 정보 표시의 균형 조정
- 인터랙션 polish 경험

## Required Outputs

- StickerCard 컴포넌트
- frame type 기준 정리
- Pieces of Me 전용 스타일
- hover interaction 구현
- improvements.md에 Before / After 기록
- Git tag: `v1.3.0`
- GitHub Release: `v1.3.0`

## Completion Criteria

- Pieces of Me 페이지에서 컬러칩이 스티커 형태로 보인다.
- frame type이 2개 이상 적용된다.
- hover interaction이 자연스럽게 동작한다.
- 정보 가독성이 유지된다.

---

# v1.5.0 — TypeScript Migration

## Goal

JavaScript 기반 MyPalette를 TypeScript로 마이그레이션하여 데이터 구조와 props 타입을 명확히 한다.

## Problem

JavaScript 상태에서는 selectedColor, subColor, colorGroup 같은 데이터 구조가 코드만 보고 명확하지 않을 수 있다. 잘못된 props 전달이나 필드명 실수도 실행 전에는 발견하기 어렵다.

## Scope

- TypeScript 설치 및 설정
- `.jsx` 파일을 `.tsx`로 점진적 변경
- ColorGroup 타입 정의
- SubColor 타입 정의
- PresetColor 타입 정의
- Component props 타입 정의
- Event handler 타입 정의
- Router params 타입 처리
- `any` 사용 최소화

## Technologies

- TypeScript
- React + TypeScript
- type / interface
- optional property
- union type
- event type
- props type

## What This Version Proves

- 기존 JavaScript 프로젝트를 TypeScript로 이전하는 경험
- 데이터 모델을 타입으로 정의하는 능력
- 컴포넌트 props 구조를 명확히 하는 능력
- 런타임 오류 가능성을 개발 단계에서 줄이는 경험

## Required Outputs

- TypeScript 적용된 프로젝트
- `types` 또는 `models` 파일
- 주요 컴포넌트 props 타입 정의
- TypeScript 에러 없는 빌드
- README에 TypeScript migration 설명 추가
- improvements.md에 migration Before / After 기록
- Git tag: `v1.5.0`
- GitHub Release: `v1.5.0`

## Completion Criteria

- 프로젝트가 TypeScript로 정상 실행된다.
- 주요 데이터 타입이 정의되어 있다.
- selectedColor 구조가 타입으로 고정되어 있다.
- Add/Edit Form props 타입이 명확하다.
- `any` 사용이 최소화되어 있다.

---

# v2.0.0 — Zustand State Management Refactoring

## Goal

상위 컴포넌트에 집중된 색상 데이터 상태와 변경 로직을 Zustand store로 분리하여 상태 관리 구조를 개선한다.

## Problem

v1.x에서는 colorGroups state와 Add/Edit/Delete 함수가 상위 컴포넌트에 집중된다. 프로젝트가 커질수록 props 전달이 길어지고, App 컴포넌트의 책임이 커질 수 있다.

## Scope

- Zustand 설치
- colorStore 생성
- colorGroups 상태 store로 이동
- addSubColor 액션 생성
- updateSubColor 액션 생성
- deleteSubColor 액션 생성
- 필요한 컴포넌트에서 store 직접 사용
- props 전달 감소 확인

## Technologies

- Zustand
- Store
- Selector
- Action
- Custom hook style store

## What This Version Proves

- React state lifting의 한계를 인식하고 개선하는 경험
- 전역 상태 관리 라이브러리 선택 이유 설명
- 상태와 액션을 역할별로 분리하는 능력
- Context 또는 props 전달과 Zustand의 차이를 설명하는 능력

## Required Outputs

- `useColorStore` 또는 유사 store 파일
- Add/Edit/Delete 동작 유지
- props 전달 감소한 코드 구조
- README에 Zustand 도입 이유 작성
- improvements.md에 Before / After / Trade-off 기록
- Git tag: `v2.0.0`
- GitHub Release: `v2.0.0`

## Completion Criteria

- 기존 기능이 동일하게 동작한다.
- colorGroups 관련 로직이 store에 모여 있다.
- 컴포넌트의 props 전달 부담이 줄었다.
- Zustand를 왜 도입했는지 설명할 수 있다.
- 작은 프로젝트에서 Zustand가 과할 수 있다는 trade-off도 설명할 수 있다.

---

# v2.5.0 — UI System & Styling Improvement

## Goal

스타일 구조를 정리하고, Tailwind CSS 또는 기존 CSS 기반 스타일 시스템을 통해 UI 일관성과 유지보수성을 개선한다.

## Problem

프로젝트가 커질수록 버튼, 카드, 태그, Modal, Form Field 등의 스타일이 반복되거나 흩어질 수 있다. 반응형 대응도 별도로 정리할 필요가 있다.

## Scope

- Tailwind CSS 도입 여부 결정
- Button 스타일 기준 정리
- Card 스타일 기준 정리
- Tag 스타일 기준 정리
- Modal 스타일 기준 정리
- Form Field 스타일 기준 정리
- Editor Page 반응형 대응
- 카테고리 / SubColor 카드 반응형 대응
- 공통 spacing, radius, shadow 기준 정리

## Technologies

- Tailwind CSS optional
- CSS refactoring
- Utility class
- Responsive design
- Design token concept
- Optional: clsx / classnames

## What This Version Proves

- UI 스타일을 체계적으로 관리하는 능력
- 반응형 레이아웃 개선 경험
- 디자인 일관성을 코드 구조로 관리하는 경험
- Tailwind 도입 여부를 목적에 따라 판단하는 능력

## Required Outputs

- 정리된 스타일 구조
- 반응형 대응된 주요 화면
- Tailwind 도입 시 설정 파일 및 적용 기준
- Tailwind 미도입 시 CSS 구조 정리 문서
- README에 UI 개선 방향 작성
- improvements.md에 스타일 개선 Before / After 기록
- Git tag: `v2.5.0`
- GitHub Release: `v2.5.0`

## Completion Criteria

- PC와 모바일에서 주요 화면이 크게 깨지지 않는다.
- 공통 UI 요소의 스타일 기준이 정리되어 있다.
- Editor Page와 Modal의 레이아웃이 안정적이다.
- Tailwind를 도입했다면 도입 이유를 설명할 수 있다.
- 도입하지 않았다면 기존 CSS를 유지한 이유를 설명할 수 있다.

---

# v3.0.0 — Data Persistence with LocalStorage

## Goal

사용자가 추가, 수정, 삭제한 컬러 데이터가 새로고침 후에도 유지되도록 localStorage 저장 기능을 추가한다.

## Problem

v1~v2에서는 데이터가 메모리 상태에만 존재하므로 새로고침하면 변경 내용이 사라진다. 기록형 서비스로 보기에는 데이터 유지가 필요하다.

## Scope

- localStorage 저장 구현
- 초기 로딩 시 저장 데이터 확인
- 저장 데이터가 없으면 기본 데이터 사용
- Add/Edit/Delete 시 localStorage 반영
- 데이터 구조 변경 가능성 고려
- 필요 시 storage key 관리

## Technologies

- localStorage
- JSON.stringify
- JSON.parse
- useEffect
- 초기 상태 설정
- Error handling for storage data

## What This Version Proves

- 클라이언트 저장소 활용 경험
- 상태와 브라우저 저장소 동기화 경험
- 기록형 서비스의 데이터 유지 문제 해결
- 초기 데이터와 사용자 데이터 분리 사고

## Required Outputs

- localStorage 저장 기능
- 새로고침 후 데이터 유지 확인
- storage key 정의
- README에 데이터 저장 방식 설명
- improvements.md에 Data Persistence 기록
- Git tag: `v3.0.0`
- GitHub Release: `v3.0.0`

## Completion Criteria

- 새로고침 후에도 추가한 SubColor가 유지된다.
- 수정한 내용이 유지된다.
- 삭제한 내용이 유지된다.
- 저장 데이터가 없을 때 기본 데이터가 표시된다.
- 잘못된 저장 데이터가 있을 때 앱이 치명적으로 깨지지 않는다.

---

# v3.5.0 — Quality Improvement

## Goal

새 기능 추가보다 사용성, 접근성, 예외 처리, 코드 구조를 개선하여 프로젝트 완성도를 높인다.

## Problem

기능이 동작하더라도 키보드 접근성, 잘못된 URL 접근, empty state, 반복 로직 분리 같은 품질 요소가 부족하면 실제 서비스 관점에서 아쉬움이 남는다.

## Scope

- Modal ESC 닫기
- Modal focus 관리 검토
- 버튼 aria-label 추가
- 존재하지 않는 category id 예외 처리
- 존재하지 않는 subColorId 예외 처리
- subColor가 없을 때 empty state 표시
- useOutsideClick 분리
- useBodyScrollLock 분리
- useKeywordInput 분리 검토
- 필요한 경우 성능 최적화 검토

## Technologies

- Accessibility
- aria-label
- Keyboard interaction
- Custom Hook
- Error / Empty State
- React.memo optional
- useMemo / useCallback optional

## What This Version Proves

- 기능 구현 이후 품질 개선 경험
- 접근성을 고려한 UI 개선
- 반복 로직을 custom hook으로 분리하는 능력
- 예외 상황을 고려하는 개발 습관

## Required Outputs

- 접근성 개선 최소 2개 이상
- 예외 처리 화면 또는 메시지
- custom hook 최소 1개 이상
- README에 품질 개선 항목 추가
- improvements.md에 품질 개선 Before / After 기록
- Git tag: `v3.5.0`
- GitHub Release: `v3.5.0`

## Completion Criteria

- 키보드로 주요 Modal 조작이 가능하다.
- 잘못된 URL 접근 시 앱이 깨지지 않는다.
- 빈 데이터 상태에서 안내 UI가 표시된다.
- 반복 로직이 적절히 분리되어 있다.

---

# v3.8.0 — External Color API Integration

## Goal

외부 색상 API를 연동하여 사용자가 선택한 색상의 일반적인 이름과 어울리는 컬러 조합을 추천받을 수 있도록 한다.

## Problem

현재 Editor에서는 사용자가 직접 컬러 이름을 작성하고 preset color 또는 color picker로 색상을 선택해야 한다.

색상 이름을 떠올리기 어렵거나 어떤 색을 함께 사용해야 할지 모르는 사용자는 컬러를 기록하는 과정에서 부담을 느낄 수 있다.

## Scope

- 클라이언트에서 안전하게 호출할 수 있는 외부 색상 API 선정
- 사용자가 추천 기능을 실행했을 때 현재 HEX 값을 기준으로 API 요청
- 선택한 색상의 일반적인 색상 이름 표시
- 추천 색상 이름을 사용자가 선택하면 `colorName` 입력값에 반영
- 선택한 색상을 기준으로 컬러 조합 요청
- API가 지원하는 조합 방식 중 1~2개 선택
- 추천 컬러 목록 표시
- 추천 컬러를 선택하면 Editor의 `selectedColor`에 반영
- 추천 컬러 적용 결과를 preview에서 확인
- API 요청 중 Loading UI 표시
- API 요청 실패 시 Error UI 표시
- 응답 데이터가 없을 때 Empty State 또는 fallback 안내 표시
- API 요청이 실패해도 preset color와 color picker 기능 유지

## Technologies

- Fetch API
- async / await
- HTTP request / response
- JSON response handling
- Query parameter
- Loading / Success / Error state
- Environment variables when required
- Optional after basic implementation: React Query

## What This Version Proves

- 외부 API를 호출하고 응답 데이터를 화면에 연결하는 경험
- 비동기 요청의 Loading, Success, Error 상태 처리
- API 응답 객체와 배열에서 필요한 데이터를 추출하여 UI로 렌더링하는 능력
- 외부 데이터와 기존 Editor Form state를 연결하는 능력
- API 실패 상황에서도 기존 기능을 유지하는 fallback 설계 경험
- 외부 API의 응답 구조와 사용 조건을 확인하고 기능 범위를 결정하는 경험

## Required Outputs

- 외부 색상 API 연동 코드
- 색상 이름 추천 UI
- 컬러 조합 추천 UI
- Loading UI
- Error 또는 Empty State UI
- API 실패 시 기존 Editor 기능 유지
- README에 사용한 API와 기능 설명
- improvements.md에 API 도입 Before / After / Trade-off 기록
- Git tag: `v3.8.0`
- GitHub Release: `v3.8.0`

## Completion Criteria

- 사용자가 추천 기능을 실행하면 현재 HEX 값을 기준으로 API 요청이 실행된다.
- API가 반환한 일반적인 색상 이름을 확인할 수 있다.
- 추천 이름은 사용자가 선택했을 때만 `colorName` 입력값에 반영된다.
- 선택한 색상을 기준으로 추천 컬러 조합이 표시된다.
- 추천 컬러를 선택하면 Editor의 `selectedColor`와 preview에 반영된다.
- Loading, Error, 빈 응답 상태가 화면에 표시된다.
- API 요청이 실패해도 preset color와 color picker를 계속 사용할 수 있다.
- 비밀 API key가 필요한 경우 클라이언트 코드와 번들에 직접 포함되지 않는다.

---

# v4.0.0 — Backend Expansion

## Goal

MyPalette를 실제 서비스에 가까운 구조로 확장하기 위해 Firebase 또는 Supabase를 검토하고, 사용자별 데이터 저장 구조를 구현한다.

## Problem

localStorage는 브라우저 단위 저장소이므로 사용자 계정 기반 데이터 관리나 여러 기기 간 동기화가 어렵다.

## Scope

- Firebase 또는 Supabase 선택
- 선택 이유 정리
- Auth 도입 여부 결정
- 사용자별 colorGroups 저장
- Loading UI 추가
- Error UI 추가
- API 또는 DB 실패 처리
- 배포 환경 변수 관리

## Technologies

- Firebase optional
- Supabase optional
- Auth
- Database
- Environment variables
- Loading / Error handling
- Optional: React Query

## What This Version Proves

- 프론트엔드와 백엔드 서비스 연동 경험
- 사용자별 데이터 구조 설계
- 비동기 요청의 loading/error 처리
- 환경 변수와 배포 환경 관리 경험

## Required Outputs

- Firebase 또는 Supabase 연동 코드
- 사용자별 데이터 저장 기능
- 로그인 기능 optional
- Loading / Error UI
- `.env.example`
- README에 Backend 구조 설명
- improvements.md에 Backend 확장 기록
- Git tag: `v4.0.0`
- GitHub Release: `v4.0.0`

## Completion Criteria

- 사용자 데이터가 외부 저장소에 저장된다.
- 새로고침 후에도 데이터가 유지된다.
- 다른 환경에서도 설정 후 실행 가능하다.
- API 또는 DB 오류 시 사용자에게 안내된다.
- 환경 변수나 민감 정보가 GitHub에 올라가지 않는다.

---

# Portfolio Message

MyPalette는 단순한 컬러 기록 앱이 아니라, React 프로젝트를 버전별로 개선하면서 기술 선택의 이유와 결과를 설명할 수 있도록 설계한 성장형 포트폴리오 프로젝트다.

핵심 메시지는 다음과 같다.

> v1.0에서는 React 기본기로 핵심 CRUD를 완성하고, v1.1에서는 전체 컬러를 한 화면에 모아보는 Pieces of Me를, v1.2에서는 createdAt을 활용한 Palette Log를 추가합니다. 이후 Pieces of Me의 스티커 UI를 고도화하고, TypeScript, Zustand, 스타일 시스템, localStorage, 접근성, 외부 색상 API, Backend 연동을 단계적으로 적용하며 프로젝트의 안정성, 유지보수성, 사용성을 개선합니다.

---

# Interview Talking Points

## v1.0

- Add/Edit Form을 왜 하나로 재사용했는가?
- Modal과 Editor Page를 왜 분리했는가?
- colorGroups state를 왜 상위에서 관리했는가?
- URL params로 Add/Edit 모드를 나눈 이유는 무엇인가?
- createdAt을 왜 초기 데이터 구조에 포함했는가?

## v1.1

- Pieces of Me에서 데이터를 어떻게 모아서 렌더링했는가?
- 기존 Modal을 어떻게 재사용했는가?
- 카테고리별 데이터와 전체 보기 데이터를 어떻게 연결했는가?

## v1.2

- createdAt 기준으로 데이터를 어떻게 그룹핑했는가?
- 월별 달력의 날짜 구조를 어떻게 만들었는가?
- 같은 날짜에 여러 컬러가 있을 때 어떻게 표시했는가?
- 기존 상세 Modal을 어떻게 재사용했는가?

## v1.3

- v1.1의 기본 스티커 보드에서 무엇을 개선했는가?
- 스티커의 회전이나 배치 값을 어떤 기준으로 정했는가?
- StickerCard를 별도 컴포넌트로 분리한 이유는 무엇인가?
- 시각적 표현과 정보 가독성 사이의 균형을 어떻게 맞췄는가?

## v1.5

- TypeScript 마이그레이션에서 가장 먼저 정의한 타입은 무엇인가?
- selectedColor 타입을 어떻게 설계했는가?
- TypeScript 적용으로 어떤 실수를 줄일 수 있었는가?

## v2.0

- Zustand를 왜 도입했는가?
- 기존 state lifting 구조의 한계는 무엇이었는가?
- 작은 프로젝트에서 Zustand가 과할 수 있다는 점을 어떻게 판단했는가?

## v2.5

- Tailwind를 도입했다면 왜 도입했는가?
- 도입하지 않았다면 기존 CSS를 어떻게 정리했는가?
- 반응형 대응에서 어떤 레이아웃 문제가 있었고 어떻게 해결했는가?

## v3.0

- localStorage를 선택한 이유는 무엇인가?
- 저장 데이터가 깨졌을 때 어떻게 처리할 수 있는가?
- Backend보다 localStorage를 먼저 적용한 이유는 무엇인가?

## v3.5

- 접근성을 위해 무엇을 개선했는가?
- custom hook으로 분리한 로직은 무엇인가?
- 성능 최적화를 무조건 적용하지 않은 이유는 무엇인가?

## v3.8

- 외부 색상 API를 선택한 이유는 무엇인가?
- HEX 값을 API 요청에 어떻게 전달했는가?
- API 응답에서 필요한 데이터만 어떻게 추출했는가?
- Loading, Error, 빈 응답 상태를 어떻게 처리했는가?
- 추천 색상을 기존 Editor Form state와 어떻게 연결했는가?
- API가 실패해도 preset color를 유지한 이유는 무엇인가?

## v4.0

- Firebase와 Supabase 중 무엇을 선택했고 이유는 무엇인가?
- 사용자별 데이터 구조를 어떻게 설계했는가?
- Loading/Error UI를 어떻게 처리했는가?
