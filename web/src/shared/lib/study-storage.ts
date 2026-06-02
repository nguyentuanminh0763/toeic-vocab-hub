import type { StudyState } from '@/shared/types/study';
import { words } from './words';

export const STORAGE_KEY = 'toeic_test1_progress_v2';

export function loadStudyState(): StudyState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StudyState) : null;
  } catch {
    return null;
  }
}

export function saveStudyState(s: StudyState) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

export function defaultStudyState(): StudyState {
  return {
    okSet: [],
    hardSet: [],
    seenSet: [],
    currentIdx: 0,
    isHardMode: false,
    deck: words.map((w) => w.id),
  };
}
