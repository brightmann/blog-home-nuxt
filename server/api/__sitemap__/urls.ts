/**
 * Sitemap 动态 URL 源：博客文章详情。
 * Standalone edition: articles come from the local content store
 * (server/utils/mock-blog.ts); the upstream RPG leaderboard is gone.
 */
export default defineSitemapEventHandler(async () => {
  return mockArticles.map(a => `/detail/${a.id}`);
});
