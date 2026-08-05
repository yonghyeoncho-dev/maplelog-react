import { useState } from 'react';
import type { Item } from './types/item';
import itemsData from './data/items.json';
import SearchBar from './components/SearchBar';
import ItemList from './components/ItemList';
import './App.css';

const items = itemsData as Item[];

export default function App() {
  // [useState] 원본에서 직접 관리하던 "상태 객체 + 화면 갱신 호출"을 대신한다.
  // setKeyword를 부르면 React가 App을 다시 실행하고, 아래 filtered가 새로 계산되어 화면이 갱신된다.
  const [keyword, setKeyword] = useState('');
  const [job, setJob] = useState<Item['job'] | '전체'>('전체');

  // 필터 결과는 별도 상태로 두지 않는다 — keyword/job에서 항상 계산해 낼 수 있는 값이기 때문.
  // 상태를 두 벌 관리하면 둘이 어긋나는 순간 버그가 된다. (원본에서 겪은 문제)
  const filtered = items.filter((item) => {
    const matchKeyword = item.name.includes(keyword.trim());
    const matchJob = job === '전체' || item.job === job;
    return matchKeyword && matchJob;
  });

  return (
    <main className="app">
      <header className="app__head">
        <h1>아이템 DB</h1>
        <p>
          <a href="https://maplelog.gg" target="_blank" rel="noreferrer">maplelog.gg</a>
          의 아이템 조회 화면을 React + TypeScript로 리빌드하는 중입니다.
        </p>
      </header>

      <SearchBar
        keyword={keyword}
        onKeywordChange={setKeyword}
        job={job}
        onJobChange={setJob}
      />

      <p className="count">{filtered.length}개</p>
      <ItemList items={filtered} />
    </main>
  );
}
