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
- [ ] 아이템 DB 조회 화면 리빌드 (검색 · 상세)
- [ ] 강화 시뮬레이터 컴포넌트 분리 설계
- [ ] 상태 관리 도입 및 데이터 페칭 구조화
- [ ] 독립 URL 배포 (Firebase Hosting)

## 기술 스택

React 18+ · TypeScript · Vite

---

진행 과정은 커밋 히스토리로 기록합니다. 원본 서비스는 [maplelog.gg](https://maplelog.gg)에서 운영 중입니다.
