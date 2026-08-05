import type { Item } from '../types/item';

type Props = {
  keyword: string;
  onKeywordChange: (value: string) => void;
  job: Item['job'] | '전체';
  onJobChange: (value: Item['job'] | '전체') => void;
};

const JOBS: (Item['job'] | '전체')[] = ['전체', '전사', '마법사', '궁수', '도적', '공용'];

// [제어 컴포넌트] 입력값을 이 컴포넌트가 자기 안에 들고 있지 않고, 부모(App)의 상태를 받아서 표시만 한다.
// 값이 바뀌면 onKeywordChange로 부모에게 알리고, 부모가 상태를 바꾸면 그 값이 다시 내려온다.
// 원본 maplelog에서는 input에 이벤트를 걸고 직접 DOM을 다시 그렸지만,
// 여기서는 "상태를 바꾸면 화면은 알아서 따라온다"가 규칙이다.
export default function SearchBar({ keyword, onKeywordChange, job, onJobChange }: Props) {
  return (
    <div className="search-bar">
      <input
        type="search"
        value={keyword}
        placeholder="아이템 이름 검색"
        onChange={(e) => onKeywordChange(e.target.value)}
        aria-label="아이템 이름 검색"
      />
      <select
        value={job}
        onChange={(e) => onJobChange(e.target.value as Item['job'] | '전체')}
        aria-label="직업 필터"
      >
        {JOBS.map((j) => (
          <option key={j} value={j}>{j}</option>
        ))}
      </select>
    </div>
  );
}
