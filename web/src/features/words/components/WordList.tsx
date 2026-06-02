'use client';

import { useState } from 'react';
import { words } from '@/shared/lib/words';

const FORM_COLORS: Record<string, string> = {
  noun:           'bg-blue-50 text-blue-700',
  verb:           'bg-green-50 text-green-700',
  adjective:      'bg-yellow-50 text-yellow-700',
  'verb / noun':  'bg-purple-50 text-purple-700',
  'noun / adj':   'bg-orange-50 text-orange-700',
  'phrasal verb': 'bg-teal-50 text-teal-700',
  idiom:          'bg-pink-50 text-pink-700',
};

function formColor(form: string) {
  return FORM_COLORS[form.toLowerCase()] ?? 'bg-gray-100 text-gray-600';
}

export default function WordsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const forms = ['all', ...Array.from(new Set(words.map((w) => w.wordForm))).sort()];

  const filtered = words.filter((w) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      w.word.toLowerCase().includes(q) ||
      w.meaning.toLowerCase().includes(q);
    const matchFilter = filter === 'all' || w.wordForm === filter;
    return matchSearch && matchFilter;
  });

  function speak(word: string) {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(word);
    utt.rate = 0.85;
    utt.lang = 'en-US';
    window.speechSynthesis.speak(utt);
  }

  return (
    <div className="w-full max-w-lg flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-extrabold text-gray-900">
          Danh sách từ vựng
          <span className="ml-2 text-sm font-normal text-gray-400">{filtered.length} / {words.length}</span>
        </h1>

        <input
          type="text"
          placeholder="Tìm từ hoặc nghĩa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-[#534AB7] transition-colors"
        />

        <div className="flex gap-1.5 flex-wrap">
          {forms.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                filter === f
                  ? 'bg-[#534AB7] text-white'
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-[#534AB7] hover:text-[#534AB7]'
              }`}
            >
              {f === 'all' ? 'Tất cả' : f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {filtered.map((w) => (
          <div key={w.id} className="bg-white rounded-xl p-4 shadow-sm flex items-start gap-3">
            <span className="text-xs text-gray-300 font-mono mt-1 w-6 shrink-0 text-right">{w.id}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-gray-900">{w.word}</span>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${formColor(w.wordForm)}`}>
                  {w.wordForm}
                </span>
              </div>
              <div className="text-xs text-gray-400 italic mt-0.5">{w.ipa}</div>
              <div className="text-sm text-[#085041] font-semibold mt-1">{w.meaning}</div>
              <div className="text-xs text-gray-400 italic mt-1 leading-relaxed">&ldquo;{w.example}&rdquo;</div>
            </div>
            <button
              onClick={() => speak(w.word)}
              className="shrink-0 w-8 h-8 rounded-full bg-[#534AB7] text-white flex items-center justify-center hover:bg-[#443fa0] active:scale-95 transition-all mt-0.5"
              title="Phát âm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center text-gray-400 py-12 text-sm">Không tìm thấy từ nào.</div>
        )}
      </div>
    </div>
  );
}
