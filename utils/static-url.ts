import { staticBaseUrl } from '~/config';

let appBaseUrl = '/';

/** 由插件在应用启动时写入 app.baseURL（GitHub Pages 子路径部署时如 /blog-home-nuxt/） */
export const setStaticAppBase = (base: string) => {
  appBaseUrl = base || '/';
};

/** 当前部署的 app.baseURL（/ 表示根路径部署，如 Render；子路径表示 GitHub Pages 静态部署） */
export const getStaticAppBase = (): string => appBaseUrl;

/** 将 /static 路径解析为可访问的完整 URL */
export const resolveStaticUrl = (path = ''): string => {
  if (!path) return '';
  if (path.startsWith('http') || path.includes('base64')) return path;
  if (path.startsWith('/static')) {
    return `${staticBaseUrl}${path}`;
  }
  // GitHub Pages 项目站点部署在子路径：根相对的 public 资源需补 app.baseURL；Render 为 / 时原样返回
  if (path.startsWith('/') && !path.startsWith('//')) {
    return appBaseUrl === '/' ? path : `${appBaseUrl.replace(/\/+$/, '')}${path}`;
  }
  return path;
};
