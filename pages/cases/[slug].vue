<script setup>
import { COMPANY_INFO } from '~/composables/constants'

const route = useRoute()
const slug = route.params.slug
const { getCaseBySlug, fetchCases, getRelatedItems } = useArticles()

// 1. 获取当前案例 (优先从缓存或直接查询)
const { data: caseItem } = await useAsyncData(`case-${slug}`, () => getCaseBySlug(slug))

if (!caseItem.value) {
  throw createError({ statusCode: 404, message: '案例未找到', fatal: true })
}

// 2. 关键点：必须加载案例全量列表，否则推荐函数没数据可筛
// fetchCases 内部有缓存，如果是从列表页跳过来的，这里几乎不耗时
await useAsyncData('cases-all-list', () => fetchCases())

// 3. 计算相关案例
const relatedCases = computed(() => {
  return getRelatedItems(slug, caseItem.value.category, 'cases', 6)
})

// 4. 计算上下篇
const { cases: allCases } = useArticles()
const currentIndex = computed(() => allCases.value.findIndex(c => c.slug === slug || c._path?.endsWith(slug)))
const prevArticle = computed(() => currentIndex.value > 0 ? allCases.value[currentIndex.value - 1] : null)
const nextArticle = computed(() => (currentIndex.value !== -1 && currentIndex.value < allCases.value.length - 1) ? allCases.value[currentIndex.value + 1] : null)

const breadcrumbItems = [
  { name: '首页', path: '/' },
  { name: '客户案例', path: '/cases' },
  { name: caseItem.value.title, path: route.path }
]

const formatDate = (date) => date ? new Date(date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }) : ''


// 3. 语义化 SEO 字段
const pageTitle = `${caseItem.value.title}_跨境物流成功案例_${COMPANY_INFO.name}`
const pageDesc = caseItem.value.description || `${COMPANY_INFO.name}分享关于${caseItem.value.category}的物流操作案例。涵盖运输路线、清关流程及成本控制方案。`

// 结构化数据 (JSON-LD)
const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  'headline': caseItem.value.title,
  'description': pageDesc,
  'image': [caseItem.value.image ? (COMPANY_INFO.domain + caseItem.value.image) : ''],
  'datePublished': caseItem.value.date,
  'author': {
    '@type': 'Organization',
    'name': COMPANY_INFO.name,
    'url': COMPANY_INFO.domain
  },
  'publisher': {
    '@type': 'Organization',
    'name': COMPANY_INFO.name,
    'logo': {
      '@type': 'ImageObject',
      'url': COMPANY_INFO.domain + '/logo.png'
    }
  }
}
</script>

<template>
  <div class="case-detail-page">
    <BaseSeo :title="pageTitle" :description="pageDesc" :jsonLd="articleJsonLd" />
    <div class="container">
      <Breadcrumb :items="breadcrumbItems" />
      
      <article class="case-article">
        <header class="article-header">
          <h1 class="article-title">{{ caseItem.title }}</h1>
          <div class="article-meta">
            <span>发布日期：{{ formatDate(caseItem.date) }}</span>
            <span v-if="caseItem.category" class="tag">{{ caseItem.category }}</span>
          </div>
        </header>

        <div v-if="caseItem.image" class="article-image">
          <NuxtImg :src="caseItem.image" :alt="caseItem.title" loading="eager" />
        </div>
        
        <ArticleRenderer :content="caseItem" />

        <ArticleNavigation 
          :prev-article="prevArticle" 
          :next-article="nextArticle" 
          base-url="/cases"
        />

        <RelatedArticles 
          v-if="relatedCases.length > 0"
          :articles="relatedCases" 
          base-url="/cases" 
          title="相关文章"
        />
      </article>
    </div>
  </div>
</template>

<style scoped>
.case-detail-page { 
  padding: 1rem 0; 
  background: #ffffff; /* 改为纯白背景，符合图片风格 */
}

/* 关键修改：取消 850px 限制，让它跟随 container 的宽度 */
.case-article {
  max-width: 1200px; /* 这里的宽度应与 container 一致 */
  margin: 0 auto;
  padding: 2rem 0;  /* 移除阴影和圆角，仅保留垂直间距 */
}

.article-header { 
  margin-bottom: 2rem; 
  padding-bottom: 2rem; 
}

.article-title { 
  font-size: 2.25rem; 
  margin-bottom: 1.5rem; 
  color: #333; 
  font-weight: 700; 
}

.article-meta { 
  display: flex; 
  gap: 1.5rem; 
  color: #999; 
  font-size: 0.9rem; 
}

/* 标签样式调整 (对应图片中的小胶囊样式) */
.tag {
  background: #f0f4ff;
  color: #555;
  padding: 2px 12px;
  border-radius: 50px;
  font-size: 0.8rem;
}

.article-image { 
  margin-bottom: 3rem; 
  border-radius: 4px; /* 减小圆角，更显专业 */
  overflow: hidden; 
}

.article-image img { 
  width: 100%; 
  height: auto; 
}

@media (max-width: 992px) {
  .case-article { padding: 1.5rem; }
  .article-title { font-size: 1.75rem; }
}
</style>