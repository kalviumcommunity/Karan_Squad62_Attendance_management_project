'use client';

import { useState, useEffect, use } from 'react';
import { useAuth } from '@/lib/auth';
import { blogApi, Blog } from '@/lib/api';
import { BlogEditor } from '@/components/blog/BlogEditor';
import { useRouter } from 'next/navigation';

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { accessToken, isLoading } = useAuth();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !accessToken) {
      router.push('/login');
    }
  }, [isLoading, accessToken, router]);

  useEffect(() => {
    if (!accessToken) return;
    blogApi.get(id, accessToken)
      .then(setBlog)
      .catch(() => router.push('/dashboard'))
      .finally(() => setLoading(false));
  }, [id, accessToken, router]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="h-10 skeleton rounded" />
        <div className="h-96 skeleton rounded" />
      </div>
    );
  }

  if (!blog) return null;
  return <BlogEditor existingBlog={blog} />;
}
