'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { WORD_SETS, getWordsBySet, type WordSetKey } from '@/shared/lib/words';
import { getActiveSet, setActiveSet } from '@/shared/lib/active-set';
import { loadStudyState } from '@/shared/lib/study-storage';

interface SetStats {
  total: number;
  seen: number;
  ok: number;
  hard: number;
}

function getStats(set: string): SetStats {
  const total = getWordsBySet(set).length;
  const state = loadStudyState(set);
  if (!state) return { total, seen: 0, ok: 0, hard: 0 };
  return {
    total,
    seen: state.seenSet.length,
    ok:   state.okSet.length,
    hard: state.hardSet.length,
  };
}

export default function SetSelector() {
  const router = useRouter();
  const [activeSet, setActive] = useState<WordSetKey | null>(null);

  useEffect(() => {
    setActive(getActiveSet());
  }, []);

  function pick(key: WordSetKey) {
    setActiveSet(key);
    router.push('/study');
  }

  const setList = Object.values(WORD_SETS);

  return (
    <div className="w-full max-w-2xl flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Chọn bộ đề</h1>
        <p className="text-sm text-gray-400 mt-1">Chọn bộ từ vựng bạn muốn ôn thi</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {setList.map((s) => {
          const stats   = getStats(s.key);
          const pctDone = stats.total > 0 ? Math.round((stats.ok / stats.total) * 100) : 0;
          const isActive = activeSet === s.key;

          return (
            <button
              key={s.key}
              onClick={() => pick(s.key as WordSetKey)}
              className={`text-left p-6 rounded-2xl border-2 shadow-sm transition-all hover:shadow-md active:scale-[0.98] ${
                isActive
                  ? 'border-[#534AB7] bg-[#EAE8F9]'
                  : 'border-gray-200 bg-white hover:border-[#534AB7]'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-base font-extrabold text-gray-900">{s.label}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{s.count} từ vựng</div>
                </div>
                {isActive && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#534AB7] text-white">
                    Đang học
                  </span>
                )}
              </div>

              {/* Progress bar */}
              <div className="mb-2">
                <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                  <span>Nhớ rồi</span>
                  <span>{pctDone}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#9FE1CB] rounded-full transition-all duration-500"
                    style={{ width: `${pctDone}%` }}
                  />
                </div>
              </div>

              {/* Mini stats */}
              <div className="flex gap-3 mt-3">
                {[
                  { val: stats.ok,   lbl: 'Nhớ',   cls: 'text-[#085041]' },
                  { val: stats.hard, lbl: 'Khó',   cls: 'text-[#712B13]' },
                  { val: stats.total - stats.seen, lbl: 'Chưa xem', cls: 'text-gray-400' },
                ].map(({ val, lbl, cls }) => (
                  <div key={lbl} className="text-center">
                    <div className={`text-sm font-bold ${cls}`}>{val}</div>
                    <div className="text-[10px] text-gray-400">{lbl}</div>
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-xs text-gray-400 text-center">
        Bộ đề mới sẽ được thêm vào khi có dữ liệu
      </p>
    </div>
  );
}
