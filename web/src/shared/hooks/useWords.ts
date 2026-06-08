'use client';

import { useState, useEffect } from 'react';
import { getWordsBySet } from '@/shared/lib/words';
import type { Word } from '@/shared/lib/words';
import { fetchWords, clearWordsCache } from '@/services/words.api';

const cache = new Map<string, Word[]>();

// Registry of reload callbacks — keyed by set
const reloadListeners = new Map<string, Set<() => void>>();

export function invalidateWordsCache(set: string) {
  cache.delete(set);
  clearWordsCache(set);
}

// Gọi từ bên ngoài hook để force re-fetch tất cả useWords(set) đang mounted
export function reloadWords(set: string) {
  invalidateWordsCache(set);
  reloadListeners.get(set)?.forEach((fn) => fn());
}

// Xóa toàn bộ cache khi logout — tránh lộ private words của user cũ
export function clearAllWordsCache() {
  cache.clear();
}

async function loadFromApi(set: string, setWords: (w: Word[]) => void) {
  const words = await fetchWords(set);
  if (words.length > 0) {
    cache.set(set, words);
    setWords(words);
  }
}

export function useWords(set: string): Word[] {
  const [words, setWords] = useState<Word[]>(() =>
    cache.get(set) ?? getWordsBySet(set),
  );

  useEffect(() => {
    // Đảm bảo state sync với cache
    if (cache.has(set)) {
      setWords(cache.get(set)!);
    } else {
      loadFromApi(set, setWords);
    }

    // Đăng ký reload listener
    const reload = () => loadFromApi(set, setWords);
    if (!reloadListeners.has(set)) reloadListeners.set(set, new Set());
    reloadListeners.get(set)!.add(reload);

    return () => {
      reloadListeners.get(set)?.delete(reload);
    };
  }, [set]);

  return words;
}
