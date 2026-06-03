'use client';

import { getWordsBySet, DEFAULT_SET, WORD_SETS } from '@/shared/lib/words';
import { useFlashcard } from '../hooks/useFlashcard';

const SpeakIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
  </svg>
);

export default function Flashcard({ set = DEFAULT_SET }: { set?: string }) {
  const { state, isFlipped, mounted, currentWord, isDone, speak, flip, mark, skip, prev, restartAll, startHardMode, toggleMode } = useFlashcard(set);
  const setLabel = WORD_SETS[set as keyof typeof WORD_SETS]?.label ?? set;

  if (!mounted) return null;

  const total = state.deck.length;
  const pos   = Math.min(state.currentIdx + 1, total);
  const pct   = total > 0 ? Math.round((state.seenSet.length / total) * 100) : 0;

  if (isDone || !currentWord) {
    return (
      <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-10 text-center">
        <div className="text-5xl mb-1">&#127881;</div>
        <h2 className="text-2xl font-extrabold text-gray-900">
          {state.isHardMode ? 'Xong phần ôn từ khó!' : 'Hoàn thành!'}
        </h2>
        <p className="text-sm text-gray-500">
          {state.isHardMode
            ? `Bạn đã xem qua ${total} từ cần ôn.`
            : `Bạn đã xem qua tất cả ${getWordsBySet(DEFAULT_SET).length} từ vựng.`}
        </p>
        <div className="flex gap-4 w-full my-2">
          <div className="flex-1 bg-[#E1F5EE] text-[#085041] rounded-xl p-4 font-bold">
            <div className="text-3xl">{state.okSet.length}</div>
            <div className="text-xs mt-1 opacity-80">Nhớ rồi</div>
          </div>
          <div className="flex-1 bg-[#FAECE7] text-[#712B13] rounded-xl p-4 font-bold">
            <div className="text-3xl">{state.hardSet.length}</div>
            <div className="text-xs mt-1 opacity-80">Cần ôn</div>
          </div>
        </div>
        <button onClick={restartAll} className="w-full py-3.5 rounded-xl bg-[#534AB7] text-white font-bold text-base hover:bg-[#443fa0] transition-colors">
          Học lại từ đầu
        </button>
        <button
          onClick={startHardMode}
          disabled={state.hardSet.length === 0}
          className="w-full py-3.5 rounded-xl border-2 border-[#712B13] bg-[#FAECE7] text-[#712B13] font-bold text-base disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-80 transition-opacity"
        >
          Ôn lại từ khó ({state.hardSet.length})
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl flex flex-col md:flex-row md:items-start md:gap-8">

      {/* ── LEFT: Card area ─────────────────────────────── */}
      <div className="flex flex-col gap-3 flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-bold text-[#534AB7] tracking-tight">{setLabel}</h1>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full md:hidden ${state.isHardMode ? 'bg-[#FAECE7] text-[#712B13]' : 'bg-[#EAE8F9] text-[#534AB7]'}`}>
            {state.isHardMode ? 'Ôn từ khó' : 'Tất cả'}
          </span>
        </div>

        {/* Stats — mobile only */}
        <div className="grid grid-cols-4 gap-2 md:hidden">
          {[
            { val: total,                lbl: 'Tổng',    cls: 'text-[#534AB7]' },
            { val: state.seenSet.length, lbl: 'Đã xem',  cls: 'text-[#534AB7]' },
            { val: state.okSet.length,   lbl: 'Nhớ rồi', cls: 'text-[#085041]' },
            { val: state.hardSet.length, lbl: 'Cần ôn',  cls: 'text-[#712B13]' },
          ].map(({ val, lbl, cls }) => (
            <div key={lbl} className="bg-white rounded-xl py-2 text-center shadow-sm">
              <div className={`text-lg font-bold ${cls}`}>{val}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">{lbl}</div>
            </div>
          ))}
        </div>

        {/* Progress bar — mobile only */}
        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden md:hidden">
          <div className="h-full bg-[#534AB7] rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>

        {/* Card */}
        <div className="w-full [perspective:1200px]" onClick={flip} style={{ cursor: 'pointer' }}>
          <div className={`relative w-full min-h-[300px] md:min-h-[380px] [transform-style:preserve-3d] transition-transform duration-[450ms] ease-in-out ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
            {/* Front */}
            <div className="absolute inset-0 [backface-visibility:hidden] bg-white rounded-2xl shadow-md p-7 md:p-10 flex flex-col">
              <div className="text-xs text-gray-400 mb-3">{pos} / {total}</div>
              <div className="flex items-start gap-3 mb-2">
                <div className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight flex-1">{currentWord.word}</div>
                <button className="shrink-0 w-10 h-10 rounded-full bg-[#534AB7] text-white flex items-center justify-center mt-1 hover:bg-[#443fa0] active:scale-95 transition-all"
                  onClick={(e) => { e.stopPropagation(); speak(); }} title="Phát âm (R)">
                  <SpeakIcon />
                </button>
              </div>
              <div className="text-sm text-gray-500 italic mb-2">{currentWord.ipa}</div>
              <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-[#EAE8F9] text-[#534AB7] w-fit">{currentWord.wordForm}</span>
              <div className="mt-auto text-center text-xs text-gray-400 opacity-70 pt-4 border-t border-dashed border-gray-200">
                Nhấn thẻ để xem nghĩa &nbsp;·&nbsp; <kbd className="bg-gray-100 border border-gray-200 rounded px-1 font-mono">Space</kbd>
              </div>
            </div>
            {/* Back */}
            <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white border-2 border-[#9FE1CB] rounded-2xl shadow-md p-7 md:p-10 flex flex-col">
              <div className="text-xs text-gray-400 mb-3">{pos} / {total}</div>
              <div className="flex items-start gap-3 mb-2">
                <div className="text-2xl md:text-3xl font-extrabold text-gray-900 flex-1">{currentWord.word}</div>
                <button className="shrink-0 w-10 h-10 rounded-full bg-[#534AB7] text-white flex items-center justify-center hover:bg-[#443fa0] active:scale-95 transition-all"
                  onClick={(e) => { e.stopPropagation(); speak(); }}>
                  <SpeakIcon />
                </button>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-[#085041] mb-3">{currentWord.meaning}</div>
              <div className="text-sm md:text-base text-gray-500 italic flex-1 leading-relaxed">&ldquo;{currentWord.example}&rdquo;</div>
              <div className="grid grid-cols-2 gap-2.5 mt-5">
                <button onClick={(e) => { e.stopPropagation(); mark('hard'); }}
                  className="py-3 rounded-xl bg-[#FAECE7] text-[#712B13] font-bold text-sm active:scale-95 transition-transform">
                  &#10007; Cần ôn
                </button>
                <button onClick={(e) => { e.stopPropagation(); mark('ok'); }}
                  className="py-3 rounded-xl bg-[#E1F5EE] text-[#085041] font-bold text-sm active:scale-95 transition-transform">
                  &#10003; Nhớ rồi
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Nav buttons */}
        <div className="flex gap-2">
          <button onClick={prev} className="flex-1 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-500 text-sm font-semibold hover:border-[#534AB7] hover:text-[#534AB7] transition-colors">
            &#8592; Trước
          </button>
          <button onClick={skip} className="flex-1 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-500 text-sm font-semibold hover:border-[#534AB7] hover:text-[#534AB7] transition-colors">
            Bỏ qua &#8594;
          </button>
          <button onClick={toggleMode} className="px-4 py-2.5 rounded-xl bg-[#534AB7] text-white text-sm font-semibold hover:bg-[#443fa0] transition-colors whitespace-nowrap md:hidden">
            {state.isHardMode ? 'Học tất cả' : 'Ôn từ khó'}
          </button>
        </div>

        {/* Keyboard hint — mobile */}
        <p className="text-[11px] text-gray-400 text-center opacity-60 md:hidden">
          <kbd className="bg-white border border-gray-200 rounded px-1 font-mono mx-0.5">Space</kbd> lật &nbsp;
          <kbd className="bg-white border border-gray-200 rounded px-1 font-mono mx-0.5">&#8592;</kbd> Cần ôn &nbsp;
          <kbd className="bg-white border border-gray-200 rounded px-1 font-mono mx-0.5">&#8594;</kbd> Nhớ rồi &nbsp;
          <kbd className="bg-white border border-gray-200 rounded px-1 font-mono mx-0.5">R</kbd> phát âm
        </p>
      </div>

      {/* ── RIGHT: Sidebar — desktop only ───────────────── */}
      <div className="hidden md:flex flex-col gap-4 w-72 shrink-0">
        {/* Mode badge */}
        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full text-center ${state.isHardMode ? 'bg-[#FAECE7] text-[#712B13]' : 'bg-[#EAE8F9] text-[#534AB7]'}`}>
          {state.isHardMode ? 'Ôn từ khó' : 'Tất cả từ'}
        </span>

        {/* Stats */}
        <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-3">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Tiến độ</div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { val: total,                lbl: 'Tổng',    cls: 'text-[#534AB7]', bg: 'bg-[#EAE8F9]' },
              { val: state.seenSet.length, lbl: 'Đã xem',  cls: 'text-[#534AB7]', bg: 'bg-[#EAE8F9]' },
              { val: state.okSet.length,   lbl: 'Nhớ rồi', cls: 'text-[#085041]', bg: 'bg-[#E1F5EE]' },
              { val: state.hardSet.length, lbl: 'Cần ôn',  cls: 'text-[#712B13]', bg: 'bg-[#FAECE7]' },
            ].map(({ val, lbl, cls, bg }) => (
              <div key={lbl} className={`${bg} rounded-xl py-3 text-center`}>
                <div className={`text-2xl font-extrabold ${cls}`}>{val}</div>
                <div className="text-[11px] text-gray-500 mt-0.5">{lbl}</div>
              </div>
            ))}
          </div>
          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Đã xem</span><span>{pct}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#534AB7] rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>

        {/* Mode toggle */}
        <button onClick={toggleMode} className="w-full py-3 rounded-xl bg-[#534AB7] text-white text-sm font-semibold hover:bg-[#443fa0] transition-colors">
          {state.isHardMode ? 'Học tất cả' : 'Ôn từ khó'}
        </button>

        {/* Keyboard hints */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Phím tắt</div>
          <div className="flex flex-col gap-2 text-xs text-gray-500">
            {[
              ['Space', 'Lật thẻ'],
              ['←', 'Cần ôn'],
              ['→', 'Nhớ rồi'],
              ['R', 'Phát âm'],
            ].map(([key, desc]) => (
              <div key={key} className="flex items-center justify-between">
                <span>{desc}</span>
                <kbd className="bg-gray-100 border border-gray-200 rounded px-2 py-0.5 font-mono text-[11px]">{key}</kbd>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
