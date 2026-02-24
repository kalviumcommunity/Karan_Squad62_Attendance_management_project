const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string,
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      (errorData as { message?: string }).message || 'Request failed',
      errorData,
    );
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

// Auth API
export const authApi = {
  register: (data: { email: string; password: string; name?: string }) =>
    request<{ accessToken: string; refreshToken: string; user: User }>(
      '/auth/register',
      { method: 'POST', body: JSON.stringify(data) },
    ),

  login: (data: { email: string; password: string }) =>
    request<{ accessToken: string; refreshToken: string; user: User }>(
      '/auth/login',
      { method: 'POST', body: JSON.stringify(data) },
    ),

  refresh: (token: string) =>
    request<{ accessToken: string; refreshToken: string }>(
      '/auth/refresh',
      { method: 'POST' },
      token,
    ),
};

// Public API (no auth required)
export const publicApi = {
  getFeed: (page = 1, limit = 12) =>
    request<FeedResponse>(`/public/feed?page=${page}&limit=${limit}`),

  getBlog: (slug: string) =>
    request<BlogDetail>(`/public/blogs/${slug}`),
};

// Blog API (auth required)
export const blogApi = {
  create: (data: CreateBlogInput, token: string) =>
    request<Blog>('/blogs', { method: 'POST', body: JSON.stringify(data) }, token),

  update: (id: string, data: UpdateBlogInput, token: string) =>
    request<Blog>('/blogs/' + id, { method: 'PATCH', body: JSON.stringify(data) }, token),

  delete: (id: string, token: string) =>
    request<{ message: string }>('/blogs/' + id, { method: 'DELETE' }, token),

  list: (token: string) =>
    request<Blog[]>('/blogs', {}, token),

  get: (id: string, token: string) =>
    request<Blog>('/blogs/' + id, {}, token),

  like: (id: string, token: string) =>
    request<LikeResponse>('/blogs/' + id + '/like', { method: 'POST' }, token),

  unlike: (id: string, token: string) =>
    request<LikeResponse>('/blogs/' + id + '/like', { method: 'DELETE' }, token),

  getLikeStatus: (id: string, token: string) =>
    request<LikeResponse>('/blogs/' + id + '/like', {}, token),

  createComment: (id: string, content: string, token: string) =>
    request<Comment>('/blogs/' + id + '/comments', {
      method: 'POST',
      body: JSON.stringify({ content }),
    }, token),

  getComments: (id: string) =>
    request<Comment[]>('/blogs/' + id + '/comments'),
};

// Types
export interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  createdAt: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary?: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  _count: { likes: number; comments: number };
}

export interface BlogDetail extends Omit<Blog, '_count'> {
  author: Pick<User, 'id' | 'name' | 'email'>;
  likeCount: number;
  commentCount: number;
}

export interface FeedBlog {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  publishedAt?: string;
  author: Pick<User, 'id' | 'name' | 'email'>;
  likeCount: number;
  commentCount: number;
}

export interface FeedResponse {
  data: FeedBlog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: Pick<User, 'id' | 'name' | 'email'>;
}

export interface LikeResponse {
  liked: boolean;
  likeCount: number;
}

export interface CreateBlogInput {
  title: string;
  content: string;
  summary?: string;
  isPublished?: boolean;
}

export interface UpdateBlogInput {
  title?: string;
  content?: string;
  isPublished?: boolean;
}

export { ApiError };
