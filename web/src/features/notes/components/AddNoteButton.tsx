'use client';

import { useState } from 'react';
import { isLoggedIn } from '@/shared/lib/auth-storage';
import { createPrivateWord } from '@/services/words.api';
import { reloadWords } from '@/shared/hooks/useWords';
import type { CreatePrivateWordPayload } from '@/services/words.api';
import AddNoteModal from './AddNoteModal';

interface Props {
  set: string;
  className?: string;
}

export default function AddNoteButton({ set, className }: Props) {
  const [open, setOpen]   = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  if (!isLoggedIn()) return null;

  async function handleAdd(payload: CreatePrivateWordPayload): Promise<boolean> {
    const word = await createPrivateWord(payload);
    if (!word) return false;

    // Reload tất cả useWords(set) đang mounted → deck tự cập nhật
    reloadWords(set);

    // Toast
    setToast(`✓ Đã thêm "${payload.word}" vào deck`);
    setTimeout(() => setToast(null), 3000);

    return true;
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={className ?? 'flex items-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-[#534AB7] text-[#534AB7] text-xs font-semibold hover:bg-[#EAE8F9] transition-colors'}
      >
        <span className="text-sm leading-none font-bold">+</span>
        Thêm từ riêng
      </button>

      {open && (
        <AddNoteModal
          set={set}
          onClose={() => setOpen(false)}
          onAdd={handleAdd}
        />
      )}

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-4 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl shadow-lg animate-fade-in whitespace-nowrap">
          {toast}
        </div>
      )}
    </>
  );
}
