'use client';

import { useState } from 'react';
import { WORD_SETS } from '@/shared/lib/words';
import type { CreatePrivateWordPayload } from '@/services/words.api';

interface Props {
  set: string;
  onClose: () => void;
  onAdd: (payload: CreatePrivateWordPayload) => Promise<boolean>;
}

const WORD_FORMS = [
  'noun', 'verb', 'adjective', 'adverb',
  'noun / verb', 'verb / noun', 'noun / adj',
  'phrasal verb', 'idiom', 'noun phrase', 'other',
];

export default function AddNoteModal({ set, onClose, onAdd }: Props) {
  const setLabel = WORD_SETS[set as keyof typeof WORD_SETS]?.label ?? set;
  const [word,     setWord]     = useState('');
  const [meaning,  setMeaning]  = useState('');
  const [wordForm, setWordForm] = useState('noun');
  const [ipa,      setIpa]      = useState('');
  const [example,  setExample]  = useState('');
  const [saving,   setSaving]   = useState(false);
  const [error,    setError]    = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!word.trim() || !meaning.trim()) { setError('Từ và nghĩa là bắt buộc.'); return; }
    setSaving(true);
    const ok = await onAdd({
      word:      word.trim(),
      meaning:   meaning.trim(),
      set_name:  set,
      word_form: wordForm,
      ipa:       ipa.trim() || undefined,
      example:   example.trim() || undefined,
    });
    setSaving(false);
    if (ok) onClose();
    else setError('Lưu thất bại. Kiểm tra lại kết nối.');
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-gray-900">Thêm từ vựng riêng</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Tự động vào deck flashcard — có badge <span className="text-[#534AB7] font-semibold">Riêng tư</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400"
          >✕</button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          {/* Read-only: set đang thêm vào */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Thêm vào bộ đề</label>
            <div className="flex items-center gap-2 border border-gray-200 bg-gray-50 rounded-xl px-3 py-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#EAE8F9] text-[#534AB7]">Riêng tư</span>
              <span className="text-sm font-semibold text-gray-700">{setLabel}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Từ vựng *</label>
              <input
                value={word} onChange={(e) => setWord(e.target.value)}
                placeholder="e.g. eloquent"
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#534AB7] focus:ring-1 focus:ring-[#534AB7]"
                autoFocus
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Nghĩa *</label>
              <input
                value={meaning} onChange={(e) => setMeaning(e.target.value)}
                placeholder="e.g. hùng hồn"
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#534AB7] focus:ring-1 focus:ring-[#534AB7]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Loại từ</label>
              <select
                value={wordForm} onChange={(e) => setWordForm(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#534AB7]"
              >
                {WORD_FORMS.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">IPA</label>
              <input
                value={ipa} onChange={(e) => setIpa(e.target.value)}
                placeholder="e.g. /ˈel.ə.kwənt/"
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#534AB7] focus:ring-1 focus:ring-[#534AB7]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Ví dụ</label>
            <input
              value={example} onChange={(e) => setExample(e.target.value)}
              placeholder="e.g. She gave an eloquent speech."
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#534AB7] focus:ring-1 focus:ring-[#534AB7]"
            />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <div className="flex gap-2 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm font-semibold hover:border-gray-300 transition-colors">
              Hủy
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 py-2.5 rounded-xl bg-[#534AB7] text-white text-sm font-bold hover:bg-[#443fa0] disabled:opacity-60 transition-colors">
              {saving ? 'Đang lưu...' : 'Thêm vào deck'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
