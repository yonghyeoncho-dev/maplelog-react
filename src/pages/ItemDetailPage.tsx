import { Link, useParams } from 'react-router-dom';
import { findItem } from '../data/items';
import StatTable from '../components/StatTable';

export default function ItemDetailPage() {
  // [useParams] 라우트에 선언한 :id 자리에 실제로 들어온 값을 꺼낸다.
  // 주소에서 온 값은 언제나 문자열이다. "3"이지 3이 아니다.
  // Item.id는 number이므로 여기서 변환해야 하고, 사용자가 /item/abc를 직접 쳐서
  // 들어오면 NaN이 되므로 그 경우도 막아야 한다.
  const { id } = useParams();
  const numericId = Number(id);
  const item = Number.isInteger(numericId) ? findItem(numericId) : undefined;

  if (!item) {
    return (
      <section className="detail">
        <p className="empty">존재하지 않는 아이템입니다.</p>
        <Link className="back" to="/">← 목록으로</Link>
      </section>
    );
  }

  return (
    <section className="detail">
      {/* [Link] a 태그와 달리 페이지를 새로 내려받지 않고 주소만 바꾼다.
          원본에서 hash를 직접 갈아끼우던 것과 같은 동작을 Router가 대신한다.
          to="/"로 두면 검색 조건이 날아가지만, 브라우저 뒤로가기를 쓰면
          쿼리스트링까지 그대로 복원된다. */}
      <Link className="back" to="/">← 목록으로</Link>

      <header className="detail__head">
        <h1>{item.name}</h1>
        <p className="detail__meta">
          {item.category} · {item.job} · Lv.{item.reqLevel}
        </p>
      </header>

      <StatTable item={item} />
    </section>
  );
}
