import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import NavBar from '@/shared/components/NavBar';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TOEIC Vocab — ETS 2026',
  description: 'Ôn từ vựng TOEIC ETS 2026 Test 1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${geist.className} bg-[#F5F4FC] min-h-screen`}>
        <NavBar />
        <main className="flex flex-col items-center px-4 md:px-8 pt-6 pb-16 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
