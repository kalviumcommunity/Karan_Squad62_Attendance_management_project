'use client';

import { useState, useEffect, use } from 'react';
import { publicApi, blogApi, BlogDetail } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { LikeButton } from '@/components/blog/LikeButton';
import { CommentSection } from '@/components/blog/CommentSection';
import { formatDate, getInitials } from '@/lib/utils';
import { ArrowLeft, Clock, Eye } from 'lucide-react';
import Link from 'next/link';

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { accessToken } = useAuth();
  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [likeStatus, setLikeStatus] = useState({ liked: false, likeCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    publicApi.getBlog(slug)
      .then(async (b) => {
        setBlog(b);
        setLikeStatus({ liked: false, likeCount: b.likeCount });

        // Fetch personal like status if logged in
        if (accessToken) {
          try {
            const status = await blogApi.getLikeStatus(b.id, accessToken);
            setLikeStatus(status);
          } catch { }
        }
      })
      .catch(() => setError('Blog not found'))
      .finally(() => setLoading(false));
  }, [slug, accessToken]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="h-4 w-20 skeleton rounded mb-8" />
        <div className="h-10 w-3/4 skeleton rounded mb-4" />
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 skeleton rounded-full" />
          <div className="space-y-2">
            <div className="h-3 w-24 skeleton rounded" />
            <div className="h-3 w-32 skeleton rounded" />
          </div>
        </div>
        <div className="space-y-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-4 skeleton rounded" style={{ width: `${85 + Math.random() * 15}%` }} />
          ))}
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="text-center py-24 animate-fade-in">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/[0.06] mx-auto mb-4">
          <Eye className="h-8 w-8 text-gray-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-300 mb-2">Blog not found</h2>
        <p className="text-gray-500 mb-6">This post may not exist or isn&apos;t published yet.</p>
        <Link href="/feed" className="btn-primary">Back to feed</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Link href="/feed" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 mb-8 transition-colors group">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to feed
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight tracking-tight">
            {blog.title}
          </h1>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20 text-sm font-medium text-indigo-300">
              {getInitials(blog.author.name, blog.author.email)}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-200">
                {blog.author.name || blog.author.email.split('@')[0]}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                {formatDate(blog.publishedAt || blog.createdAt)}
              </div>
            </div>
          </div>
        </header>

        {/* Summary */}
        {blog.summary && (
          <div className="mb-8 p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/10">
            <p className="text-sm text-gray-400 italic leading-relaxed">{blog.summary}</p>
          </div>
        )}

        {/* Content */}
        <div className="prose-content whitespace-pre-wrap mb-8">
          {blog.content}
        </div>

        {/* Like bar */}
        <div className="flex items-center gap-4 py-5 border-y border-white/[0.06] mb-8">
          <LikeButton
            blogId={blog.id}
            initialLiked={likeStatus.liked}
            initialCount={likeStatus.likeCount}
          />
          <span className="text-xs text-gray-600">
            {blog.commentCount} comment{blog.commentCount !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Comments */}
        <CommentSection blogId={blog.id} />
      </article>
    </div>
  );
}
