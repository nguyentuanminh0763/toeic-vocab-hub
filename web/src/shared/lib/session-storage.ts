import type { StudySession } from '@/shared/types/session';

function getKey(set: string) {
  return `toeic_sessions_${set}`;
}

export function loadSessions(set: string): StudySession[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(getKey(set));
    return raw ? (JSON.parse(raw) as StudySession[]) : [];
  } catch {
    return [];
  }
}

export function saveSession(set: string, session: StudySession): void {
  if (typeof window === 'undefined') return;
  const existing = loadSessions(set);
  // tránh duplicate nếu cùng id
  const updated = [session, ...existing.filter((s) => s.id !== session.id)].slice(0, 20);
  localStorage.setItem(getKey(set), JSON.stringify(updated));
}

export function clearSessions(set: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(getKey(set));
}
