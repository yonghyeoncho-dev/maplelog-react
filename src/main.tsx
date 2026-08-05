import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';

// BrowserRouter는 주소창의 경로(/item/3)를 그대로 쓴다. (해시 #/item/3 아님)
// 대신 새로고침 시 서버가 /item/3 이라는 파일을 찾으려 하므로, 배포할 때는
// 모든 경로를 index.html로 되돌리는 rewrite 설정이 필요하다 → Phase 3, firebase.json.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
