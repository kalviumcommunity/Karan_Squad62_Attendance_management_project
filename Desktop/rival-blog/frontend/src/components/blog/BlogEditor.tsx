'use client';

import { useState, FormEvent } from 'react';
import { blogApi, CreateBlogInput, Blog } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { ApiError } from '@/lib/api';
import { Save, Send, ArrowLeft, FileText } from 'lucide-react';
import Link from 'next/link';

interface BlogEditorProps {
  existingBlog?: Blog;
}

export function BlogEditor({ existingBlog }: BlogEditorProps) {
  const { accessToken } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    title: existingBlog?.title ?? '',
    content: existingBlog?.content ?? '',
    summary: existingBlog?.summary ?? '',
    isPublished: existingBlog?.isPublished ?? false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const save = async (publish?: boolean) => {
    if (!accessToken) return;
    setSaving(true);
    setError('');

    const data: CreateBlogInput & { summary?: string } = {
      title: form.title,
      content: form.content,
      isPublished: publish ?? form.isPublished,
      ...(form.summary.trim() && { summary: form.summary.trim() }),
    };

    try {
      if (existingBlog) {
        await blogApi.update(existingBlog.id, data, accessToken);
      } else {
        await blogApi.create(data, accessToken);
      }
      router.push('/dashboard');
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to save blog');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    save();
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/dashboard" className="text-gray-500 hover:text-gray-300 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-indigo-400" />
          <h1 className="text-xl font-bold text-white">
            {existingBlog ? 'Edit blog' : 'New blog'}
          </h1>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400 animate-scale-in">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input
            type="text"
            className="input text-xl font-semibold !bg-transparent !border-white/[0.06] !py-3 focus:!border-indigo-500/50"
            placeholder="Your post title..."
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            minLength={3}
            maxLength={200}
          />
        </div>

        <div>
          <input
            type="text"
            className="input text-sm !bg-transparent !border-white/[0.06] focus:!border-indigo-500/50"
            placeholder="Short summary (shown on feed cards)..."
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
            maxLength={500}
          />
          <p className="mt-1 text-xs text-gray-600">Optional — displayed on feed cards</p>
        </div>

        <div>
          <textarea
            className="input min-h-[400px] resize-y font-mono text-sm leading-relaxed !bg-white/[0.02] !border-white/[0.06] focus:!border-indigo-500/50"
            placeholder="Write your post content here..."
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            required
            minLength={10}
          />
          <p className="mt-1 text-xs text-gray-600">{form.content.length} characters</p>
        </div>

        <div className="divider" />

        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              className="rounded border-white/20 bg-white/5 text-indigo-600 focus:ring-indigo-500/20 focus:ring-offset-0"
              checked={form.isPublished}
              onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
            />
            <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Published</span>
          </label>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => save(false)}
              disabled={saving}
              className="btn-secondary"
            >
              <Save className="h-4 w-4" />
              Save draft
            </button>
            <button
              type="button"
              onClick={() => save(true)}
              disabled={saving}
              className="btn-primary"
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Saving...
                </span>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  {form.isPublished ? 'Update' : 'Publish'}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
