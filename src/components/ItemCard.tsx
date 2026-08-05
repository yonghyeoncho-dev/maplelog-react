import { Link } from 'react-router-dom';
import type { Item, StatKey } from '../types/item';
import { STAT_LABELS, STAT_ORDER } from '../types/item';

// 카드는 요약이다. 스탯이 14종까지 붙는 아이템이 있어 전부 보여주면 카드가 세로로 길어지고
// 목록의 스캔 가능성이 떨어진다. 우선순위 순으로 4개까지만 노출하고 나머지는 개수로 알린다.
const MAX_STATS = 4;

export default function ItemCard({ item }: { item: Item }) {
  const entries = STAT_ORDER
    .filter((key): key is StatKey => Boolean(item.stats?.[key]))
    .map((key) => ({ key, label: STAT_LABELS[key], value: item.stats![key]! }));

  const shown = entries.slice(0, MAX_STATS);
  const rest = entries.length - shown.length;

  return (
    // 카드 전체가 하나의 링크다. 클릭 영역이 카드 전체가 되고 Tab 이동도 카드 단위가 된다.
    <Link to={`/item/${item.code}`} className="item-card">
      <div className="item-card__head">
        <h3 className="item-card__name">{item.name}</h3>
        <span className="item-card__job">
          {item.jobs.length === 0 ? '공용' : item.jobs.join('·')}
        </span>
      </div>

      <p className="item-card__meta">
        {item.type} · Lv.{item.reqLevel}
      </p>

      {entries.length > 0 && (
        <ul className="item-card__stats">
          {shown.map((s) => (
            <li key={s.key}>
              <span>{s.label}</span>
              <b>+{s.value}</b>
            </li>
          ))}
          {rest > 0 && <li className="item-card__more">외 {rest}개 옵션</li>}
        </ul>
      )}
    </Link>
  );
}
