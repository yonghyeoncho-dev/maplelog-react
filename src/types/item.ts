// maplelog.gg의 실제 아이템 데이터 구조를 그대로 옮긴 타입.
// 원본은 게임 클라이언트 리소스에서 추출해 만든 배열 형식([코드, 한글명, 영문명, 레벨, 스탯객체])이고,
// 이 저장소에서는 화면에서 쓰기 좋도록 객체로 펼쳐 두었다.

export type JobClass = '전사' | '마법사' | '궁수' | '도적' | '해적';
export type ItemGroup = '무기' | '방어구' | '장신구' | '기타';

/** 착용 요구 능력치 */
export type RequirementKey = 'str' | 'dex' | 'int' | 'luk' | 'pop';
export type Requirement = Partial<Record<RequirementKey, number>>;

/** 아이템이 올려주는 능력치 */
export type StatKey =
  | 'pad' | 'mad' | 'pdd' | 'mdd' | 'mhp' | 'mmp'
  | 'str' | 'dex' | 'int' | 'luk'
  | 'acc' | 'eva' | 'speed' | 'jump';
export type Stats = Partial<Record<StatKey, number>>;

export type Item = {
  /** 게임 내 아이템 코드. 앞 3자리가 부위를 결정한다 (100 모자, 140 두손검 ...) */
  code: number;
  name: string;
  /** 영문명 — 검색용. 원본에 없으면 빈 문자열 */
  nameEn: string;
  group: ItemGroup;
  /** 세부 부위 (모자, 두손검, 아대 ...) */
  type: string;
  reqLevel: number;
  /** 빈 배열이면 전 직업 공용 */
  jobs: JobClass[];
  req?: Requirement;
  stats?: Stats;
  /** 낮을수록 빠르다 */
  attackSpeed?: number;
  /** 업그레이드(주문서) 가능 횟수 */
  upgrades?: number;
  price?: number;
};

export const REQUIREMENT_LABELS: Record<RequirementKey, string> = {
  str: 'STR', dex: 'DEX', int: 'INT', luk: 'LUK', pop: '인기도',
};

export const STAT_LABELS: Record<StatKey, string> = {
  pad: '공격력', mad: '마력', pdd: '물리방어', mdd: '마법방어',
  mhp: 'HP', mmp: 'MP',
  str: 'STR', dex: 'DEX', int: 'INT', luk: 'LUK',
  acc: '명중률', eva: '회피율', speed: '이동속도', jump: '점프력',
};

/** 카드에서 보여줄 우선순위. 공격력·마력을 먼저 노출한다. */
export const STAT_ORDER: StatKey[] = [
  'pad', 'mad', 'str', 'dex', 'int', 'luk',
  'pdd', 'mdd', 'mhp', 'mmp', 'acc', 'eva', 'speed', 'jump',
];

export const GROUPS: ItemGroup[] = ['무기', '방어구', '장신구', '기타'];
export const JOBS: JobClass[] = ['전사', '마법사', '궁수', '도적', '해적'];
