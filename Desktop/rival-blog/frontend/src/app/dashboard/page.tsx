'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/lib/auth';
import { blogApi, Blog } from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PenSquare, Trash2, Eye, EyeOff, Plus, Heart, MessageCircle, Edit, LayoutDashboard } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const { user, accessToken, isLoading } = useAuth();
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const loadBlogs = useCallback(async () => {
    if (!accessToken) return;
    try {
      const res = await blogApi.list(accessToken);
      setBlogs(res);
    } catch {
      // handle
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) loadBlogs();
  }, [accessToken, loadBlogs]);

  const handleDelete = async (id: string) => {
    if (!accessToken || !confirm('Delete this blog? This cannot be undone.')) return;
    setDeleting(id);
    try {
      await blogApi.delete(id, accessToken);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } finally {
      setDeleting(null);
    }
  };

  const handleTogglePublish = async (blog: Blog) => {
    if (!accessToken) return;
    const updated = await blogApi.update(blog.id, { isPublished: !blog.isPublished }, accessToken);
    setBlogs((prev) => prev.map((b) => (b.id === blog.id ? updated : b)));
  };

  if (isLoading || !user) return null;

  const publishedCount = blogs.filter((b) => b.isPublished).length;
  const draftCount = blogs.length - publishedCount;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20">
            <LayoutDashboard className="h-5 w-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">My Blogs</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-500">{blogs.length} total</span>
              <span className="text-gray-700">·</span>
              <span className="text-xs text-emerald-500">{publishedCount} published</span>
              <span className="text-gray-700">·</span>
              <span className="text-xs text-gray-500">{draftCount} drafts</span>
            </div>
          </div>
        </div>
        <Link href="/dashboard/new" className="btn-primary">
          <Plus className="h-4 w-4" />
          New blog
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card p-5 skeleton h-[72px]" />
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center card py-20 border-dashed border-white/[0.08]">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 mx-auto mb-4">
            <PenSquare className="h-7 w-7 text-gray-600" />
          </div>
          <h2 className="text-lg font-medium text-gray-400 mb-2">No blogs yet</h2>
          <p className="text-sm text-gray-600 mb-6">Start writing your first post!</p>
          <Link href="/dashboard/new" className="btn-primary">
            <Plus className="h-4 w-4" />
            Write something
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {blogs.map((blog, i) => (
            <div
              key={blog.id}
              className="card-hover p-4 flex items-center gap-4 animate-slide-up"
              style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'backwards' }}
            >
              {/* Status indicator */}
              <div
                className={cn(
                  'flex-shrink-0 w-2 h-2 rounded-full ring-2',
                  blog.isPublished
                    ? 'bg-emerald-400 ring-emerald-400/20'
                    : 'bg-gray-600 ring-gray-600/20',
                )}
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-200 truncate">{blog.title}</h3>
                <div className="flex items-center gap-3 mt-1.5">
                  <span
                    className={cn(
                      blog.isPublished
                        ? 'badge-success'
                        : 'badge-neutral',
                    )}
                  >
                    {blog.isPublished ? 'Published' : 'Draft'}
                  </span>
                  <span className="text-xs text-gray-600">{formatDate(blog.updatedAt)}</span>
                  <div className="flex items-center gap-2.5 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" /> {blog._count.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" /> {blog._count.comments}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href={`/dashboard/${blog.id}`}
                  className="btn-secondary text-xs py-1.5"
                >
                  <Edit className="h-3.5 w-3.5" />
                  Edit
                </Link>

                <button
                  onClick={() => handleTogglePublish(blog)}
                  className="btn-secondary text-xs py-1.5"
                  title={blog.isPublished ? 'Unpublish' : 'Publish'}
                >
                  {blog.isPublished ? (
                    <><EyeOff className="h-3.5 w-3.5" /> Unpublish</>
                  ) : (
                    <><Eye className="h-3.5 w-3.5" /> Publish</>
                  )}
                </button>

                <button
                  onClick={() => handleDelete(blog.id)}
                  disabled={deleting === blog.id}
                  className="btn-danger text-xs py-1.5"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
