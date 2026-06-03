import { getToken } from '@/shared/lib/auth-storage';

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export type WordStatus = 'ok' | 'hard' | 'unseen';

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };
}

export async function syncWordProgress(wordUUID: string, status: WordStatus): Promise<void> {
  const token = getToken();
  if (!token) return;
  try {
    await fetch(`${BASE}/progress/${wordUUID}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ status }),
    });
  } catch { /* fire-and-forget, không block UI */ }
}

export async function fetchAllProgress(): Promise<{ word_id: string; status: WordStatus }[]> {
  const token = getToken();
  if (!token) return [];
  try {
    const res = await fetch(`${BASE}/progress`, { headers: authHeaders() });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch { return []; }
}
