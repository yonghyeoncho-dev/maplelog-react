import { Link, useParams } from 'react-router-dom';
import { findItem, useItems } from '../data/useItems';
import StatTable from '../components/StatTable';

export default function ItemDetailPage() {
  const state = useItems();

  // [useParams] 라우트에 선언한 :code 자리에 실제로 들어온 값을 꺼낸다.
  // 주소에서 온 값은 언제나 문자열이다. "1402005"이지 1402005가 아니다.
  // 사용자가 /item/abc를 직접 쳐서 들어오면 NaN이 되므로 그 경우도 막는다.
  const { code } = useParams();
  const numericCode = Number(code);
  const valid = Number.isInteger(numericCode);

  if (state.status === 'loading') {
    return <section className="detail"><p className="count">불러오는 중…</p></section>;
  }

  if (state.status === 'error') {
    return (
      <section className="detail">
        <p className="empty">아이템 데이터를 불러오지 못했습니다. ({state.message})</p>
        <Link className="back" to="/">← 목록으로</Link>
      </section>
    );
  }

  const item = valid ? findItem(state.items, numericCode) : undefined;

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
          여기서 "/"로 가면 검색 조건이 초기화되지만, 브라우저 뒤로가기를 쓰면
          쿼리스트링까지 그대로 복원된다. */}
      <Link className="back" to="/">← 목록으로</Link>

      <header className="detail__head">
        <h1>{item.name}</h1>
        {item.nameEn && <p className="detail__en">{item.nameEn}</p>}
        <p className="detail__meta">
          {item.group} · {item.type} · Lv.{item.reqLevel}
        </p>
      </header>

      <StatTable item={item} />
    </section>
  );
}
