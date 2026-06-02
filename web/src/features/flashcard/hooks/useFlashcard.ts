'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { words } from '@/shared/lib/words';
import { loadStudyState, saveStudyState, defaultStudyState } from '@/shared/lib/words';
import type { StudyState } from '@/shared/types/study';

export function useFlashcard() {
  const [state, setState] = useState<StudyState>(defaultStudyState);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mounted, setMounted] = useState(false);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    setMounted(true);
    const saved = loadStudyState();
    if (saved && saved.deck.length > 0) setState(saved);

    const loadVoices = () => { voicesRef.current = window.speechSynthesis.getVoices(); };
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
  }, []);

  const currentWord = words.find((w) => w.id === state.deck[state.currentIdx]);
  const isDone = !currentWord;

  const save = useCallback((s: StudyState) => {
    setState(s);
    saveStudyState(s);
  }, []);

  const speak = useCallback(() => {
    if (!currentWord) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(currentWord.word);
    utt.rate = 0.85;
    utt.lang = 'en-US';
    const local = voicesRef.current.find((v) => v.localService && v.lang.startsWith('en'));
    const any   = voicesRef.current.find((v) => v.lang.startsWith('en'));
    utt.voice = local ?? any ?? null;
    window.speechSynthesis.speak(utt);
  }, [currentWord]);

  const flip = useCallback(() => {
    if (!currentWord) return;
    const next = !isFlipped;
    setIsFlipped(next);
    if (next && !state.seenSet.includes(currentWord.id)) {
      save({ ...state, seenSet: [...state.seenSet, currentWord.id] });
    }
  }, [isFlipped, currentWord, state, save]);

  const advance = useCallback((ns: StudyState) => {
    setIsFlipped(false);
    const nextIdx = ns.currentIdx < ns.deck.length - 1 ? ns.currentIdx + 1 : ns.deck.length;
    save({ ...ns, currentIdx: nextIdx });
  }, [save]);

  const mark = useCallback((type: 'ok' | 'hard') => {
    if (!currentWord) return;
    const id = currentWord.id;
    const ns: StudyState = {
      ...state,
      seenSet: state.seenSet.includes(id) ? state.seenSet : [...state.seenSet, id],
      okSet:   type === 'ok'   ? [...state.okSet.filter((x) => x !== id), id]   : state.okSet.filter((x) => x !== id),
      hardSet: type === 'hard' ? [...state.hardSet.filter((x) => x !== id), id] : state.hardSet.filter((x) => x !== id),
    };
    advance(ns);
  }, [currentWord, state, advance]);

  const skip = useCallback(() => {
    if (!currentWord) return;
    const id = currentWord.id;
    const ns = { ...state, seenSet: state.seenSet.includes(id) ? state.seenSet : [...state.seenSet, id] };
    advance(ns);
  }, [currentWord, state, advance]);

  const prev = useCallback(() => {
    if (state.currentIdx > 0) {
      setIsFlipped(false);
      save({ ...state, currentIdx: state.currentIdx - 1 });
    }
  }, [state, save]);

  const restartAll = useCallback(() => {
    setIsFlipped(false);
    save(defaultStudyState());
  }, [save]);

  const startHardMode = useCallback(() => {
    if (state.hardSet.length === 0) return;
    setIsFlipped(false);
    save({ ...state, isHardMode: true, deck: [...state.hardSet], currentIdx: 0 });
  }, [state, save]);

  const toggleMode = useCallback(() => {
    if (state.isHardMode) {
      restartAll();
    } else {
      if (state.hardSet.length === 0) { alert('Chưa có từ nào được đánh dấu "Cần ôn".'); return; }
      startHardMode();
    }
  }, [state.isHardMode, state.hardSet.length, restartAll, startHardMode]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT') return;
      if (e.key === ' ' || e.code === 'Space') { e.preventDefault(); flip(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); isFlipped ? mark('ok')   : skip(); }
      else if (e.key === 'ArrowLeft')  { e.preventDefault(); isFlipped ? mark('hard') : prev(); }
      else if (e.key === 'r' || e.key === 'R') speak();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [flip, mark, skip, prev, speak, isFlipped]);

  return {
    state,
    isFlipped,
    mounted,
    currentWord,
    isDone,
    speak,
    flip,
    mark,
    skip,
    prev,
    restartAll,
    startHardMode,
    toggleMode,
  };
}
