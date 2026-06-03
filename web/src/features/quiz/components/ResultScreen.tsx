'use client';

import Link from 'next/link';
import type { QuizResult } from '../hooks/useQuiz';

interface Props {
  result: QuizResult;
  onRetry: () => void;
  onRetryWrong: () => void;
}

export default function ResultScreen({ result, onRetry, onRetryWrong }: Props) {
  const pct = Math.round((result.correct / result.total) * 100);
  const grade =
    pct >= 90 ? { label: 'Xuất sắc!',   color: 'text-[#085041]' } :
    pct >= 70 ? { label: 'Tốt lắm!',    color: 'text-[#534AB7]' } :
    pct >= 50 ? { label: 'Cố lên!',      color: 'text-yellow-600' } :
                { label: 'Ôn thêm nhé', color: 'text-[#712B13]' };

  return (
    <div className="w-full max-w-md md:max-w-xl flex flex-col gap-5">
      <div className="bg-white rounded-2xl shadow-md p-8 text-center flex flex-col gap-3">
        <div className={`text-4xl font-extrabold ${grade.color}`}>{pct}%</div>
        <div className="text-lg font-bold text-gray-900">{grade.label}</div>
        <div className="flex justify-center gap-6 mt-2">
          {[
            { val: result.correct,               lbl: 'Đúng', cls: 'text-[#085041]' },
            { val: result.total - result.correct, lbl: 'Sai',  cls: 'text-[#712B13]' },
            { val: result.total,                 lbl: 'Tổng', cls: 'text-[#534AB7]' },
          ].map(({ val, lbl, cls }) => (
            <div key={lbl} className="text-center">
              <div className={`text-2xl font-bold ${cls}`}>{val}</div>
              <div className="text-xs text-gray-400">{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {result.wrong.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-bold text-[#712B13]">Từ trả lời sai ({result.wrong.length})</h2>
          {result.wrong.map((w) => (
            <div key={w.id} className="bg-[#FAECE7] rounded-xl px-4 py-3 flex items-center justify-between">
              <div>
                <span className="font-bold text-gray-900 text-sm">{w.word}</span>
                <span className="text-xs text-[#712B13] ml-2">{w.meaning}</span>
              </div>
              <span className="text-xs text-gray-400 italic">{w.wordForm}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={onRetry} className="flex-1 py-3 rounded-xl bg-[#534AB7] text-white font-bold text-sm hover:bg-[#443fa0] transition-colors">
          Quiz lại từ đầu
        </button>
        {result.wrong.length > 0 && (
          <button onClick={onRetryWrong} className="flex-1 py-3 rounded-xl border-2 border-[#712B13] bg-[#FAECE7] text-[#712B13] font-bold text-sm hover:opacity-80 transition-opacity">
            Ôn từ sai ({result.wrong.length})
          </button>
        )}
      </div>

      <Link href="/" className="text-center text-sm text-[#534AB7] font-semibold hover:underline">
        Quay lại Flashcard
      </Link>
    </div>
  );
}
