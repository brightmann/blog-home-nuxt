/**
 * Local content store for the standalone (no-backend) deploy.
 * The upstream repo fetches everything from the author's closed-source
 * blog-server; this module replaces it with local sample content served
 * by server/routes/x-blog/api/v1/[...slug].ts.
 */

export interface MockTag {
  id: number;
  label: string;
  color: string;
  articleCount?: number;
}

export interface MockCategory {
  id: number;
  label: string;
  color: string;
  articleCount?: number;
}

export interface MockArticle {
  id: number;
  uid: number;
  title: string;
  description: string;
  content: string;
  contentHtml?: string;
  cover: string;
  createTime: string;
  uTime: string;
  views: number;
  likes: number;
  commentCount: number;
  top: number;
  topping?: number;
  checked: number;
  isMasterpiece?: number;
  articleLevel?: number;
  category: MockCategory;
  tags: MockTag[];
  userInfo: {
    id: number;
    nickname: string;
    avatar: string;
    intro: string;
    homepage?: string;
  };
}

const AUTHOR = {
  id: 1,
  nickname: 'Brite',
  avatar: '/images/avatar.svg',
  intro: '',
  homepage: '',
};

export const mockCategories: MockCategory[] = [
  { id: 1, label: '技术', color: '#3b82f6' },
  { id: 2, label: '生活', color: '#22c55e' },
  { id: 3, label: '随笔', color: '#f59e0b' },
];

export const mockTags: MockTag[] = [
  { id: 1, label: 'Nuxt', color: '#41b883' },
  { id: 2, label: 'Vue', color: '#42d392' },
  { id: 3, label: '前端', color: '#64748b' },
  { id: 4, label: '生活', color: '#22c55e' },
  { id: 5, label: 'Test', color: '#a855f7' },
];

const cat = (id: number) => mockCategories.find(c => c.id === id)!;
const tags = (...ids: number[]) => mockTags.filter(t => ids.includes(t.id));

export const mockArticles: MockArticle[] = [
  {
    id: 1,
    uid: 1,
    title: 'Welcome to Brite\'s Blog',
    description: 'The first post on this blog - what it is and how it is built.',
    cover: '/images/covers/c1.svg',
    createTime: '2026-10-20T09:00:00.000Z',
    uTime: '2026-10-20T09:00:00.000Z',
    views: 128,
    likes: 6,
    commentCount: 0,
    top: 0,
    topping: 1,
    checked: 0,
    category: cat(3),
    tags: tags(5),
    userInfo: AUTHOR,
    content: `# Welcome to Brite's Blog

This is the first post on this site.

## How it works

The blog is a static-content edition of the **blog-home-nuxt** template:
every article is stored inside the site itself, so it loads fast and
needs no database or external server.

## What you can do here

- Browse articles on the home page
- Filter by **category** or **tag**
- Read the **archives** by year and month
- Subscribe with **RSS** at \`/feed.xml\`

More posts coming soon.
`,
  },
  {
    id: 2,
    uid: 1,
    title: '测试',
    description: '这是一篇测试文章，用来检查中文内容的显示效果。',
    cover: '/images/covers/c2.svg',
    createTime: '2026-10-22T14:30:00.000Z',
    uTime: '2026-10-22T14:30:00.000Z',
    views: 86,
    likes: 3,
    commentCount: 0,
    top: 0,
    checked: 0,
    category: cat(3),
    tags: tags(5),
    userInfo: AUTHOR,
    content: `# 测试

这是一篇测试文章，用来检查中文内容的显示效果。

## 中文排版

博客支持中英文混排。这一段用来测试正文字体、行高和段落间距。

## 代码块

\`\`\`js
console.log('你好，世界');
\`\`\`

测试完成。
`,
  },
  {
    id: 3,
    uid: 1,
    title: 'Building a Blog with Nuxt 4',
    description:
      'Notes on how this site is put together: Nuxt 4, Vue 3, Tailwind CSS 4 and SSR on Render.',
    cover: '/images/covers/c3.svg',
    createTime: '2026-10-25T10:00:00.000Z',
    uTime: '2026-10-26T08:00:00.000Z',
    views: 215,
    likes: 12,
    commentCount: 0,
    top: 0,
    checked: 0,
    category: cat(1),
    tags: tags(1, 2, 3),
    userInfo: AUTHOR,
    content: `# Building a Blog with Nuxt 4

This site runs on **Nuxt 4** with server-side rendering.

## Stack

- **Nuxt 4** + Vue 3 + TypeScript
- **Tailwind CSS 4** + DaisyUI themes
- **Pinia** for state
- Markdown rendered with md-editor-v3

## Deployment

The app builds to a Node server (\`.output/server/index.mjs\`) and runs on
Render's free plan. Free sites sleep when idle, so the first visit can
take about a minute to wake up.
`,
  },
  {
    id: 4,
    uid: 1,
    title: 'Why Server-Side Rendering Matters',
    description:
      'SSR gives faster first paint and better SEO. Here is what that means in practice.',
    cover: '/images/covers/c4.svg',
    createTime: '2026-10-27T16:00:00.000Z',
    uTime: '2026-10-27T16:00:00.000Z',
    views: 154,
    likes: 8,
    commentCount: 0,
    top: 0,
    checked: 0,
    category: cat(1),
    tags: tags(1, 3),
    userInfo: AUTHOR,
    content: `# Why Server-Side Rendering Matters

## The problem with pure client-side apps

A plain SPA ships an empty HTML shell. The browser downloads the
JavaScript, runs it, fetches data, and only then shows the page.

## What SSR fixes

With SSR the server renders real HTML for each request:

1. First paint is fast - content is in the initial response.
2. Search engines can read the page without running JavaScript.
3. Sharing a link produces a proper preview.

After the HTML loads, the app **hydrates** and behaves like a normal SPA.
`,
  },
  {
    id: 5,
    uid: 1,
    title: 'A Quiet Weekend',
    description: 'Nothing big happened this weekend, and that was exactly the point.',
    cover: '/images/covers/c5.svg',
    createTime: '2026-10-31T09:30:00.000Z',
    uTime: '2026-10-31T09:30:00.000Z',
    views: 97,
    likes: 5,
    commentCount: 0,
    top: 0,
    checked: 0,
    category: cat(2),
    tags: tags(4),
    userInfo: AUTHOR,
    content: `# A Quiet Weekend

Nothing big happened this weekend, and that was exactly the point.

## Saturday

Coffee, a long walk, and a few chapters of a book I keep meaning to finish.

## Sunday

Cleaned up the desk, answered old messages, and planned the week ahead.

Sometimes a slow weekend is the most productive one.
`,
  },
  {
    id: 6,
    uid: 1,
    title: 'Markdown Rendering Test',
    description:
      'A quick tour of the markdown features this blog supports: lists, tables, quotes and code.',
    cover: '/images/covers/c6.svg',
    createTime: '2026-11-01T11:00:00.000Z',
    uTime: '2026-11-01T11:00:00.000Z',
    views: 64,
    likes: 2,
    commentCount: 0,
    top: 0,
    checked: 0,
    category: cat(1),
    tags: tags(3, 5),
    userInfo: AUTHOR,
    content: `# Markdown Rendering Test

## Text styles

**Bold**, *italic*, ~~strikethrough~~ and \`inline code\`.

## Quote

> The best way to predict the future is to invent it.

## Table

| Feature | Status |
| ------- | ------ |
| SSR     | Works  |
| RSS     | Works  |
| Archive | Works  |

## Code

\`\`\`ts
const greet = (name: string): string => \`Hello, \${name}!\`;
\`\`\`
`,
  },
 {
    id: 7,
    uid: 1,
    title: '战马',
    description: '这是一篇文章',
    cover: '/images/covers/c3.svg',
    createTime: '2026-11-03T21:37:00.000Z',
    uTime: '2026-11-03T21:37:00.000Z',
    views: 215,
    likes: 12,
    commentCount: 0,
    top: 0,
    checked: 0,
    category: cat(1),
    tags: tags(1, 2, 3),
    userInfo: AUTHOR,
    content: `<iframe width="713" height="401" src="https://www.youtube.com/embed/asKQbk7AcJU" title="崔伟立原唱《战马》完整版 歌曲旋律优美，句句入耳入心超好听" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
`,
  },
];

// Keep newest first, topped articles pinned to the front.
export const sortedArticles = (): MockArticle[] =>
  [...mockArticles].sort((a, b) => {
    if ((b.top || 0) !== (a.top || 0)) return (b.top || 0) - (a.top || 0);
    return new Date(b.createTime).getTime() - new Date(a.createTime).getTime();
  });

export const publicArticle = (a: MockArticle) => {
  const { content, contentHtml, ...rest } = a;
  return rest;
};

export const findArticle = (id: number) => mockArticles.find(a => a.id === id);

export const adjacentArticles = (id: number) => {
  const list = [...mockArticles].sort(
    (a, b) => new Date(a.createTime).getTime() - new Date(b.createTime).getTime(),
  );
  const idx = list.findIndex(a => a.id === id);
  const pick = (a?: MockArticle) => (a ? { id: a.id, title: a.title } : null);
  return { prev: pick(list[idx - 1]), next: pick(list[idx + 1]) };
};

export const relatedArticles = (id: number, limit = 6) => {
  const current = findArticle(id);
  if (!current) return [];
  const tagIds = new Set(current.tags.map(t => t.id));
  return sortedArticles()
    .filter(a => a.id !== id)
    .map(a => ({
      a,
      score:
        (a.category.id === current.category.id ? 1 : 0)
        + a.tags.filter(t => tagIds.has(t.id)).length,
    }))
    .filter(x => x.score > 0)
    .sort((x, y) => y.score - x.score)
    .slice(0, limit)
    .map(x => ({ id: x.a.id, title: x.a.title, description: x.a.description }));
};

export const archiveTree = () => {
  const byYear = new Map<
    string,
    Map<string, Array<{ id: number; title: string; createTime: string }>>
  >();
  for (const a of sortedArticles()) {
    const d = new Date(a.createTime);
    const year = String(d.getUTCFullYear());
    const month = `${d.getUTCMonth() + 1}月`;
    if (!byYear.has(year)) byYear.set(year, new Map());
    const months = byYear.get(year)!;
    if (!months.has(month)) months.set(month, []);
    months.get(month)!.push({ id: a.id, title: a.title, createTime: a.createTime });
  }
  return [...byYear.entries()]
    .sort(([y1], [y2]) => Number(y2) - Number(y1))
    .map(([year, months]) => ({ year, data: Object.fromEntries(months) }));
};

export const categoriesWithCount = () =>
  mockCategories.map(c => ({
    ...c,
    articleCount: mockArticles.filter(a => a.category.id === c.id).length,
  }));

export const tagsWithCount = () =>
  mockTags.map(t => ({
    ...t,
    articleCount: mockArticles.filter(a => a.tags.some(at => at.id === t.id)).length,
  }));

export const filterArticles = (opts: {
  category?: string | number;
  tags?: Array<string | number>;
  title?: string;
  description?: string;
  content?: string;
}) => {
  let list = sortedArticles();
  if (opts.category !== undefined && opts.category !== null && String(opts.category) !== '') {
    list = list.filter(a => a.category.id === Number(opts.category));
  }
  const tagIds = (opts.tags || []).map(Number).filter(n => n > 0);
  if (tagIds.length) {
    list = list.filter(a => tagIds.every(tid => a.tags.some(t => t.id === tid)));
  }
  const q = (opts.title || '').trim().toLowerCase();
  if (q) list = list.filter(a => a.title.toLowerCase().includes(q));
  const qd = (opts.description || '').trim().toLowerCase();
  if (qd) list = list.filter(a => a.description.toLowerCase().includes(qd));
  const qc = (opts.content || '').trim().toLowerCase();
  if (qc) list = list.filter(a => a.content.toLowerCase().includes(qc));
  return list;
};

export const paginate = <T>(list: T[], page = 1, pageSize = 10) => {
  const p = Math.max(1, Number(page) || 1);
  const ps = Math.max(1, Number(pageSize) || 10);
  const total = list.length;
  return {
    list: list.slice((p - 1) * ps, p * ps),
    pagination: { total, page: p, pageSize: ps, pages: Math.ceil(total / ps) },
  };
};
