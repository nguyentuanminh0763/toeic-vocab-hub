'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_SET } from '@/shared/lib/words';
import { useWords } from '@/shared/hooks/useWords';
import { loadStudyState, saveStudyState, defaultStudyState } from '@/shared/lib/study-storage';
import type { StudyState } from '@/shared/types/study';

export interface ProgressStats {
  total: number;
  seen: number;
  ok: number;
  hard: number;
  unseen: number;
  pctSeen: number;
  pctOk: number;
  pctHard: number;
  pctUnseen: number;
}

export function useProgress(set: string = DEFAULT_SET) {
  const deckWords = useWords(set);
  const [state, setState] = useState<StudyState | null>(null);

  useEffect(() => {
    setState(loadStudyState(set) ?? defaultStudyState(set, deckWords.map((w) => w.id)));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [set]);

  const stats: ProgressStats | null = state
    ? (() => {
        const total  = deckWords.length;
        const seen   = state.seenSet.length;
        const ok     = state.okSet.length;
        const hard   = state.hardSet.length;
        const unseen = total - seen;
        const pct = (n: number) => (total > 0 ? Math.round((n / total) * 100) : 0);
        return { total, seen, ok, hard, unseen, pctSeen: pct(seen), pctOk: pct(ok), pctHard: pct(hard), pctUnseen: pct(unseen) };
      })()
    : null;

  const hardWords = state ? deckWords.filter((w) => state.hardSet.includes(w.id)) : [];

  function resetProgress() {
    const fresh = defaultStudyState(set, deckWords.map((w) => w.id));
    saveStudyState(fresh, set);
    setState(fresh);
  }

  return { state, stats, hardWords, resetProgress };
}
