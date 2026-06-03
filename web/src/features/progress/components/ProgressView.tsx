'use client';

import Link from 'next/link';
import { useProgress } from '../hooks/useProgress';

export default function ProgressView() {
  const { stats, hardWords, resetProgress } = useProgress();

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
          onClick={resetProgress}
          className="flex-1 py-3 rounded-xl border border-gray-200 bg-white text-gray-500 font-bold text-sm hover:border-red-300 hover:text-red-500 transition-colors"
        >
          Reset tiến độ
        </button>
      </div>

      {hardWords.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-bold text-[#712B13]">Từ cần ôn ({hardWords.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {hardWords.map((w) => (
            <div key={w.id} className="bg-[#FAECE7] rounded-xl px-4 py-3 flex items-center justify-between">
              <div>
                <span className="font-bold text-gray-900 text-sm">{w.word}</span>
                <span className="text-xs text-[#712B13] ml-2">{w.meaning}</span>
              </div>
              <span className="text-xs text-gray-400 font-mono">{w.ipa}</span>
            </div>
          ))}
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
