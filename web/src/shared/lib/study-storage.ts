import type { StudyState } from '@/shared/types/study';
import { getWordsBySet } from './words';

const LEGACY_KEY = 'toeic_test1_progress_v2';

export function getStorageKey(set: string): string {
  return `toeic_progress_${set}`;
}

export function loadStudyState(set: string): StudyState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(getStorageKey(set));
    if (raw) return JSON.parse(raw) as StudyState;

    // Migrate từ key cũ (Test 1 only)
    if (set === 'ETS_2026_TEST1') {
      const legacy = localStorage.getItem(LEGACY_KEY);
      if (legacy) {
        localStorage.setItem(getStorageKey(set), legacy);
        return JSON.parse(legacy) as StudyState;
      }
    }
    return null;
  } catch {
    return null;
  }
}

export function saveStudyState(s: StudyState, set: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(getStorageKey(set), JSON.stringify(s));
}

export function defaultStudyState(set: string): StudyState {
  return {
    okSet: [],
    hardSet: [],
    seenSet: [],
    currentIdx: 0,
    isHardMode: false,
    deck: getWordsBySet(set).map((w) => w.id),
  };
}
