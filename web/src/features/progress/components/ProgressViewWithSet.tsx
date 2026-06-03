'use client';

import { useEffect, useState } from 'react';
import { getActiveSet } from '@/shared/lib/active-set';
import { DEFAULT_SET } from '@/shared/lib/words';
import ProgressView from './ProgressView';

export default function ProgressViewWithSet() {
  const [set, setSet] = useState(DEFAULT_SET);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSet(getActiveSet());
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <ProgressView set={set} />;
}
