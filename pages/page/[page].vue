<script setup lang="ts">
/**
   * 分页路由 /page/N：与首页文章列表同源，真实 URL，直达/刷新可用
   * /page/1 重定向回首页；非数字页码 404
   */
import { SiteTitle } from '@/utils/constant';

definePageMeta({ key: (route: any) => route.fullPath });

const route = useRoute();
const raw = String(route.params.page ?? '');
if (!/^\d+$/.test(raw)) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' });
}
const pageNum = Math.max(1, Number(raw));
if (pageNum === 1) {
  await navigateTo('/', { redirectCode: 302 });
}

useHead({
  title: `文章 - 第 ${pageNum} 页`,
  titleTemplate: title => `${title} - ${SiteTitle}`,
});
</script>

<template>
  <div class="mx-auto max-w-6xl px-3 pb-16 pt-8 sm:px-4">
    <CyberSectionHeader
      class="mb-6"
      label="ARTICLES"
      title="最新文章"
      :subtitle="`技术分享与生活记录 · 第 ${pageNum} 页`"
    />
    <div class="cyber-glass-card overflow-visible p-2 sm:p-4 md:p-6">
      <ArticleList :initial-page="pageNum" />
    </div>
  </div>
</template>
