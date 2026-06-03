export interface StudySession {
  id: string;
  setName: string;
  date: string;       // ISO string
  total: number;
  ok: number;
  hard: number;
  okIds: number[];
  hardIds: number[];
  isHardMode: boolean;
}
