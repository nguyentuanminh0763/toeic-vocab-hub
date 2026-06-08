import { getToken } from '@/shared/lib/auth-storage';
import type { Word } from '@/shared/lib/words';

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

interface BeWord {
  id: string;
  word: string;
  word_form: string;
  ipa: string;
  meaning: string;
  example: string;
  set_name: string;
  sort_order: number;
  visibility: 'public' | 'private';
  user_id: string | null;
}

// Auth-aware cache keys: different key when logged in (response includes private words)
const WORDS_CACHE_KEY = (set: string, auth: boolean) =>
  `toeic_words_${set}${auth ? '_auth' : ''}`;
const UUID_CACHE_KEY = (set: string) => `toeic_uuid_map_${set}`;

export async function fetchWords(set: string): Promise<Word[]> {
  const token = getToken();
  const cacheKey = WORDS_CACHE_KEY(set, !!token);

  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached) as Word[];
  } catch { /* ignore */ }

  try {
    const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await fetch(`${BASE}/words?set=${set}`, { headers, cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    const beWords: BeWord[] = json.data ?? [];

    const feWords: Word[] = beWords.map((w) => ({
      id: w.sort_order,
      word: w.word,
      wordForm: w.word_form,
      ipa: w.ipa ?? '',
      meaning: w.meaning,
      example: w.example ?? '',
      setName: w.set_name,
      isPrivate: w.visibility === 'private',
    }));

    localStorage.setItem(cacheKey, JSON.stringify(feWords));

    const uuidEntries: [number, string][] = beWords.map((w) => [w.sort_order, w.id]);
    localStorage.setItem(UUID_CACHE_KEY(set), JSON.stringify(uuidEntries));

    return feWords;
  } catch {
    return [];
  }
}

export async function fetchWordUUIDs(set: string): Promise<Map<number, string>> {
  try {
    const cached = localStorage.getItem(UUID_CACHE_KEY(set));
    if (cached) return new Map(JSON.parse(cached) as [number, string][]);
  } catch { /* ignore */ }

  await fetchWords(set);

  try {
    const cached = localStorage.getItem(UUID_CACHE_KEY(set));
    if (cached) return new Map(JSON.parse(cached) as [number, string][]);
  } catch { /* ignore */ }

  return new Map();
}

export function clearWordsCache(set: string) {
  try {
    localStorage.removeItem(WORDS_CACHE_KEY(set, false));
    localStorage.removeItem(WORDS_CACHE_KEY(set, true));
    localStorage.removeItem(UUID_CACHE_KEY(set));
  } catch { /* ignore */ }
}

export interface CreatePrivateWordPayload {
  word: string;
  meaning: string;
  set_name?: string;
  word_form?: string;
  ipa?: string;
  example?: string;
}

export async function createPrivateWord(payload: CreatePrivateWordPayload): Promise<Word | null> {
  const token = getToken();
  if (!token) return null;
  try {
    const res = await fetch(`${BASE}/words`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return null;
    const json = await res.json();
    const w: BeWord = json.data;
    return {
      id: w.sort_order,
      word: w.word,
      wordForm: w.word_form,
      ipa: w.ipa ?? '',
      meaning: w.meaning,
      example: w.example ?? '',
      setName: w.set_name,
      isPrivate: true,
    };
  } catch {
    return null;
  }
}

export async function deletePrivateWord(wordUUID: string): Promise<void> {
  const token = getToken();
  if (!token) return;
  try {
    await fetch(`${BASE}/words/${wordUUID}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch { /* ignore */ }
}
