import type { Item } from '../types/item';
import raw from './items.json';

// json import는 타입이 넓게(string) 잡히므로 여기서 한 번만 Item[]으로 못 박는다.
// 이 파일이 데이터 접근의 유일한 창구가 되면, 나중에 Firestore 페칭으로 바꿀 때
// 화면 코드는 건드리지 않고 이 파일만 고치면 된다.
// (원본 maplelog에서는 데이터 접근이 화면 곳곳에 흩어져 있어
//  스키마를 바꿀 때마다 전부 찾아다녀야 했다.)
export const items = raw as Item[];

export function findItem(id: number): Item | undefined {
  return items.find((item) => item.id === id);
}
