// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';
import { buildThemeBootScript } from './constants/theme-tone';
import { scripts } from './config';
import { SiteTitle } from './utils/constant';
import { mockArticles } from './server/utils/mock-blog';

const prefixPath = process.env.VITE_NUXT_PREFIX_PATH || '/api';
const originUrl = process.env.VITE_NUXT_ORIGIN_URL || '';
const apiPrefix = process.env.VITE_NUXT_API_PREFIX || '';
const proxyTarget = originUrl && apiPrefix ? `${originUrl}${apiPrefix}` : '';
// const configs = Object.keys(process.env)
//   .filter(k => k.toLocaleUpperCase().includes('VITE'))
//   .map((k) => {
//     return {
//       [k]: process.env[k],
//     };
//   });
console.warn('当前环境: ', process.env.VITE_ENV);
// 子集字体 cache bust；npm run font:subset 且字符集变化后递增
const FONT_SUBSET_VERSION = '1';

// Static (GitHub Pages) build: article list shows 5 posts per page (see
// components/article-list.vue), so /page/2..N must be prerendered explicitly.
const STATIC_PAGE_SIZE = 5;
const staticPageCount = Math.max(1, Math.ceil(mockArticles.length / STATIC_PAGE_SIZE));
const staticPaginationRoutes = Array.from({ length: staticPageCount - 1 }, (_, i) => `/page/${i + 2}`);
// console.warn({ 当前环境自定义配置: configs });
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxtjs/sitemap',
    '~/modules/inspria-ui',
    '@pinia/nuxt',
    '@nuxt/ui',
  ],
  // 生产包剔除 console / debugger；控制台彩蛋见 plugins/console-egg.client.ts（间接调用，不受 drop 影响）
  $production: {
    vite: {
      esbuild: {
        drop: ['console', 'debugger'],
      },
    },
  },
  devtools: { enabled: false },
  app: {
    // GitHub Pages project site builds pass NUXT_APP_BASE_URL=/blog-home-nuxt/
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      link: [
        {
          // 与 styles/base/app.less 中 @font-face 的 ?v= 保持一致
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: `/fonts/HarmonyOS_Sans_SC_Subset.woff2?v=${FONT_SUBSET_VERSION}`,
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          as: 'style',
          href: '/css/cdn/csshake.min.css',
          onload: 'this.rel=\'stylesheet\';',
          // 需设置rel=stylesheet 不然不是样式,不生效
          /* rel: 'stylesheet',
          media: 'print',
          onload: 'this.media=\'all\'', 另一种方法 */
          // https://www.filamentgroup.com/lab/load-css-simpler/
        },
      ],
      script: [
        { innerHTML: buildThemeBootScript(), key: 'theme-boot', tagPriority: 'critical' },
        ...scripts,
      ],
    },
    pageTransition: {
      name: 'fade',
      mode: 'out-in',
    },
  },
  css: ['~/assets/css/main.css'],
  site: {
    url: originUrl || 'https://jiang-xia.top',
    name: SiteTitle,
  },
  ui: {
    prefix: 'U',
    fonts: false,
  },
  runtimeConfig: {
    aiSummaryApiKey: process.env.AI_SUMMARY_API_KEY || '',
    public: {},
  },
  build: {
    // 打包配置
    transpile: ['md-editor-v3', '@lucky-canvas/vue', 'lucky-canvas', 'vue-demi'], // 预编译大型依赖
  },
  routeRules: {
    '/tool': { redirect: '/tool/sm' },
    '/photos': { redirect: '/tool/photos' },
    // Standalone edition: RPG gamification needs the upstream backend's
    // accounts/payments, so its pages redirect home.
    '/rpg': { redirect: '/' },
    '/rpg/**': { redirect: '/' },
  },
  devServer: {
    // 证书安装 https://zhuanlan.zhihu.com/p/678165318
    https: false,
  },
  compatibilityDate: '2025-07-14',
  // 此文件只能用process
  nitro: {
    // Prerendering only for the static GitHub Pages build (NUXT_APP_BASE_URL
    // set by the Pages workflow); the Render SSR build skips it entirely.
    prerender: process.env.NUXT_APP_BASE_URL
      ? {
          crawlLinks: true,
          failOnError: false,
          // /page/N uses router.push (no <a> hrefs), so the crawler cannot find
          // paginated routes; list them explicitly from the mock article count.
          routes: ['/', ...staticPaginationRoutes],
        }
      : { crawlLinks: false, routes: [] },
    output: {
      // dir: '', // 这个是配置总的输出路径
      // serverDir: '.output/server',
      // publicDir: '.output/public',
    },
    // 配置代理
    devProxy: {
      [prefixPath]: {
        target: proxyTarget,
        changeOrigin: true,
        rewrite: (path: string) => path.replace(new RegExp(`^${prefixPath}`), ''),
      },
      // 本地上传封面/头像：/static → blog-server:5000（与生产 /x-api/blog-server/static 对应）
      '/static': {
        target: originUrl || 'http://localhost:5000',
        changeOrigin: true,
      },
    },
    compressPublicAssets: {
      // 只压缩output/public目录的文件
      gzip: true,
      brotli: true,
    },
    // 优化 Nitro 构建
    minify: true,
    sourceMap: false, // 生产环境关闭 sourceMap
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      minify: 'esbuild',
      // 优化构建性能
      target: 'esnext',
    },
    // 优化依赖预构建
    optimizeDeps: {
      include: ['md-editor-v3', 'crypto-js'],
      // jSquash / hash-wasm 的 WASM 不可被预构建，否则路径解析失败
      exclude: ['@jsquash/webp', '@jsquash/jpeg', 'hash-wasm'],
    },
    // module worker 需 es 格式，才能 import @jsquash/webp
    worker: {
      format: 'es',
    },
    // 减少不必要的处理
    css: {
      devSourcemap: false,
    },
  },
  eslint: {
    config: {
      stylistic: {
        indent: 2, // 缩进
        semi: true, // 分号
        quotes: 'single', // 单引号
        jsx: true, // 支持jsx
      },
    },
  },
  sitemap: {
    sources: ['/api/__sitemap__/urls'],
    // 排除无参重定向页、登录注册、pages 下误收录的工具源码路径
    exclude: [
      '/404',
      '/login',
      '/register',
      '/detail',
      '/user/article/**',
      '/user/profile',
      '/tool/**/components/**',
      '/tool/components/**',
      '/tool/upload-slice/worker',
      new RegExp('^/tool/photos/(constants|photo-)'),
    ],
  },
  stylelint: {/* module options */},
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
});
