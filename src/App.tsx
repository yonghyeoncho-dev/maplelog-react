import './App.css'

const roadmap = [
  { done: true, label: 'Vite + React + TypeScript 프로젝트 셋업' },
  { done: false, label: '아이템 DB 조회 화면 리빌드 (검색 · 상세)' },
  { done: false, label: '강화 시뮬레이터 컴포넌트 분리 설계' },
  { done: false, label: '상태 관리 도입 및 데이터 페칭 구조화' },
  { done: false, label: '독립 URL 배포 (Firebase Hosting)' },
]

function App() {
  return (
    <main style={{ maxWidth: 640, margin: '0 auto', padding: '48px 24px', fontFamily: 'sans-serif' }}>
      <h1>maplelog-react</h1>
      <p>
        실운영 중인 메이플스토리 팬 서비스{' '}
        <a href="https://maplelog.gg" target="_blank" rel="noreferrer">maplelog.gg</a>
        를 React + TypeScript로 리빌드하는 프로젝트입니다.
      </p>
      <h2>로드맵</h2>
      <ul style={{ lineHeight: 1.9, listStyle: 'none', padding: 0 }}>
        {roadmap.map((item) => (
          <li key={item.label}>{item.done ? '✅' : '⬜'} {item.label}</li>
        ))}
      </ul>
    </main>
  )
}

export default App
