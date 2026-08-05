import type { Item } from '../types/item';
import ItemCard from './ItemCard';

// 목록 컴포넌트는 "배열을 받아 카드 여러 개를 그리는" 역할만 한다.
// 검색·필터·페이징 로직을 여기 두지 않는 이유: 이 컴포넌트는 무엇을 받든 그대로 그리기만 하면 되고,
// 그래야 나중에 즐겨찾기 목록 등 다른 화면에서 그대로 재사용할 수 있다.
export default function ItemList({ items }: { items: Item[] }) {
  if (items.length === 0) {
    return <p className="empty">검색 결과가 없습니다.</p>;
  }

  return (
    <div className="item-grid">
      {items.map((item) => (
        <ItemCard key={item.code} item={item} />
      ))}
    </div>
  );
}
