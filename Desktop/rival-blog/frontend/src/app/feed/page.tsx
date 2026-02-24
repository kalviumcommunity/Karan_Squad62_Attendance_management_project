'use client';

import { useState, useEffect, useCallback } from 'react';
import { publicApi, FeedResponse } from '@/lib/api';
import { BlogCard, BlogCardSkeleton } from '@/components/blog/BlogCard';
import { ChevronLeft, ChevronRight, Newspaper } from 'lucide-react';

export default function FeedPage() {
  const [data, setData] = useState<FeedResponse | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async (p: number) => {
    setLoading(true);
    setError('');
    try {
      const res = await publicApi.getFeed(p, 12);
      setData(res);
    } catch {
      setError('Failed to load feed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(page);
  }, [page, load]);

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20">
          <Newspaper className="h-5 w-5 text-indigo-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Public Feed</h1>
          <p className="text-sm text-gray-500">Latest posts from the community</p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400 mb-6 animate-scale-in">
          {error}
          <button onClick={() => load(page)} className="ml-2 text-red-300 underline hover:no-underline">
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(9)].map((_, i) => <BlogCardSkeleton key={i} />)}
        </div>
      ) : data?.data.length === 0 ? (
        <div className="text-center py-24">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/[0.06] mx-auto mb-4">
            <Newspaper className="h-8 w-8 text-gray-600" />
          </div>
          <h2 className="text-lg font-medium text-gray-400 mb-2">No posts yet</h2>
          <p className="text-sm text-gray-600">Be the first to publish something!</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {data?.data.map((blog, i) => (
              <div
                key={blog.id}
                className="animate-slide-up"
                style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'backwards' }}
              >
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {data && data.pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={!data.pagination.hasPrev}
                className="btn-secondary disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: data.pagination.totalPages }, (_, i) => i + 1)
                  .filter(p => Math.abs(p - data.pagination.page) <= 2 || p === 1 || p === data.pagination.totalPages)
                  .map((p, idx, arr) => (
                    <span key={p}>
                      {idx > 0 && arr[idx - 1] !== p - 1 && (
                        <span className="text-gray-600 px-1">…</span>
                      )}
                      <button
                        onClick={() => setPage(p)}
                        className={`h-8 w-8 rounded-lg text-sm font-medium transition-all ${p === data.pagination.page
                            ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                            : 'text-gray-500 hover:text-white hover:bg-white/5'
                          }`}
                      >
                        {p}
                      </button>
                    </span>
                  ))}
              </div>

              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={!data.pagination.hasNext}
                className="btn-secondary disabled:opacity-30"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
