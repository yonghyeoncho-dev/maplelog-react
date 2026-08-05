import { Routes, Route } from 'react-router-dom';
import ItemListPage from './pages/ItemListPage';
import ItemDetailPage from './pages/ItemDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

// [라우팅] 원본 maplelog에서는 location.hash를 읽어 직접 화면을 갈아끼웠다.
// 여기서는 "어떤 주소일 때 어떤 컴포넌트를 그릴지"를 선언만 하고 매칭은 Router가 한다.
// App은 화면을 그리지 않고 "주소 → 화면" 지도 역할만 한다.
// 경로가 늘어나도 분기문이 길어지는 대신 Route 한 줄이 늘어난다.
export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<ItemListPage />} />
        <Route path="/item/:code" element={<ItemDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
