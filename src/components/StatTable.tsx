import type { Item } from '../types/item';

// 카드(요약)와 상세는 같은 데이터를 다르게 보여준다.
// 카드는 0인 스탯을 숨겨 정보 밀도를 낮추고, 상세는 0까지 전부 보여준다.
// "이 아이템에는 INT가 안 붙는다"는 것도 상세 화면에서는 정보이기 때문.
export default function StatTable({ item }: { item: Item }) {
  const rows: { label: string; value: number | string }[] = [
    { label: '분류', value: item.category },
    { label: '직업', value: item.job },
    { label: '요구 레벨', value: item.reqLevel },
    { label: 'STR', value: item.str },
    { label: 'DEX', value: item.dex },
    { label: 'INT', value: item.int },
    { label: 'LUK', value: item.luk },
    { label: '공격력', value: item.attack },
  ];

  return (
    <table className="stat-table">
      <caption className="sr-only">{item.name} 상세 스탯</caption>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label}>
            <th scope="row">{row.label}</th>
            <td>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
