import { useEffect, useState } from 'react';
import type { Item } from '../types/item';

// [어떤 파일을 읽는가]
// 저장소에는 부위·레벨을 고르게 추린 샘플(items.json)만 커밋한다.
// 전체 데이터는 저장소에 올리지 않고 로컬·배포 환경에만 두며,
// .env.local 에 VITE_ITEMS_FILE=items.full.json 을 넣어 그쪽을 바라보게 한다.
// (.env.local 은 .gitignore의 *.local 규칙으로 이미 제외된다)
// 파일 존재 여부로 분기하지 않고 환경변수로 정한 이유: 분기 방식이면
// 샘플만 있는 환경에서 매번 404가 한 번 찍힌다.
const ITEMS_FILE = import.meta.env.VITE_ITEMS_FILE ?? 'items.json';

// [왜 import가 아니라 fetch인가]
// 아이템 데이터가 약 570KB다. import로 가져오면 번들에 통째로 들어가서
// 첫 화면이 뜨기 전에 전부 내려받아야 한다. public/items.json으로 빼고 fetch하면
// 화면 뼈대를 먼저 그리고 데이터는 뒤따라오게 할 수 있다.
//
// [모듈 캐시]
// 목록 → 상세 → 목록으로 오갈 때마다 570KB를 다시 받으면 안 되므로
// 한 번 받은 결과를 모듈 스코프에 보관한다. 컴포넌트가 사라져도 이 값은 남는다.
// 라이브러리 없이 쓰는 가장 단순한 형태의 캐시다.
let cache: Item[] | null = null;
let inflight: Promise<Item[]> | null = null;

function loadItems(): Promise<Item[]> {
  if (cache) return Promise.resolve(cache);
  // 두 화면이 동시에 요청해도 네트워크 요청은 한 번만 나가게 한다.
  if (!inflight) {
    inflight = fetch(`${import.meta.env.BASE_URL}${ITEMS_FILE}`)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        return res.json() as Promise<Item[]>;
      })
      .then((data) => {
        // 목록의 첫 화면이 무엇으로 시작하는지가 곧 첫인상이다.
        // 원본 순서대로 두면 스탯이 없는 세트장비가 앞에 몰려 빈 카드가 먼저 보인다.
        // 저레벨부터 올라가는 순서가 게임에서 아이템을 만나는 순서와도 맞다.
        // 정렬은 받아온 직후 한 번만 하고 캐시에 담는다 — 렌더마다 2,600건을 다시 정렬할 이유가 없다.
        data.sort((a, b) => a.reqLevel - b.reqLevel || a.name.localeCompare(b.name, 'ko'));
        cache = data;
        return data;
      })
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

export type ItemsState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; items: Item[] };

export function useItems(): ItemsState {
  const [state, setState] = useState<ItemsState>(
    cache ? { status: 'ready', items: cache } : { status: 'loading' },
  );

  useEffect(() => {
    if (cache) return;

    // 응답이 늦게 도착했을 때 이미 사라진 컴포넌트의 상태를 건드리지 않도록 막는다.
    let alive = true;
    loadItems()
      .then((items) => { if (alive) setState({ status: 'ready', items }); })
      .catch((err: unknown) => {
        if (alive) {
          setState({
            status: 'error',
            message: err instanceof Error ? err.message : '알 수 없는 오류',
          });
        }
      });

    return () => { alive = false; };
  }, []);

  return state;
}

export function findItem(items: Item[], code: number): Item | undefined {
  return items.find((item) => item.code === code);
}
