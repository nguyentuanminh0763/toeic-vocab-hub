import { getToken } from '@/shared/lib/auth-storage';

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export interface UserNote {
  id: string;
  word: string;
  meaning: string;
  word_form: string;
  ipa: string | null;
  example: string | null;
  status: 'ok' | 'hard' | 'unseen';
  created_at: string;
}

export interface CreateNotePayload {
  word: string;
  meaning: string;
  word_form?: string;
  ipa?: string;
  example?: string;
}

function authHeaders() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` };
}

export async function fetchNotes(): Promise<UserNote[]> {
  if (!getToken()) return [];
  try {
    const res = await fetch(`${BASE}/notes`, { headers: authHeaders() });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch { return []; }
}

export async function createNote(payload: CreateNotePayload): Promise<UserNote | null> {
  try {
    const res = await fetch(`${BASE}/notes`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch { return null; }
}

export async function updateNoteStatus(id: string, status: 'ok' | 'hard' | 'unseen'): Promise<void> {
  try {
    await fetch(`${BASE}/notes/${id}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ status }),
    });
  } catch { /* fire-and-forget */ }
}

export async function deleteNote(id: string): Promise<void> {
  try {
    await fetch(`${BASE}/notes/${id}`, { method: 'DELETE', headers: authHeaders() });
  } catch { /* ignore */ }
}
