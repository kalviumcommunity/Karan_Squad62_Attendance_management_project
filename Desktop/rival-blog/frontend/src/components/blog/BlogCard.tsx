import Link from 'next/link';
import { Heart, MessageCircle, Clock } from 'lucide-react';
import { FeedBlog } from '@/lib/api';
import { formatRelativeDate, getInitials, truncate } from '@/lib/utils';

interface BlogCardProps {
  blog: FeedBlog;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="card-glow p-5 group flex flex-col">
      <Link href={`/blog/${blog.slug}`} className="block flex-1">
        {/* Author row */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20 text-xs font-medium text-indigo-300">
            {getInitials(blog.author.name, blog.author.email)}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-300 font-medium">
              {blog.author.name || blog.author.email.split('@')[0]}
            </span>
            <span className="text-gray-700">·</span>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              {formatRelativeDate(blog.publishedAt || '')}
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors duration-200 mb-2 line-clamp-2">
          {blog.title}
        </h2>

        {/* Summary */}
        {blog.summary && (
          <p className="text-sm text-gray-400 line-clamp-3 mb-4 leading-relaxed">
            {truncate(blog.summary, 180)}
          </p>
        )}
      </Link>

      {/* Footer */}
      <div className="flex items-center gap-4 mt-auto pt-3 border-t border-white/[0.06]">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Heart className="h-3.5 w-3.5" />
          <span>{blog.likeCount}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <MessageCircle className="h-3.5 w-3.5" />
          <span>{blog.commentCount}</span>
        </div>
      </div>
    </article>
  );
}

// Skeleton
export function BlogCardSkeleton() {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="h-8 w-8 rounded-full skeleton" />
        <div className="h-3 w-24 skeleton rounded" />
      </div>
      <div className="h-5 w-4/5 skeleton rounded mb-2" />
      <div className="h-4 w-full skeleton rounded mb-1.5" />
      <div className="h-4 w-3/4 skeleton rounded mb-4" />
      <div className="flex gap-4 pt-3 border-t border-white/[0.06]">
        <div className="h-3 w-12 skeleton rounded" />
        <div className="h-3 w-12 skeleton rounded" />
      </div>
    </div>
  );
}
