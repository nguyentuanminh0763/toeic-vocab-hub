'use client';

import { useState } from 'react';
import { words, getWordsBySet, DEFAULT_SET } from '@/shared/lib/words';
import type { Word } from '@/shared/lib/words';
import { loadStudyState } from '@/shared/lib/study-storage';

export type QuizMode = 'all' | 'hard';
export type QuizScreen = 'setup' | 'quiz' | 'result';

export interface QuizQuestion {
  word: Word;
  options: string[];
  correct: string;
}

export interface QuizResult {
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
    const distractors = shuffle(words.filter((w) => w.id !== word.id).map((w) => w.meaning)).slice(0, 3);
    return { word, options: shuffle([correct, ...distractors]), correct };
  });
}

function getHardDeck(set: string): Word[] {
  const hardIds = loadStudyState(set)?.hardSet ?? [];
  return getWordsBySet(set).filter((w) => hardIds.includes(w.id));
}

export function useQuiz(set: string = DEFAULT_SET) {
  const [screen, setScreen]       = useState<QuizScreen>('setup');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [qIndex, setQIndex]       = useState(0);
  const [result, setResult]       = useState<QuizResult>({ total: 0, correct: 0, wrong: [] });

  function startQuiz(mode: QuizMode, count: number) {
    const deck = mode === 'hard' ? getHardDeck(set) : getWordsBySet(set);
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
    if (qIndex + 1 >= questions.length) setScreen('result');
    else setQIndex((i) => i + 1);
  }

  function retryWrong() {
    const qs = buildQuestions(result.wrong);
    setQuestions(qs);
    setQIndex(0);
    setResult({ total: qs.length, correct: 0, wrong: [] });
    setScreen('quiz');
  }

  return { screen, questions, qIndex, result, startQuiz, handleAnswer, retryWrong, goSetup: () => setScreen('setup') };
}
