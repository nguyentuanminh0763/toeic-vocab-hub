'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared/hooks/useAuth';

export default function AuthForm() {
  const router = useRouter();
  const { login, signup, loading, error } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]         = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (mode === 'login') {
        await login({ email, password });
      } else {
        await signup({ email, password, full_name: name || undefined });
      }
      router.push('/');
    } catch {
      // error shown via hook
    }
  }

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8 flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-extrabold text-gray-900">
          {mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          {mode === 'login' ? 'Đăng nhập để lưu tiến độ học' : 'Tạo tài khoản miễn phí'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {mode === 'signup' && (
          <input
            type="text"
            placeholder="Tên của bạn (tuỳ chọn)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#534AB7] transition-colors"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#534AB7] transition-colors"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#534AB7] transition-colors"
        />

        {error && (
          <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-[#534AB7] text-white font-bold text-sm hover:bg-[#443fa0] disabled:opacity-50 transition-colors"
        >
          {loading ? 'Đang xử lý...' : mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
        </button>
      </form>

      <button
        onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setEmail(''); setPassword(''); setName(''); }}
        className="text-center text-xs text-[#534AB7] hover:underline"
      >
        {mode === 'login' ? 'Chưa có tài khoản? Tạo ngay' : 'Đã có tài khoản? Đăng nhập'}
      </button>
    </div>
  );
}
