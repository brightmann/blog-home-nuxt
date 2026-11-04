import { setStaticAppBase } from '@/utils/static-url';

/** 将 app.baseURL 写入静态资源解析器（GitHub Pages 子路径部署时，图片等 public 资源需带前缀） */
export default defineNuxtPlugin(() => {
  setStaticAppBase(useRuntimeConfig().app.baseURL);
});
