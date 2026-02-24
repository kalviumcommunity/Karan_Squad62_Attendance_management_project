import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth';
import { Navbar } from '@/components/ui/Navbar';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Rival Blog — Share Your Ideas',
  description: 'A modern, secure blogging platform for developers and creators. Write, publish, and connect with the community.',
  keywords: ['blog', 'writing', 'developers', 'creators', 'publishing'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} font-sans min-h-full bg-[#0a0a0f] text-gray-200 antialiased`} suppressHydrationWarning>
        <AuthProvider>
          <div className="relative min-h-screen">
            {/* Background gradient mesh */}
            <div className="fixed inset-0 bg-mesh pointer-events-none" />
            <div className="relative z-10">
              <Navbar />
              <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                {children}
              </main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
