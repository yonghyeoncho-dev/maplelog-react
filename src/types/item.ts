// 아이템 1개의 모양(shape)을 정의한다.
// 원본 maplelog에서는 Firestore 문서 구조를 주석과 머릿속으로만 관리했지만,
// TypeScript에서는 타입으로 못 박아두면 오타·필드 누락을 에디터가 먼저 잡아준다.
export type Item = {
  id: number;
  name: string;
  category: '무기' | '모자' | '상의' | '하의' | '장갑' | '신발' | '망토';
  job: '전사' | '마법사' | '궁수' | '도적' | '공용';
  reqLevel: number;
  str: number;
  dex: number;
  int: number;
  luk: number;
  attack: number;
};
