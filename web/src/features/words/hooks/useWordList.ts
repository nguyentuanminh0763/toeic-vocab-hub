'use client';

import { useState, useCallback } from 'react';
import { words, getWordsBySet, DEFAULT_SET } from '@/shared/lib/words';

export const FORM_COLORS: Record<string, string> = {
  noun:           'bg-blue-50 text-blue-700',
  verb:           'bg-green-50 text-green-700',
  adjective:      'bg-yellow-50 text-yellow-700',
  'verb / noun':  'bg-purple-50 text-purple-700',
  'noun / adj':   'bg-orange-50 text-orange-700',
  'phrasal verb': 'bg-teal-50 text-teal-700',
  idiom:          'bg-pink-50 text-pink-700',
};

export function formColor(form: string) {
  return FORM_COLORS[form.toLowerCase()] ?? 'bg-gray-100 text-gray-600';
}

export function useWordList(set: string = DEFAULT_SET) {
  const deckWords = getWordsBySet(set);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const forms = ['all', ...Array.from(new Set(deckWords.map((w) => w.wordForm))).sort()];

  const filtered = deckWords.filter((w) => {
    const q = search.toLowerCase();
    const matchSearch = !q || w.word.toLowerCase().includes(q) || w.meaning.toLowerCase().includes(q);
    const matchFilter = filter === 'all' || w.wordForm === filter;
    return matchSearch && matchFilter;
  });

  const speak = useCallback((word: string) => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(word);
    utt.rate = 0.85;
    utt.lang = 'en-US';
    window.speechSynthesis.speak(utt);
  }, []);

  return { search, setSearch, filter, setFilter, forms, filtered, speak, total: deckWords.length };
}
