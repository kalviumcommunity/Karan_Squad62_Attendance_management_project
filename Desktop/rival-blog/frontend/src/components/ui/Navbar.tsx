'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { LogOut, PenSquare, Rss, Sparkles } from 'lucide-react';
import { getInitials } from '@/lib/utils';

export function Navbar() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.06] glass">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg group"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
            <Rss className="h-4 w-4 text-white" />
          </div>
          <span className="gradient-text from-indigo-400 to-violet-400">
            Rival Blog
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/feed"
            className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
          >
            Feed
          </Link>

          {!isLoading && (
            <>
              {user ? (
                <>
                  <Link href="/dashboard" className="btn-secondary text-xs py-1.5">
                    <PenSquare className="h-3.5 w-3.5" />
                    Dashboard
                  </Link>

                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20 text-xs font-medium text-indigo-300">
                      {getInitials(user.name, user.email)}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-gray-500 hover:text-gray-300 transition-colors"
                      title="Logout"
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/login" className="btn-ghost text-xs py-1.5">
                    Login
                  </Link>
                  <Link href="/register" className="btn-primary text-xs py-1.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    Sign up
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
