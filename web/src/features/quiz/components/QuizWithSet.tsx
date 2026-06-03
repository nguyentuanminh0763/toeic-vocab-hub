'use client';

import { useEffect, useState } from 'react';
import { getActiveSet } from '@/shared/lib/active-set';
import { DEFAULT_SET } from '@/shared/lib/words';
import Quiz from './Quiz';

export default function QuizWithSet() {
  const [set, setSet] = useState(DEFAULT_SET);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSet(getActiveSet());
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <Quiz set={set} />;
}
