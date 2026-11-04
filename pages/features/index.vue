<script setup lang="ts">
import { SiteTitle, TOOL_LINKS } from '@/utils/constant';

useHead({
  title: '特性',
  titleTemplate: title => `${title} - ${SiteTitle}`,
});

interface FeatureModule {
  icon: string;
  title: string;
  desc: string;
  tags: string[];
  to?: string;
  color: string;
  span?: string;
  highlight?: boolean;
}

const coreModules: FeatureModule[] = [
  {
    icon: '📝',
    title: '文章系统',
    desc: 'Markdown 编辑与预览、分类标签、全文检索、按时间归档，支持用户前台创作与管理。',
    tags: ['Markdown', '归档', '标签'],
    to: '/archives',
    color: 'from-blue-500 to-cyan-500',
    span: 'md:col-span-6',
  },
  {
    icon: '💬',
    title: '评论与互动',
    desc: '文章评论与回复、收藏点赞（需登录），互动数据让文章更有活力。',
    tags: ['评论', '收藏', '点赞'],
    to: '/',
    color: 'from-violet-500 to-purple-500',
    span: 'md:col-span-6',
  },
  {
    icon: '👤',
    title: '用户中心',
    desc: '个人资料编辑、前台文章创作、公开主页展示互动记录。',
    tags: ['注册登录', '个人主页', '发文'],
    to: '/user/profile',
    color: 'from-emerald-500 to-teal-500',
    span: 'md:col-span-4',
  },
  {
    icon: '🔗',
    title: '友链与留言',
    desc: '友情链接申请与展示、树形留言板，支持回复。',
    tags: ['友链', '留言板'],
    to: '/msgboard',
    color: 'from-pink-500 to-rose-500',
    span: 'md:col-span-4',
  },
  {
    icon: '📊',
    title: '项目展示',
    desc: '嵌入 Blog Admin、Zone 等多端演示，扫码体验 App / H5 / 小程序。',
    tags: ['Demo', '多端'],
    to: '/projects',
    color: 'from-slate-500 to-zinc-500',
    span: 'md:col-span-4',
  },
];

const experienceModules: FeatureModule[] = [
  {
    icon: '🤖',
    title: 'AI 文章摘要',
    desc: '多风格、多长度 AI 摘要生成，支持历史记录与 Markdown 导出。',
    tags: ['AI', 'DeepSeek'],
    to: '/tool/ai-summary',
    color: 'from-cyan-500 to-blue-500',
    span: 'md:col-span-6',
  },
  {
    icon: '🎨',
    title: '多主题切换',
    desc: '内置 30+ 种 DaisyUI 主题，导航栏一键切换，浅色 / 深色 / 赛博风随心选。',
    tags: ['DaisyUI', '个性化'],
    to: '/',
    color: 'from-indigo-500 to-violet-500',
    span: 'md:col-span-6',
  },
  {
    icon: '📖',
    title: '阅读进度环',
    desc: '文章页可视化阅读进度、目录跳转与剩余时间估算。',
    tags: ['阅读体验'],
    to: '/archives',
    color: 'from-green-500 to-emerald-500',
    span: 'md:col-span-6',
  },
  {
    icon: '📡',
    title: '实时推送',
    desc: 'Socket.IO /realtime 命名空间，站内通知等即时推送。',
    tags: ['WebSocket'],
    to: '/',
    color: 'from-red-500 to-orange-500',
    span: 'md:col-span-6',
  },
];

const toolCount = TOOL_LINKS.length;
</script>

<template>
  <CyberPageContainer
    label="FEATURES"
    title="博客系统特性"
    subtitle="内容创作、实用工具与交互体验，一站俱全"
  >

    <!-- 博客核心 -->
    <CyberSectionHeader
      class="mb-4"
      align="left"
      label="CORE"
      title="博客核心"
      subtitle="内容创作与社区互动的基础能力"
    />
    <div class="mb-10 grid grid-cols-1 gap-4 md:grid-cols-12">
      <NuxtLink
        v-for="item in coreModules"
        :key="item.title"
        :to="item.to || '/'"
        :class="['group no-underline', item.span]"
      >
        <CyberCard hover class="flex h-full flex-col !p-5">
          <div
            :class="[
              'mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-lg',
              item.color,
            ]"
          >
            {{ item.icon }}
          </div>
          <h3
            class="mb-2 text-lg font-semibold text-tech group-hover:text-primary transition-colors"
          >
            {{ item.title }}
          </h3>
          <p class="mb-3 flex-1 text-sm leading-relaxed text-tech-muted">
            {{ item.desc }}
          </p>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="tag in item.tags" :key="tag" class="cyber-feature-tag">{{ tag }}</span>
          </div>
        </CyberCard>
      </NuxtLink>
    </div>

    <!-- 交互体验 -->
    <CyberSectionHeader
      class="mb-4"
      align="left"
      label="EXPERIENCE"
      title="交互体验"
      subtitle="AI、视觉特效与实时通信增强使用感受"
    />
    <div class="mb-10 grid grid-cols-1 gap-4 md:grid-cols-12">
      <NuxtLink
        v-for="item in experienceModules"
        :key="item.title"
        :to="item.to || '/'"
        :class="['group no-underline', item.span]"
      >
        <CyberCard hover class="flex h-full flex-col !p-5">
          <div
            :class="[
              'mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-lg',
              item.color,
            ]"
          >
            {{ item.icon }}
          </div>
          <h3 class="mb-2 font-semibold text-tech group-hover:text-primary transition-colors">
            {{ item.title }}
          </h3>
          <p class="mb-3 flex-1 text-sm text-tech-muted">{{ item.desc }}</p>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="tag in item.tags" :key="tag" class="cyber-feature-tag">{{ tag }}</span>
          </div>
        </CyberCard>
      </NuxtLink>
    </div>

    <!-- 工具箱 -->
    <CyberSectionHeader
      class="mb-4"
      align="left"
      label="TOOLBOX"
      :title="`实用工具箱 · ${toolCount} 款工具`"
      subtitle="加密、AI、多媒体、开发调试，Web 端开箱即用"
    />
    <CyberCard class="mb-10 !p-4 md:!p-6">
      <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <NuxtLink
          v-for="tool in TOOL_LINKS"
          :key="tool.path"
          :to="tool.path"
          class="group flex items-center gap-2 rounded-xl border border-tech bg-tech-header px-3 py-2.5 text-sm text-tech-muted no-underline transition-all hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
        >
          <xia-icon :icon="tool.icon" class="shrink-0 opacity-70 group-hover:opacity-100" />
          <span class="truncate">{{ tool.title }}</span>
        </NuxtLink>
      </div>
      <div class="mt-4 text-center">
        <NuxtLink to="/tool" class="no-underline">
          <CyberButton variant="secondary">进入工具箱</CyberButton>
        </NuxtLink>
      </div>
    </CyberCard>

    <!-- 快速开始 -->
    <CyberSectionHeader
      class="mb-4"
      align="left"
      label="GET STARTED"
      title="三步开始"
      subtitle="注册登录后即可畅享全部特性"
    />
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <CyberCard
        v-for="(step, i) in [
          { title: '浏览与阅读', desc: '首页发现文章，归档按时间浏览，详情页收藏点赞。' },
          { title: '注册互动', desc: '注册登录后评论、收藏与点赞文章。' },
          { title: '创作与工具', desc: '个人中心发文，工具箱使用 AI 摘要、加密等效率工具。' },
        ]"
        :key="step.title"
        class="!p-6 text-center"
      >
        <div
          class="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-lg font-bold text-primary"
        >
          {{ i + 1 }}
        </div>
        <h4 class="mb-2 font-semibold text-tech">
          {{ step.title }}
        </h4>
        <p class="text-sm text-tech-subtle">
          {{ step.desc }}
        </p>
      </CyberCard>
    </div>
  </CyberPageContainer>
</template>
