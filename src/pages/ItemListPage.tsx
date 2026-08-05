import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useItems } from '../data/useItems';
import type { Item } from '../types/item';
import SearchBar from '../components/SearchBar';
import type { GroupFilter, JobFilter } from '../components/SearchBar';
import ItemList from '../components/ItemList';

// 2,600여 종을 한 번에 그리면 카드 하나당 DOM이 10개 남짓이라 3만 개가 쌓인다.
// 검색어를 한 글자 칠 때마다 그걸 다시 그리면 입력이 눈에 띄게 밀린다.
// 목록에서 실제로 보는 건 위쪽 몇십 개뿐이므로 상한을 두고 더 보기로 늘린다.
const PAGE_SIZE = 60;

// 컴포넌트 밖에 두는 이유: 안에서 []를 쓰면 렌더마다 새 배열이 만들어져
// 참조가 매번 달라지고, 그걸 의존성으로 쓰는 useMemo가 매번 다시 계산된다.
// (린트가 정확히 이걸 잡아줬다.)
const EMPTY: Item[] = [];

export default function ItemListPage() {
  const state = useItems();

  // [useSearchParams] useState와 쓰는 모양은 같지만 값이 주소창에 저장된다.
  // 상세로 가면 이 컴포넌트가 사라지면서 useState 값도 함께 사라지는데,
  // 검색 조건은 "이 화면이 무엇을 보여주는지"를 규정하는 값이므로 주소에 두는 것이 맞다.
  // 덕분에 뒤로가기·새로고침·링크 공유에서 조건이 유지된다.
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';
  const group = (searchParams.get('group') as GroupFilter) ?? '전체';
  const job = (searchParams.get('job') as JobFilter) ?? '전체';

  const [limit, setLimit] = useState(PAGE_SIZE);

  // 조건이 바뀌면 다시 위에서부터 본다.
  useEffect(() => { setLimit(PAGE_SIZE); }, [keyword, group, job]);

  const updateParam = (key: 'keyword' | 'group' | 'job', value: string) => {
    const next = new URLSearchParams(searchParams);
    // 빈 값·기본값이면 파라미터를 지운다 — 주소에 ?job=전체 같은 꼬리를 남기지 않기 위해.
    if (!value || value === '전체') next.delete(key);
    else next.set(key, value);
    // replace를 쓰지 않으면 한 글자마다 히스토리가 쌓여 뒤로가기가 먹통이 된다.
    setSearchParams(next, { replace: true });
  };

  const items = state.status === 'ready' ? state.items : EMPTY;

  // 2,600건을 매 렌더마다 훑지 않도록 조건이 바뀔 때만 다시 계산한다.
  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    return items.filter((item) => {
      const matchKeyword =
        !q || item.name.toLowerCase().includes(q) || item.nameEn.toLowerCase().includes(q);
      const matchGroup = group === '전체' || item.group === group;
      const matchJob =
        job === '전체' ||
        (job === '공용' ? item.jobs.length === 0 : item.jobs.includes(job));
      return matchKeyword && matchGroup && matchJob;
    });
  }, [items, keyword, group, job]);

  return (
    <>
      <header className="app__head">
        <h1>아이템 DB</h1>
        <p>
          <a href="https://maplelog.gg" target="_blank" rel="noreferrer">maplelog.gg</a>
          의 아이템 조회 화면을 React + TypeScript로 리빌드하는 중입니다.
        </p>
      </header>

      <SearchBar
        keyword={keyword}
        onKeywordChange={(value) => updateParam('keyword', value)}
        group={group}
        onGroupChange={(value) => updateParam('group', value)}
        job={job}
        onJobChange={(value) => updateParam('job', value)}
      />

      {state.status === 'loading' && <p className="count">아이템 데이터를 불러오는 중…</p>}

      {state.status === 'error' && (
        <p className="empty">
          아이템 데이터를 불러오지 못했습니다. ({state.message})
        </p>
      )}

      {state.status === 'ready' && (
        <>
          <p className="count">
            {filtered.length.toLocaleString()}개
            {filtered.length > limit && ` 중 ${limit}개 표시`}
          </p>

          <ItemList items={filtered.slice(0, limit)} />

          {filtered.length > limit && (
            <button className="more" type="button" onClick={() => setLimit((n) => n + PAGE_SIZE)}>
              더 보기
            </button>
          )}
        </>
      )}
    </>
  );
}
