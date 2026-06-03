import { getToken } from '@/shared/lib/auth-storage';

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export interface BeWord {
  id: string;        // UUID
  word: string;
  sort_order: number;
  set_name: string;
}

// Cache: numeric FE id → BE UUID
const UUID_CACHE_KEY = (set: string) => `toeic_uuid_map_${set}`;

export async function fetchWordUUIDs(set: string): Promise<Map<number, string>> {
  const token = getToken();
  if (!token) return new Map();

  // Dùng cache nếu có
  try {
    const cached = localStorage.getItem(UUID_CACHE_KEY(set));
    if (cached) return new Map(JSON.parse(cached) as [number, string][]);
  } catch { /* ignore */ }

  try {
    const res = await fetch(`${BASE}/words?set=${set}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return new Map();
    const json = await res.json();
    const beWords: BeWord[] = json.data ?? [];
    // sort_order trong BE = numeric id trong FE
    const map = new Map<number, string>(beWords.map((w) => [w.sort_order, w.id]));
    localStorage.setItem(UUID_CACHE_KEY(set), JSON.stringify([...map]));
    return map;
  } catch {
    return new Map();
  }
}
