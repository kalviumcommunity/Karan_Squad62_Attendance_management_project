'use client';

import { useState, useCallback } from 'react';
import { Heart } from 'lucide-react';
import { blogApi } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface LikeButtonProps {
  blogId: string;
  initialLiked: boolean;
  initialCount: number;
}

export function LikeButton({ blogId, initialLiked, initialCount }: LikeButtonProps) {
  const { user, accessToken } = useAuth();
  const router = useRouter();
  // Optimistic state
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [pending, setPending] = useState(false);
  const [animating, setAnimating] = useState(false);

  const toggle = useCallback(async () => {
    if (!user || !accessToken) {
      router.push('/login');
      return;
    }

    if (pending) return;

    // Optimistic update
    const nextLiked = !liked;
    const nextCount = nextLiked ? count + 1 : count - 1;
    setLiked(nextLiked);
    setCount(nextCount);
    setPending(true);

    if (nextLiked) {
      setAnimating(true);
      setTimeout(() => setAnimating(false), 400);
    }

    try {
      const res = nextLiked
        ? await blogApi.like(blogId, accessToken)
        : await blogApi.unlike(blogId, accessToken);
      setCount(res.likeCount);
      setLiked(res.liked);
    } catch {
      // Rollback on failure
      setLiked(liked);
      setCount(count);
    } finally {
      setPending(false);
    }
  }, [liked, count, blogId, accessToken, user, router, pending]);

  return (
    <button
      onClick={toggle}
      disabled={pending}
      className={cn(
        'flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 border',
        liked
          ? 'border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 shadow-lg shadow-red-500/10'
          : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:border-white/20 hover:text-gray-300',
      )}
    >
      <Heart
        className={cn(
          'h-4 w-4 transition-all',
          liked && 'fill-current text-red-400',
          animating && 'animate-heart',
        )}
      />
      <span>{count}</span>
    </button>
  );
}
