import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="detail">
      <h1>404</h1>
      <p className="empty">요청하신 주소를 찾을 수 없습니다.</p>
      <Link className="back" to="/">← 목록으로</Link>
    </section>
  );
}
