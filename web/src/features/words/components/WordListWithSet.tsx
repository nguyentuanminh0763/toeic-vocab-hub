'use client';

import { useEffect, useState } from 'react';
import { getActiveSet } from '@/shared/lib/active-set';
import { DEFAULT_SET } from '@/shared/lib/words';
import WordList from './WordList';

export default function WordListWithSet() {
  const [set, setSet] = useState(DEFAULT_SET);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSet(getActiveSet());
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <WordList set={set} />;
}
