const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export type WordStatus = 'ok' | 'hard' | 'unseen';

export async function updateProgress(userId: string, wordId: string, status: WordStatus) {
  const res = await fetch(`${API_BASE}/progress/${wordId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, status }),
  });
  if (!res.ok) throw new Error('Failed to update progress');
  return res.json();
}

export async function fetchProgress(userId: string) {
  const res = await fetch(`${API_BASE}/progress?user_id=${userId}`);
  if (!res.ok) throw new Error('Failed to fetch progress');
  return res.json();
}

export async function fetchStats(userId: string) {
  const res = await fetch(`${API_BASE}/progress/stats?user_id=${userId}`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}
