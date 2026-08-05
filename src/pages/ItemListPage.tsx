import { useSearchParams } from 'react-router-dom';
import type { Item } from '../types/item';
import { items } from '../data/items';
import SearchBar from '../components/SearchBar';
import ItemList from '../components/ItemList';

type JobFilter = Item['job'] | '전체';

export default function ItemListPage() {
  // [useSearchParams] useState와 쓰는 모양은 거의 같지만, 값이 컴포넌트가 아니라
  // 주소창에 저장된다.
  //
  // 왜 useState가 아닌가:
  // 상세 화면으로 이동하면 이 컴포넌트가 화면에서 사라지고(unmount), 그 안의
  // useState 값도 같이 사라진다. 뒤로가기로 돌아오면 컴포넌트가 새로 만들어지므로
  // 검색어가 초기값으로 리셋된다. 검색 조건은 "화면이 잠깐 들고 있을 값"이 아니라
  // "이 화면이 무엇을 보여주는지를 규정하는 값"이므로 주소에 두는 것이 맞다.
  // 부수 효과로 새로고침·링크 공유에서도 조건이 유지된다.
  //
  // 원본 maplelog에서는 location.search를 직접 파싱하고 history.pushState를 직접 불렀다.
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('keyword') ?? '';
  const job = (searchParams.get('job') as JobFilter) ?? '전체';

  // 값이 비어 있으면 파라미터 자체를 지운다 — 주소에 ?keyword=&job=전체 같은
  // 의미 없는 꼬리가 남지 않게.
  // replace: true는 검색 한 글자마다 히스토리가 쌓여서 뒤로가기를 수십 번
  // 눌러야 하는 상황을 막는다.
  const updateParam = (key: 'keyword' | 'job', value: string) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === '전체') next.delete(key);
    else next.set(key, value);
    setSearchParams(next, { replace: true });
  };

  // 필터 결과는 별도 상태로 두지 않는다 — keyword/job에서 항상 계산해 낼 수 있는 값이기 때문.
  // 상태를 두 벌 관리하면 둘이 어긋나는 순간 버그가 된다.
  const filtered = items.filter((item) => {
    const matchKeyword = item.name.includes(keyword.trim());
    const matchJob = job === '전체' || item.job === job;
    return matchKeyword && matchJob;
  });

  return (
    <>
      <header className="app__head">
        <h1>아이템 DB</h1>
        <p>
          <a href="https://maplelog.gg" target="_blank" rel="noreferrer">maplelog.gg</a>
          의 아이템 조회 화면을 React + TypeScript로 리빌드하는 중입니다.
        </p>
      </header>

      {/* SearchBar는 Phase 1에서 제어 컴포넌트로 만들어 뒀기 때문에,
          부모가 상태를 useState에 두든 URL에 두든 수정 없이 그대로 동작한다. */}
      <SearchBar
        keyword={keyword}
        onKeywordChange={(value) => updateParam('keyword', value)}
        job={job}
        onJobChange={(value) => updateParam('job', value)}
      />

      <p className="count">{filtered.length}개</p>
      <ItemList items={filtered} />
    </>
  );
}
