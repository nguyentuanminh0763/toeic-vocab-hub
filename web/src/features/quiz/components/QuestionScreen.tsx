'use client';

import { useState, useCallback, useEffect } from 'react';
import type { QuizQuestion } from '../hooks/useQuiz';

interface Props {
  question: QuizQuestion;
  index: number;
  total: number;
  correctCount: number;
  wrongCount: number;
  onAnswer: (correct: boolean) => void;
}

export default function QuestionScreen({ question, index, total, correctCount, wrongCount, onAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const pct = Math.round((index / total) * 100);

  const pick = useCallback((opt: string) => {
    if (selected) return;
    setSelected(opt);
    setTimeout(() => onAnswer(opt === question.correct), 900);
  }, [selected, question.correct, onAnswer]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const n = parseInt(e.key);
      if (n >= 1 && n <= 4) pick(question.options[n - 1]);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [pick, question.options]);

  return (
    <div className="w-full max-w-md flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-[#534AB7] rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
        <span className="text-xs text-gray-400 shrink-0">{index}/{total}</span>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#E1F5EE]">
          <span className="text-base font-extrabold text-[#085041]">{correctCount}</span>
          <span className="text-xs text-[#085041] opacity-70">Đúng</span>
        </div>
        <div className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#FAECE7]">
          <span className="text-base font-extrabold text-[#712B13]">{wrongCount}</span>
          <span className="text-xs text-[#712B13] opacity-70">Sai</span>
        </div>
        <div className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gray-100">
          <span className="text-base font-extrabold text-gray-500">{total - index}</span>
          <span className="text-xs text-gray-400">Còn lại</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-7">
        <div className="text-xs text-gray-400 mb-2">{question.word.wordForm}</div>
        <div className="text-3xl font-extrabold text-gray-900 mb-1">{question.word.word}</div>
        <div className="text-sm text-gray-400 italic">{question.word.ipa}</div>
      </div>

      <div className="flex flex-col gap-2.5">
        {question.options.map((opt, i) => {
          let cls = 'border-gray-200 bg-white text-gray-700 hover:border-[#534AB7] hover:text-[#534AB7]';
          if (selected) {
            if (opt === question.correct)  cls = 'border-[#9FE1CB] bg-[#E1F5EE] text-[#085041]';
            else if (opt === selected)     cls = 'border-red-300 bg-red-50 text-red-700';
            else                           cls = 'border-gray-100 bg-gray-50 text-gray-400';
          }
          return (
            <button key={opt} onClick={() => pick(opt)}
              className={`w-full text-left px-4 py-3.5 rounded-xl border-2 font-medium text-sm transition-colors ${cls}`}>
              <span className="text-xs font-bold mr-2 opacity-50">{i + 1}</span>
              {opt}
            </button>
          );
        })}
      </div>

      <p className="text-center text-[11px] text-gray-400 opacity-60">
        Nhấn <kbd className="bg-white border border-gray-200 rounded px-1 font-mono">1</kbd>–
        <kbd className="bg-white border border-gray-200 rounded px-1 font-mono">4</kbd> để chọn
      </p>
    </div>
  );
}
