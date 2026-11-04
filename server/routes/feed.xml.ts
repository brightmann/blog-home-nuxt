/**
 * RSS 订阅 feed.xml
 * Standalone edition: items come from the local content store
 * (server/utils/mock-blog.ts) instead of the upstream blog-server.
 */
import { getRequestURL } from 'h3';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const origin = config.public.siteOrigin || getRequestURL(event).origin;

  const articles = sortedArticles().slice(0, 50);

  const escapeXml = (str: string) =>
    String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  const items = articles
    .map((a) => {
      const link = `${origin}/detail/${a.id}`;
      const pubDate = new Date(a.uTime || a.createTime || Date.now()).toUTCString();
      return `<item>
  <title>${escapeXml(a.title)}</title>
  <link>${link}</link>
  <guid isPermaLink="true">${link}</guid>
  <description>${escapeXml(a.description || a.title)}</description>
  <pubDate>${pubDate}</pubDate>
</item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Brite's Blog</title>
  <link>${origin}</link>
  <description>Brite's Blog</description>
  <language>zh-CN</language>
  ${items}
</channel>
</rss>`;

  event.node.res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
  return xml;
});
