'use client';

import { useState, useCallback, useEffect } from 'react';
import { blogApi, Comment } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { formatRelativeDate, getInitials } from '@/lib/utils';
import { Send, MessageCircle } from 'lucide-react';

interface CommentSectionProps {
  blogId: string;
}

export function CommentSection({ blogId }: CommentSectionProps) {
  const { user, accessToken } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    blogApi.getComments(blogId)
      .then(setComments)
      .finally(() => setLoading(false));
  }, [blogId]);

  const submit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !accessToken || submitting) return;

    setSubmitting(true);
    setError('');

    try {
      const comment = await blogApi.createComment(blogId, content.trim(), accessToken);
      setComments((prev) => [comment, ...prev]);
      setContent('');
    } catch {
      setError('Failed to post comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }, [content, blogId, accessToken, submitting]);

  return (
    <div className="mt-10">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-6">
        <MessageCircle className="h-5 w-5 text-indigo-400" />
        Comments ({comments.length})
      </h3>

      {/* Comment form */}
      {user && accessToken ? (
        <form onSubmit={submit} className="mb-8">
          <div className="flex gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20 text-sm font-medium text-indigo-300">
              {getInitials(user.name, user.email)}
            </div>
            <div className="flex-1">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your thoughts..."
                rows={3}
                className="input resize-none"
                maxLength={2000}
              />
              {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-600">{content.length}/2000</span>
                <button
                  type="submit"
                  disabled={!content.trim() || submitting}
                  className="btn-primary text-xs py-1.5"
                >
                  <Send className="h-3.5 w-3.5" />
                  {submitting ? 'Posting...' : 'Post comment'}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 card p-4 text-center">
          <p className="text-sm text-gray-500">
            <a href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">Log in</a> to leave a comment.
          </p>
        </div>
      )}

      {/* Comments list */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="h-8 w-8 rounded-full skeleton flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-24 skeleton rounded" />
                <div className="h-4 w-full skeleton rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-10">
          <MessageCircle className="h-8 w-8 text-gray-700 mx-auto mb-3" />
          <p className="text-sm text-gray-500">No comments yet. Be the first!</p>
        </div>
      ) : (
        <div className="space-y-5">
          {comments.map((comment, i) => (
            <div
              key={comment.id}
              className="animate-slide-up"
              style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'backwards' }}
            >
              <CommentItem comment={comment} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className="flex gap-3 group">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/[0.06] text-xs font-medium text-gray-400">
        {getInitials(comment.user.name, comment.user.email)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-gray-300">
            {comment.user.name || comment.user.email.split('@')[0]}
          </span>
          <span className="text-xs text-gray-600">{formatRelativeDate(comment.createdAt)}</span>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">{comment.content}</p>
      </div>
    </div>
  );
}
