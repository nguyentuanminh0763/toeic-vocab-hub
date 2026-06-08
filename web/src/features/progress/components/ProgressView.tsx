'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useProgress } from '../hooks/useProgress';
import { loadSessions } from '@/shared/lib/session-storage';
import { DEFAULT_SET } from '@/shared/lib/words';
import type { StudySession } from '@/shared/types/session';

export default function ProgressView({ set }: { set?: string }) {
  const activeSet = set ?? DEFAULT_SET;
  const { stats, hardWords, resetProgress } = useProgress(activeSet);
  const [confirming, setConfirming] = useState(false);
  const [sessions, setSessions] = useState<StudySession[]>([]);

  useEffect(() => {
    setSessions(loadSessions(activeSet));
  }, [activeSet]);

  if (!stats) return null;

  return (
    <div className="w-full max-w-6xl flex flex-col gap-5">
      <h1 className="text-lg font-extrabold text-gray-900">Tiến độ học</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard value={stats.total} label="Tổng số từ" color="text-[#534AB7]" bg="bg-[#EAE8F9]" />
        <StatCard value={stats.seen} label="Đã xem" color="text-[#534AB7]" bg="bg-[#EAE8F9]" />
        <StatCard value={stats.ok} label="Nhớ rồi" color="text-[#085041]" bg="bg-[#E1F5EE]" />
        <StatCard value={stats.hard} label="Cần ôn" color="text-[#712B13]" bg="bg-[#FAECE7]" />
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col gap-4">
        <BarRow label="Đã xem" pct={stats.pctSeen} color="bg-[#534AB7]" />
        <BarRow label="Nhớ rồi" pct={stats.pctOk} color="bg-[#9FE1CB]" />
        <BarRow label="Cần ôn" pct={stats.pctHard} color="bg-[#f4a896]" />
        <BarRow label="Chưa xem" pct={stats.pctUnseen} color="bg-gray-200" />
      </div>

      <div className="flex gap-3">
        <Link href="/" className="flex-1 py-3 rounded-xl bg-[#534AB7] text-white font-bold text-sm text-center hover:bg-[#443fa0] transition-colors">
          Tiếp tục học
        </Link>
        <button
          onClick={() => setConfirming(true)}
          className="flex-1 py-3 rounded-xl border border-gray-200 bg-white text-gray-500 font-bold text-sm hover:border-red-300 hover:text-red-500 transition-colors"
        >
          Reset tiến độ
        </button>
      </div>

      {/* Session history */}
      {sessions.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-bold text-gray-700">Lịch sử ôn luyện ({sessions.length} lần)</h2>
          <div className="flex flex-col gap-2">
            {sessions.map((s, i) => {
              const pct = s.total > 0 ? Math.round((s.ok / s.total) * 100) : 0;
              const d   = new Date(s.date);
              const label = s.isHardMode ? 'Ôn từ khó' : 'Học toàn bộ';
              return (
                <div key={s.id} className="bg-white rounded-xl px-4 py-3 shadow-sm flex items-center gap-4">
                  <div className="text-xs text-gray-300 font-mono w-5 text-right shrink-0">#{sessions.length - i}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-gray-500">{label}</span>
                      <span className="text-[10px] text-gray-300">{d.toLocaleDateString('vi-VN')} {d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#9FE1CB] rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <div className="flex gap-3 shrink-0 text-center">
                    <div>
                      <div className="text-sm font-bold text-[#085041]">{s.ok}</div>
                      <div className="text-[10px] text-gray-400">Nhớ</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#712B13]">{s.hard}</div>
                      <div className="text-[10px] text-gray-400">Khó</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-400">{s.total}</div>
                      <div className="text-[10px] text-gray-400">Tổng</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {hardWords.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-bold text-[#712B13]">Từ cần ôn ({hardWords.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {hardWords.map((w) => (
              <div key={w.id} className="bg-[#FAECE7] rounded-xl px-4 py-3 flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-gray-900 text-sm">{w.word}</span>
                    {w.isPrivate && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#534AB7] text-white">Riêng tư</span>
                    )}
                  </div>
                  <span className="text-xs text-[#712B13]">{w.meaning}</span>
                  {w.ipa && <span className="text-xs text-gray-400 font-mono ml-1">{w.ipa}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Toast confirm */}
      {confirming && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm">
          <div className="bg-gray-900 text-white rounded-2xl px-5 py-4 shadow-2xl flex flex-col gap-3">
            <p className="text-sm font-semibold">Reset toàn bộ tiến độ bộ này?</p>
            <p className="text-xs text-gray-400">Hành động không thể hoàn tác.</p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirming(false)}
                className="flex-1 py-2 rounded-xl bg-white/10 text-white text-sm font-semibold hover:bg-white/20 transition-colors"
              >
                Huỷ
              </button>
              <button
                onClick={() => { resetProgress(); setConfirming(false); }}
                className="flex-1 py-2 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ value, label, color, bg }: { value: number; label: string; color: string; bg: string }) {
  return (
    <div className={`${bg} rounded-xl p-4 text-center`}>
      <div className={`text-3xl font-extrabold ${color}`}>{value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  );
}

function BarRow({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>{label}</span>
        <span className="font-semibold">{pct}%</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
