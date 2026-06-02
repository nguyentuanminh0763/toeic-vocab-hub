export type WordStatus = 'ok' | 'hard' | 'unseen';

export interface StudyState {
  okSet: number[];
  hardSet: number[];
  seenSet: number[];
  currentIdx: number;
  isHardMode: boolean;
  deck: number[];
}
