import { DEFAULT_SET, WORD_SETS, type WordSetKey } from './words';

const ACTIVE_SET_KEY = 'toeic_active_set';

export function getActiveSet(): WordSetKey {
  if (typeof window === 'undefined') return DEFAULT_SET;
  const stored = localStorage.getItem(ACTIVE_SET_KEY);
  if (stored && stored in WORD_SETS) return stored as WordSetKey;
  return DEFAULT_SET;
}

export function setActiveSet(set: WordSetKey): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACTIVE_SET_KEY, set);
}
