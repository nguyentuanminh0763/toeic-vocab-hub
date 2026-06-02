'use client';

import { useState, useEffect, useCallback } from 'react';
import { words, type Word } from '@/lib/words';
import Link from 'next/link';

type QuizMode = 'all' | 'hard';

interface QuizQuestion {
  word: Word;
  options: string[];   // 4 meanings, shuffled
  correct: string;     // correct meaning
}

interface QuizResult {
  total: number;
  correct: number;
  wrong: Word[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestions(deck: Word[]): QuizQuestion[] {
  return shuffle(deck).map((word) => {
    const correct = word.meaning;
    const distractors = shuffle(
      words.filter((w) => w.id !== word.id).map((w) => w.meaning)
    ).slice(0, 3);
    const options = shuffle([correct, ...distractors]);
    return { word, options, correct };
  });
}

// ── Setup screen ────────────────────────────────────────────────────────────
function SetupScreen({ onStart }: { onStart: (mode: QuizMode, count: number) => void }) {
  const [mode, setMode] = useState<QuizMode>('all');
  const [count, setCount] = useState(20);

  const hardCount = (() => {
    try {
      const s = JSON.parse(localStorage.getItem('toeic_test1_progress_v2') || '{}');
      return (s.hardSet ?? []).length;
    } catch { return 0; }
  })();

  const maxCount = mode === 'hard' ? hardCount : words.length;

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-extrabold text-gray-900">Quiz Mode</h1>
        <p className="text-sm text-gray-400 mt-1">Trắc nghiệm 4 đáp án — kiểm tra recall thực sự</p>
      </div>

      {/* Mode */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Bộ từ</label>
        <div className="grid grid-cols-2 gap-2">
          {([['all', 'Tất cả 80 từ'], ['hard', `Từ khó (${hardCount})`]] as const).map(([m, label]) => (
            <button
              key={m}
              onClick={() => { setMode(m); setCount(Math.min(count, m === 'hard' ? hardCount : words.length)); }}
              disabled={m === 'hard' && hardCount === 0}
              className={`py-3 rounded-xl text-sm font-bold border-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                mode === m
                  ? 'border-[#534AB7] bg-[#EAE8F9] text-[#534AB7]'
                  : 'border-gray-200 text-gray-500 hover:border-[#534AB7] hover:text-[#534AB7]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Số câu: <span className="text-[#534AB7]">{count}</span>
        </label>
        <input
          type="range"
          min={5}
          max={maxCount}
          step={5}
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

// ── Question screen ─────────────────────────────────────────────────────────
function QuestionScreen({
  question, index, total, onAnswer,
}: {
  question: QuizQuestion;
  index: number;
  total: number;
  onAnswer: (correct: boolean) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  const pick = useCallback((opt: string) => {
    if (selected) return;
    setSelected(opt);
    setTimeout(() => onAnswer(opt === question.correct), 900);
  }, [selected, question.correct, onAnswer]);

  // keyboard 1-4
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const n = parseInt(e.key);
      if (n >= 1 && n <= 4) pick(question.options[n - 1]);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [pick, question.options]);

  const pct = Math.round((index / total) * 100);

  return (
    <div className="w-full max-w-md flex flex-col gap-4">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-[#534AB7] rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
        <span className="text-xs text-gray-400 shrink-0">{index}/{total}</span>
      </div>

      {/* Word card */}
      <div className="bg-white rounded-2xl shadow-md p-7">
        <div className="text-xs text-gray-400 mb-2">{question.word.wordForm}</div>
        <div className="text-3xl font-extrabold text-gray-900 mb-1">{question.word.word}</div>
        <div className="text-sm text-gray-400 italic">{question.word.ipa}</div>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-2.5">
        {question.options.map((opt, i) => {
          let cls = 'border-gray-200 bg-white text-gray-700 hover:border-[#534AB7] hover:text-[#534AB7]';
          if (selected) {
            if (opt === question.correct)         cls = 'border-[#9FE1CB] bg-[#E1F5EE] text-[#085041]';
            else if (opt === selected)            cls = 'border-red-300 bg-red-50 text-red-700';
            else                                  cls = 'border-gray-100 bg-gray-50 text-gray-400';
          }
          return (
            <button
              key={opt}
              onClick={() => pick(opt)}
              className={`w-full text-left px-4 py-3.5 rounded-xl border-2 font-medium text-sm transition-colors ${cls}`}
            >
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

// ── Result screen ───────────────────────────────────────────────────────────
function ResultScreen({ result, onRetry, onRetryWrong }: {
  result: QuizResult;
  onRetry: () => void;
  onRetryWrong: () => void;
}) {
  const pct = Math.round((result.correct / result.total) * 100);
  const grade =
    pct >= 90 ? { label: 'Xuất sắc!', color: 'text-[#085041]' } :
    pct >= 70 ? { label: 'Tốt lắm!',  color: 'text-[#534AB7]' } :
    pct >= 50 ? { label: 'Cố lên!',   color: 'text-yellow-600' } :
                { label: 'Ôn thêm nhé', color: 'text-[#712B13]' };

  return (
    <div className="w-full max-w-md flex flex-col gap-5">
      <div className="bg-white rounded-2xl shadow-md p-8 text-center flex flex-col gap-3">
        <div className={`text-4xl font-extrabold ${grade.color}`}>{pct}%</div>
        <div className="text-lg font-bold text-gray-900">{grade.label}</div>
        <div className="flex justify-center gap-6 mt-2">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#085041]">{result.correct}</div>
            <div className="text-xs text-gray-400">Đúng</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#712B13]">{result.total - result.correct}</div>
            <div className="text-xs text-gray-400">Sai</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#534AB7]">{result.total}</div>
            <div className="text-xs text-gray-400">Tổng</div>
          </div>
        </div>
      </div>

      {/* Wrong words */}
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

// ── Main ─────────────────────────────────────────────────────────────────────
type Screen = 'setup' | 'quiz' | 'result';

export default function QuizPage() {
  const [screen, setScreen]       = useState<Screen>('setup');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [qIndex, setQIndex]       = useState(0);
  const [result, setResult]       = useState<QuizResult>({ total: 0, correct: 0, wrong: [] });

  function startQuiz(mode: QuizMode, count: number) {
    let deck: Word[];
    if (mode === 'hard') {
      try {
        const s = JSON.parse(localStorage.getItem('toeic_test1_progress_v2') || '{}');
        const hardIds: number[] = s.hardSet ?? [];
        deck = words.filter((w) => hardIds.includes(w.id));
      } catch { deck = []; }
    } else {
      deck = words;
    }
    const qs = buildQuestions(deck).slice(0, count);
    setQuestions(qs);
    setQIndex(0);
    setResult({ total: qs.length, correct: 0, wrong: [] });
    setScreen('quiz');
  }

  function handleAnswer(correct: boolean) {
    const word = questions[qIndex].word;
    setResult((prev) => ({
      ...prev,
      correct: prev.correct + (correct ? 1 : 0),
      wrong: correct ? prev.wrong : [...prev.wrong, word],
    }));

    if (qIndex + 1 >= questions.length) {
      setScreen('result');
    } else {
      setQIndex((i) => i + 1);
    }
  }

  function retryWrong() {
    const wrongWords = result.wrong;
    const qs = buildQuestions(wrongWords);
    setQuestions(qs);
    setQIndex(0);
    setResult({ total: qs.length, correct: 0, wrong: [] });
    setScreen('quiz');
  }

  return (
    <div className="flex flex-col items-center w-full">
      {screen === 'setup' && <SetupScreen onStart={startQuiz} />}
      {screen === 'quiz' && questions[qIndex] && (
        <QuestionScreen
          question={questions[qIndex]}
          index={qIndex}
          total={questions.length}
          onAnswer={handleAnswer}
        />
      )}
      {screen === 'result' && (
        <ResultScreen
          result={result}
          onRetry={() => setScreen('setup')}
          onRetryWrong={retryWrong}
        />
      )}
    </div>
  );
}
