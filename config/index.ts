const ViteEnv: any = import.meta.env;
const isEnv = ViteEnv.MODE === 'development';
let baseUrl: string;
let adminUrl: string;
let originUrl: string;
let apiPrefix: string;
// console.warn({ ViteEnv });
if (ViteEnv.MODE === 'production') {
  originUrl = ViteEnv.VITE_NUXT_ORIGIN_URL;
  apiPrefix = ViteEnv.VITE_NUXT_API_PREFIX;
  baseUrl = originUrl + apiPrefix;
  adminUrl = ViteEnv.VITE_NUXT_ADMIN_URL;
}
else {
  originUrl = ViteEnv.VITE_NUXT_ORIGIN_URL;
  apiPrefix = ViteEnv.VITE_NUXT_API_PREFIX;
  const prefixPath = ViteEnv.VITE_NUXT_PREFIX_PATH || '/blog-api';
  // 开发：浏览器走 Nitro devProxy（/blog-api → blog-server）；SSR 内部 $fetch 不经 devProxy，需直连 backend
  baseUrl = import.meta.server ? `${originUrl}${apiPrefix}` : prefixPath;
  adminUrl = ViteEnv.VITE_NUXT_ADMIN_URL;
}

/** 静态资源域名（开发走 Nuxt /static 代理；生产走网关前缀） */
const staticOriginUrl = ViteEnv.VITE_NUXT_STATIC_ORIGIN_URL || 'https://jiang-xia.top';
const staticBaseUrl = isEnv ? '' : `${staticOriginUrl}/x-api/blog-server`;

// Standalone edition: upstream's Baidu analytics script removed
// (it reported to the original author's tracking account).
const scripts: Array<Record<string, string>> = [];

interface configState {
  iconfonrUrl: string;
}
const config: configState = {
  // 阿里巴巴图标库（本地静态，避免 at.alicdn 不可用；更新图标后需重新下载覆盖）
  // 新增图标记得批量去色，不然修改不了图标颜色
  iconfonrUrl: '/js/cdn/iconfont.js',
};

export { baseUrl, originUrl, apiPrefix, adminUrl, isEnv, scripts, staticBaseUrl };
export default config;
