import { Link } from 'react-router-dom';
import type { Item } from '../types/item';

// [컴포넌트] = JSX를 리턴하는 함수. 원본 maplelog의 "아이템 1개 렌더 함수"와 같은 역할이다.
// 차이: 원본은 문자열을 만들어 innerHTML에 꽂았지만, 여기서는 JSX를 리턴하고 DOM 반영은 React가 한다.
// [props] = 함수가 받는 인자. { item } 처럼 구조분해로 꺼내 쓴다.
export default function ItemCard({ item }: { item: Item }) {
  // 0인 스탯은 표시하지 않는다 — 원본에서도 빈 스탯 줄이 카드를 지저분하게 만들었다.
  const stats = [
    { label: 'STR', value: item.str },
    { label: 'DEX', value: item.dex },
    { label: 'INT', value: item.int },
    { label: 'LUK', value: item.luk },
    { label: '공격력', value: item.attack },
  ].filter((s) => s.value > 0);

  return (
    // 카드 안에 링크를 따로 두지 않고 카드 전체를 Link로 만든다.
    // 클릭 영역이 카드 전체가 되고, 키보드 Tab으로도 카드 단위로 이동된다.
    <Link to={`/item/${item.id}`} className="item-card">
      <div className="item-card__head">
        {/* JSX 안에서 값을 넣을 때는 중괄호 */}
        <h3 className="item-card__name">{item.name}</h3>
        <span className="item-card__job">{item.job}</span>
      </div>

      <p className="item-card__meta">
        {item.category} · Lv.{item.reqLevel}
      </p>

      <ul className="item-card__stats">
        {/* [리스트 렌더링] 배열 → JSX 배열. key는 React가 각 항목을 구분하는 식별자다.
            key가 없으면 목록이 바뀔 때 React가 어떤 항목이 그대로인지 몰라 전부 다시 그린다. */}
        {stats.map((s) => (
          <li key={s.label}>
            <span>{s.label}</span>
            <b>+{s.value}</b>
          </li>
        ))}
      </ul>
    </Link>
  );
}
