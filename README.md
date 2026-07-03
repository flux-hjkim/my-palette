# MyPalette

MyPalette는 사용자가 자신의 취향, 성향, 관심사, 내면의 특징, 이상향을 색상 카드로 기록하고 카테고리별로 정리할 수 있는 React 기반 웹 애플리케이션입니다.

## v1.0 Goal

v1.0의 목표는 사용자가 컬러 그룹을 탐색하고, SubColor를 추가/수정/삭제하며, 상세 정보를 확인할 수 있는 핵심 CRUD 흐름을 완성하는 것입니다.

## Tech Stack

- React
- JavaScript
- React Router
- CSS
- Vite

## Main Features

- 컬러 그룹 목록 확인
- 컬러 그룹 상세 페이지
- SubColor 상세 Modal
- SubColor 추가 / 수정 / 삭제
- Add/Edit 공용 Editor Page
- Keyword 추가 / 삭제
- Preset color 선택
- createdAt 기반 기록 데이터 유지

## Key Decisions

### Add/Edit 공용 Form

Add와 Edit의 입력 구조가 거의 동일하기 때문에 하나의 Form 컴포넌트를 재사용하도록 설계했습니다.

### Modal과 Page 역할 분리

상세 정보 확인은 Modal, 작성과 수정은 Editor Page에서 처리하도록 분리했습니다.

### colorGroups state lifting

여러 페이지에서 동일한 컬러 데이터를 공유하기 위해 colorGroups state를 상위 컴포넌트에서 관리했습니다.

### URL params 기반 Add/Edit 분기

URL의 group id와 subColor id를 기준으로 Add/Edit 화면의 역할을 구분했습니다.

## Getting Started

```bash
npm install
npm run dev
```
