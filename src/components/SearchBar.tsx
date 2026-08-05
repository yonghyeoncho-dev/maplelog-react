import { useEffect, useRef, useState } from 'react';
import type { ItemGroup, JobClass } from '../types/item';
import { GROUPS, JOBS } from '../types/item';

export type GroupFilter = ItemGroup | '전체';
export type JobFilter = JobClass | '공용' | '전체';

type Props = {
  keyword: string;
  onKeywordChange: (value: string) => void;
  group: GroupFilter;
  onGroupChange: (value: GroupFilter) => void;
  job: JobFilter;
  onJobChange: (value: JobFilter) => void;
};

const GROUP_OPTIONS: GroupFilter[] = ['전체', ...GROUPS];
const JOB_OPTIONS: JobFilter[] = ['전체', ...JOBS, '공용'];

export default function SearchBar({
  keyword, onKeywordChange, group, onGroupChange, job, onJobChange,
}: Props) {
  // [왜 입력값을 여기서 따로 들고 있나]
  // 부모는 검색어를 URL 쿼리에 보관한다. 그런데 React Router의 주소 변경은
  // 지연 렌더링(transition)으로 처리되어, 한글을 조합하는 도중에 뒤늦게 이전 값이
  // input에 다시 써지는 일이 생긴다. 브라우저는 입력값이 밖에서 바뀌면 조합을 끊으므로
  // "장갑"을 치면 "ㅈ자장ㄱ가갑"처럼 조합 중간값이 전부 확정되어 쌓인다.
  //
  // 그래서 input이 보여줄 값(draft)은 이 컴포넌트가 동기적으로 들고,
  // URL 반영은 조합이 끝난 뒤에만 부모에게 넘긴다.
  // 영어는 조합 과정이 없어 이 문제가 드러나지 않는다 — 한글·일본어·중국어에서만 발생한다.
  const [draft, setDraft] = useState(keyword);

  // 조합 여부는 화면에 그릴 값이 아니라 판단에만 쓰므로 state가 아닌 ref를 쓴다.
  // state로 두면 조합 시작·종료마다 불필요한 렌더가 한 번씩 더 일어난다.
  const isComposing = useRef(false);

  // 뒤로가기·주소 직접 입력처럼 밖에서 검색어가 바뀐 경우 입력창을 맞춰준다.
  // 조합 중일 때는 건드리지 않는다 — 그게 위에서 말한 조합 끊김의 원인이기 때문.
  useEffect(() => {
    if (!isComposing.current) setDraft(keyword);
  }, [keyword]);

  const handleChange = (value: string) => {
    setDraft(value);
    if (!isComposing.current) onKeywordChange(value);
  };

  return (
    <div className="search-bar">
      <input
        type="search"
        value={draft}
        placeholder="아이템 이름 검색 (한글 · 영문)"
        onChange={(e) => handleChange(e.target.value)}
        onCompositionStart={() => { isComposing.current = true; }}
        onCompositionEnd={(e) => {
          isComposing.current = false;
          onKeywordChange(e.currentTarget.value);
        }}
        aria-label="아이템 이름 검색"
      />
      <select
        value={group}
        onChange={(e) => onGroupChange(e.target.value as GroupFilter)}
        aria-label="부위 필터"
      >
        {GROUP_OPTIONS.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>
      <select
        value={job}
        onChange={(e) => onJobChange(e.target.value as JobFilter)}
        aria-label="직업 필터"
      >
        {JOB_OPTIONS.map((j) => (
          <option key={j} value={j}>{j}</option>
        ))}
      </select>
    </div>
  );
}
