'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { getWordsBySet, DEFAULT_SET } from '@/shared/lib/words';
import { loadStudyState, saveStudyState, defaultStudyState } from '@/shared/lib/study-storage';
import { saveSession } from '@/shared/lib/session-storage';
import { isLoggedIn } from '@/shared/lib/auth-storage';
import { syncWordProgress } from '@/services/progress.api';
import { fetchWordUUIDs } from '@/services/words.api';
import type { StudyState } from '@/shared/types/study';
import type { StudySession } from '@/shared/types/session';

export function useFlashcard(set: string = DEFAULT_SET) {
  const deckWords = getWordsBySet(set);
  const [state, setState] = useState<StudyState>(() => defaultStudyState(set));
  const [isFlipped, setIsFlipped] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [savedSession, setSavedSession] = useState<StudySession | null>(null);
  const sessionSavedRef = useRef(false);
  const uuidMapRef = useRef<Map<number, string>>(new Map());
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const saved = loadStudyState(set);
    if (saved && saved.deck.length > 0) setState(saved);

    // Load word UUID map nếu đã login (để sync BE)
    if (isLoggedIn()) {
      fetchWordUUIDs(set).then((map) => { uuidMapRef.current = map; });
    }

    const loadVoices = () => { voicesRef.current = window.speechSynthesis.getVoices(); };
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
  }, []);

  const currentWord = deckWords.find((w) => w.id === state.deck[state.currentIdx]);
  const isDone = !currentWord;

  // Auto-save session khi xong deck lần đầu
  useEffect(() => {
    if (!isDone || !mounted || sessionSavedRef.current) return;
    sessionSavedRef.current = true;
    const session: StudySession = {
      id: `${set}_${Date.now()}`,
      setName: set,
      date: new Date().toISOString(),
      total: state.deck.length,
      ok: state.okSet.length,
      hard: state.hardSet.length,
      okIds: [...state.okSet],
      hardIds: [...state.hardSet],
      isHardMode: state.isHardMode,
    };
    saveSession(set, session);
    setSavedSession(session);
  }, [isDone, mounted, set, state]);

  const save = useCallback((s: StudyState) => {
    setState(s);
    saveStudyState(s, set);
  }, [set]);

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
    // Sync to BE fire-and-forget
    const uuid = uuidMapRef.current.get(id);
    if (uuid) syncWordProgress(uuid, type);
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
    sessionSavedRef.current = false;
    setIsFlipped(false);
    // Giữ lại okSet và hardSet — chỉ reset vị trí và seenSet
    save({
      ...state,
      seenSet: [],
      currentIdx: 0,
      isHardMode: false,
      deck: deckWords.map((w) => w.id),
    });
  }, [state, save, set, deckWords]);

  const startHardMode = useCallback((hardIds?: number[]) => {
    const ids = hardIds ?? state.hardSet;
    if (ids.length === 0) return;
    sessionSavedRef.current = false;
    setIsFlipped(false);
    save({ ...state, isHardMode: true, deck: [...ids], currentIdx: 0 });
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
      else if (e.key === 'ArrowRight') { e.preventDefault(); if (isFlipped) mark('ok'); else skip(); }
      else if (e.key === 'ArrowLeft')  { e.preventDefault(); if (isFlipped) mark('hard'); else prev(); }
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
    savedSession,
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
