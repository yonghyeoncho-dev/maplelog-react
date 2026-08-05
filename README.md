# maplelog-react

실운영 중인 메이플스토리 팬 서비스 **[maplelog.gg](https://maplelog.gg)** 를 React + TypeScript로 리빌드하는 프로젝트입니다.

## 원본 서비스 (maplelog.gg)

- 메이플랜드 유저를 위한 비공식 팬 서비스 — 1인 기획·개발·운영
- 실아이템 3,700종 스탯 DB · 인게임 확률을 재현한 강화 시뮬레이터 · 공대 정산 원장 · 혼테일 타이머
- Vanilla JS SPA (프레임워크 없이 라우팅·상태·렌더링 직접 구현)
- Firebase (Firestore · Cloud Functions · Hosting), Discord OAuth

## 리빌드 목표

원본에서 원리 수준으로 직접 구현했던 것들을 모던 스택으로 다시 세우며, 두 구현의 차이를 커밋 히스토리로 기록합니다.

- [x] Vite + React + TypeScript 프로젝트 셋업
- [x] 아이템 DB 조회 화면 — 이름 검색 · 직업 필터
- [x] 상세 화면 + 라우팅 (`/` 목록, `/item/:id` 상세)
- [ ] 강화 시뮬레이터 컴포넌트 분리 설계
- [ ] 상태 관리 도입 및 데이터 페칭 구조화
- [ ] 독립 URL 배포 (Firebase Hosting)

## 화면 구성

| 경로 | 화면 | 비고 |
|---|---|---|
| `/` | 아이템 목록 | 이름 검색 · 직업 필터. 검색 조건은 쿼리스트링에 보존 |
| `/item/:id` | 아이템 상세 | 스탯 테이블. 없는 id는 안내 문구 처리 |

## 원본과의 구현 차이 기록

| 원본 maplelog (Vanilla) | 이 저장소 (React) |
|---|---|
| `location.hash` 파싱 후 렌더 함수 직접 호출 | React Router의 경로 선언 매칭 |
| `location.search` 직접 파싱 + `history.pushState` 직접 호출 | `useSearchParams` |
| 상태 변경 후 렌더 함수 수동 호출 | `useState` — 값 변경이 곧 렌더 |
| 문자열 조립 후 `innerHTML` 주입 | JSX 리턴, DOM 반영은 React 담당 |

상세 화면을 붙인 뒤, 검색 결과에서 아이템을 열었다가 뒤로 오면 검색어가 사라지는 문제를 만났습니다.
목록 컴포넌트가 화면에서 사라질 때 그 안의 상태도 함께 사라지는 것이 원인이었고,
검색 조건은 화면이 잠시 들고 있을 값이 아니라 그 화면이 무엇을 보여주는지를 규정하는 값이라고 판단해
상태를 컴포넌트에서 URL 쿼리스트링으로 옮겼습니다. 새로고침과 링크 공유도 함께 해결되었습니다.

## 기술 스택

React 19 · TypeScript · Vite · React Router

## 로컬 실행

```bash
npm install
npm run dev
```

---

진행 과정은 커밋 히스토리로 기록합니다. 원본 서비스는 [maplelog.gg](https://maplelog.gg)에서 운영 중입니다.
