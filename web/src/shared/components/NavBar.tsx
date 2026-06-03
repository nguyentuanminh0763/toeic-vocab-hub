'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/',          label: 'Flashcard' },
  { href: '/quiz',      label: 'Quiz'      },
  { href: '/words',     label: 'Từ vựng'   },
  { href: '/progress',  label: 'Tiến độ'   },
];

export default function NavBar() {
  const pathname = usePathname();
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-8 h-12">
        <span className="text-sm font-extrabold text-[#534AB7] tracking-tight">TOEIC Vocab</span>
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
