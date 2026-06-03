'use client';

import { useEffect, useState } from 'react';
import { words } from '@/shared/lib/words';
import { loadStudyState } from '@/shared/lib/study-storage';
import type { QuizMode } from '../hooks/useQuiz';

interface Props {
  onStart: (mode: QuizMode, count: number) => void;
}

function getHardCount(): number {
  return loadStudyState()?.hardSet.length ?? 0;
}

export default function SetupScreen({ onStart }: Props) {
  const [mode, setMode]   = useState<QuizMode>('all');
  const [count, setCount] = useState(20);
  const [hardCount, setHardCount] = useState(0);
  const maxCount  = mode === 'hard' ? hardCount : words.length;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHardCount(getHardCount());
  }, []);

  return (
    <div className="w-full max-w-md md:max-w-xl bg-white rounded-2xl shadow-md p-8 md:p-10 flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-extrabold text-gray-900">Quiz Mode</h1>
        <p className="text-sm text-gray-400 mt-1">Trắc nghiệm 4 đáp án — kiểm tra recall thực sự</p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Bộ từ</label>
        <div className="grid grid-cols-2 gap-2">
          {([['all', 'Tất cả 80 từ'], ['hard', `Từ khó (${hardCount})`]] as const).map(([m, label]) => (
            <button
              key={m}
              onClick={() => { setMode(m); setCount(Math.min(count, m === 'hard' ? hardCount : words.length)); }}
              disabled={m === 'hard' && hardCount === 0}
              className={`py-3 rounded-xl text-sm font-bold border-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                mode === m ? 'border-[#534AB7] bg-[#EAE8F9] text-[#534AB7]' : 'border-gray-200 text-gray-500 hover:border-[#534AB7] hover:text-[#534AB7]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Số câu: <span className="text-[#534AB7]">{count}</span>
        </label>
        <input type="range" min={5} max={maxCount} step={5}
          value={Math.min(count, maxCount)}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-full accent-[#534AB7]"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>5</span><span>{maxCount}</span>
        </div>
      </div>

      <button
        onClick={() => onStart(mode, Math.min(count, maxCount))}
        disabled={mode === 'hard' && hardCount === 0}
        className="w-full py-3.5 rounded-xl bg-[#534AB7] text-white font-bold text-base hover:bg-[#443fa0] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Bắt đầu Quiz
      </button>
    </div>
  );
}
