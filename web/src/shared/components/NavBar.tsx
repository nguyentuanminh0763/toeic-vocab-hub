'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getActiveSet } from '@/shared/lib/active-set';
import { WORD_SETS } from '@/shared/lib/words';
import { getUser, clearAuth } from '@/shared/lib/auth-storage';
import type { AuthUser } from '@/shared/lib/auth-storage';

const links = [
  { href: '/study',    label: 'Flashcard' },
  { href: '/quiz',     label: 'Quiz'      },
  { href: '/words',    label: 'Từ vựng'   },
  { href: '/progress', label: 'Tiến độ'   },
];

export default function NavBar() {
  const pathname = usePathname();
  const [setLabel, setSetLabel] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const key = getActiveSet();
    setSetLabel(WORD_SETS[key]?.label ?? key);
    setUser(getUser());
  }, [pathname]);

  const isStudyPage = pathname !== '/';

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-8 h-12">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-sm font-extrabold text-[#534AB7] tracking-tight hover:opacity-80 transition-opacity">
            TOEIC Vocab
          </Link>
          {isStudyPage && setLabel && (
            <Link
              href="/"
              className="hidden sm:flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#EAE8F9] text-[#534AB7] hover:bg-[#534AB7] hover:text-white transition-colors"
              title="Đổi bộ đề"
            >
              {setLabel}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                pathname === href
                  ? 'bg-[#534AB7] text-white'
                  : 'text-gray-500 hover:bg-[#EAE8F9] hover:text-[#534AB7]'
              }`}
            >
              {label}
            </Link>
          ))}

          <div className="ml-2 pl-2 border-l border-gray-200">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:block text-xs font-semibold text-gray-600 max-w-[100px] truncate">
                  {user.full_name ?? user.email.split('@')[0]}
                </span>
                <button
                  onClick={() => { clearAuth(); setUser(null); }}
                  className="text-xs text-gray-400 hover:text-red-500 transition-colors px-2 py-1"
                  title="Đăng xuất"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  pathname === '/login'
                    ? 'bg-[#534AB7] text-white'
                    : 'text-[#534AB7] border border-[#534AB7] hover:bg-[#EAE8F9]'
                }`}
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
