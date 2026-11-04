/**
 * Catch-all mock API for the standalone (no-backend) deploy.
 * Upstream, every one of these endpoints lives on the author's closed-source
 * blog-server. Here they are answered from local sample content
 * (server/utils/mock-blog.ts) so the site works fully on its own.
 *
 * Shape contract matches the frontend's api/request.ts:
 * success -> HTTP 200 { code: 200, bizCode: 200, data, message: 'success' }
 * auth    -> HTTP 401 { code: 401, message } (login-required features)
 */
import { defineEventHandler, getMethod, getQuery, readBody, setResponseStatus } from 'h3';

const ok = (data: unknown) => ({ code: 200, bizCode: 200, data, message: 'success' });

const emptyPage = (query: Record<string, any> = {}, body: Record<string, any> = {}) => {
  const page = Number(body.page ?? query.page ?? 1) || 1;
  const pageSize = Number(body.pageSize ?? query.pageSize ?? 10) || 10;
  return { list: [], pagination: { total: 0, page, pageSize, pages: 0 } };
};

export default defineEventHandler(async (event) => {
  const slug = (event.context.params?.slug || '').replace(/\/+$/, '');
  const method = getMethod(event).toUpperCase();
  const query = getQuery(event) as Record<string, any>;
  const body = method === 'POST' || method === 'PUT' || method === 'PATCH'
    ? ((await readBody(event).catch(() => ({}))) as Record<string, any>)
    : {};

  const unauthorized = (message = '本地演示版未启用登录') => {
    setResponseStatus(event, 401);
    return { code: 401, bizCode: 401, data: null, message };
  };

  // --- auth / account -------------------------------------------------------
  if (slug.startsWith('user/')) return unauthorized();

  // --- articles -------------------------------------------------------------
  if (slug === 'article/list' && method === 'POST') {
    const filtered = filterArticles({
      category: body.category,
      tags: body.tags,
      title: body.title,
      description: body.description,
      content: body.content,
    });
    const { list, pagination } = paginate(filtered.map(publicArticle), body.page, body.pageSize);
    return ok({ list, pagination });
  }

  if (slug === 'article/info') {
    const id = Number(query.id);
    const article = findArticle(id);
    if (!article) {
      setResponseStatus(event, 404);
      return { code: 404, bizCode: 404, data: null, message: '文章不存在或已下线' };
    }
    const { prev, next } = adjacentArticles(id);
    return ok({ info: { ...article, views: article.views + 1 }, prev, next });
  }

  if (slug === 'article/views' && method === 'POST') {
    const article = findArticle(Number(body.id));
    if (article) article.views += 1;
    return ok({ views: article?.views ?? 0 });
  }

  if (slug === 'article/archives') return ok(archiveTree());

  if (slug === 'article/related') {
    return ok({ list: relatedArticles(Number(query.id), Number(query.limit) || 6) });
  }

  if (slug === 'article/author-stats') {
    return ok({
      articleCount: mockArticles.length,
      views: mockArticles.reduce((sum, a) => sum + a.views, 0),
      likes: mockArticles.reduce((sum, a) => sum + a.likes, 0),
      commentCount: 0,
    });
  }

  // --- categories / tags ----------------------------------------------------
  if (slug === 'category') return ok(categoriesWithCount());
  if (/^category\/\d+$/.test(slug)) {
    const c = categoriesWithCount().find(x => x.id === Number(slug.split('/')[1]));
    return c ? ok(c) : ok(null);
  }
  if (slug === 'tag') return ok(tagsWithCount());
  if (/^tag\/\d+$/.test(slug)) {
    const t = tagsWithCount().find(x => x.id === Number(slug.split('/')[1]));
    return t ? ok(t) : ok(null);
  }

  // --- comments / likes / collects (read-only in this edition) --------------
  if (slug === 'comment/findAll') return ok(emptyPage(query));
  if (slug === 'like/check' || slug === 'collect/check') return ok({ checked: false });
  if (slug === 'like/my-ids') return ok({ ids: [] });
  if (slug === 'site/tip/list') return ok(emptyPage(query));
  if (slug === 'resources/register-avatars') return ok({ list: [] });

  // --- notifications --------------------------------------------------------
  if (slug === 'notification/unread-count') return ok({ count: 0 });
  if (slug === 'notification/list' || slug === 'notification/since') return ok(emptyPage(query));

  // --- RPG public level badge on article cards ------------------------------
  if (slug === 'rpg/public/status/batch') return ok({});

  // --- writes: this edition has no accounts, so nothing can be written ------
  if (method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE') {
    return unauthorized();
  }

  // --- everything else: benign empty payloads --------------------------------
  if (slug.includes('list') || slug.includes('findAll') || slug.endsWith('s')) {
    return ok(emptyPage(query));
  }
  return ok(null);
});
