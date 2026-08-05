import type { Item, RequirementKey, StatKey } from '../types/item';
import { REQUIREMENT_LABELS, STAT_LABELS, STAT_ORDER } from '../types/item';

const REQ_ORDER: RequirementKey[] = ['str', 'dex', 'int', 'luk', 'pop'];

type Row = { label: string; value: string };

function Section({ title, rows }: { title: string; rows: Row[] }) {
  if (rows.length === 0) return null;
  return (
    <section className="stat-section">
      <h2 className="stat-section__title">{title}</h2>
      <table className="stat-table">
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

// 상세는 카드와 달리 아이템이 가진 값을 전부 보여준다.
// 다만 "요구 조건 / 올려주는 옵션 / 그 외"는 성격이 다른 정보라 한 표에 섞지 않고 나눈다.
export default function StatTable({ item }: { item: Item }) {
  const req: Row[] = [
    { label: '요구 레벨', value: String(item.reqLevel) },
    ...REQ_ORDER
      .filter((key): key is RequirementKey => Boolean(item.req?.[key]))
      .map((key) => ({ label: REQUIREMENT_LABELS[key], value: String(item.req![key]) })),
    {
      label: '착용 직업',
      value: item.jobs.length === 0 ? '전 직업 공용' : item.jobs.join(', '),
    },
  ];

  const stats: Row[] = STAT_ORDER
    .filter((key): key is StatKey => Boolean(item.stats?.[key]))
    .map((key) => ({ label: STAT_LABELS[key], value: `+${item.stats![key]}` }));

  const etc: Row[] = [];
  if (item.attackSpeed) etc.push({ label: '공격 속도', value: `${item.attackSpeed} (낮을수록 빠름)` });
  if (item.upgrades) etc.push({ label: '업그레이드 가능', value: `${item.upgrades}회` });
  if (item.price) etc.push({ label: '상점가', value: `${item.price.toLocaleString()} 메소` });
  etc.push({ label: '아이템 코드', value: String(item.code) });

  return (
    <div className="stat-sections">
      <Section title="착용 조건" rows={req} />
      <Section title="옵션" rows={stats} />
      <Section title="기타" rows={etc} />
    </div>
  );
}
