'use client';

import { useState, useEffect, useCallback } from 'react';
import { isLoggedIn } from '@/shared/lib/auth-storage';
import {
  fetchNotes,
  createNote,
  updateNoteStatus,
  deleteNote,
  type UserNote,
  type CreateNotePayload,
} from '@/services/notes.api';

export type { UserNote };

export function useNotes() {
  const [notes, setNotes] = useState<UserNote[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) return;
    fetchNotes().then(setNotes);
  }, []);

  const add = useCallback(async (payload: CreateNotePayload): Promise<boolean> => {
    setLoading(true);
    const note = await createNote(payload);
    setLoading(false);
    if (!note) return false;
    setNotes((prev) => [note, ...prev]);
    return true;
  }, []);

  const updateStatus = useCallback(async (id: string, status: 'ok' | 'hard' | 'unseen') => {
    await updateNoteStatus(id, status);
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, status } : n)));
  }, []);

  const remove = useCallback(async (id: string) => {
    await deleteNote(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const hardNotes = notes.filter((n) => n.status === 'hard');

  return { notes, hardNotes, loading, add, updateStatus, remove };
}
