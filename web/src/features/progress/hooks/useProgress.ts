'use client';

import { useEffect, useState } from 'react';
import { words } from '@/shared/lib/words';
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

export function useProgress() {
  const [state, setState] = useState<StudyState | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(loadStudyState() ?? defaultStudyState());
  }, []);

  const stats: ProgressStats | null = state
    ? (() => {
        const total  = words.length;
        const seen   = state.seenSet.length;
        const ok     = state.okSet.length;
        const hard   = state.hardSet.length;
        const unseen = total - seen;
        const pct = (n: number) => (total > 0 ? Math.round((n / total) * 100) : 0);
        return { total, seen, ok, hard, unseen, pctSeen: pct(seen), pctOk: pct(ok), pctHard: pct(hard), pctUnseen: pct(unseen) };
      })()
    : null;

  const hardWords = state ? words.filter((w) => state.hardSet.includes(w.id)) : [];

  function resetProgress() {
    const fresh = defaultStudyState();
    saveStudyState(fresh);
    setState(fresh);
  }

  return { state, stats, hardWords, resetProgress };
}
