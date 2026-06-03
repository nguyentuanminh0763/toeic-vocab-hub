'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getActiveSet } from '@/shared/lib/active-set';
import { WORD_SETS } from '@/shared/lib/words';

const links = [
  { href: '/study',    label: 'Flashcard' },
  { href: '/quiz',     label: 'Quiz'      },
  { href: '/words',    label: 'Từ vựng'   },
  { href: '/progress', label: 'Tiến độ'   },
];

export default function NavBar() {
  const pathname = usePathname();
  const [setLabel, setSetLabel] = useState<string | null>(null);

  useEffect(() => {
    const key = getActiveSet();
    setSetLabel(WORD_SETS[key]?.label ?? key);
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

        <div className="flex gap-1">
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
        </div>
      </nav>
    </header>
  );
}
