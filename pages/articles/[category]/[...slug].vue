<template>
  <div class="article-detail-page">
    <BaseSeo 
      :title="pageTitle" 
      :description="pageDesc" 
      :jsonLd="articleJsonLd"
    />
    <div class="container">
      <ClientOnly>
        <Breadcrumb v-if="article" :items="breadcrumbItems" />
      </ClientOnly>
      
      <article class="article-article" v-if="article">
        <header class="article-header">
          <span class="article-category">{{ categoryDisplayName }}</span>
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="article-meta">
            <span class="article-date">{{ formatDate(article.date) }}</span>
            <span class="article-tags" v-if="article.tags?.length">
              <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
            </span>
          </div>
        </header>
        
        <div v-if="article.image" class="article-image">
          <NuxtImg 
            :src="article.image" 
            :alt="article.title"
            loading="lazy"
            width="800"
          />
        </div>
        
        <div class="article-content">
          <ContentRenderer :value="article" />
        </div>
      </article>

      <ArticleNavigation 
        v-if="article && (prev || next)"
        :prev-article="prev"
        :next-article="next"
        :base-url="`/articles/${route.params.category}`"
      />

      <RelatedArticles 
        v-if="article && relatedArticles?.length"
        :articles="relatedArticles"
        :base-url="`/articles/${route.params.category}`" 
          title="相关文章"
      />
    </div>
  </div>
</template>

<script setup>
import { COMPANY_INFO } from '~/composables/constants'

const route = useRoute()
const { fetchArticleDetail, fetchArticleContext, fetchRelatedArticles } = useContents()

// 1. 处理路径：确保路径格式为 /articles/category/slug
const categoryParam = route.params.category
const slugParam = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug
console.log(categoryParam, slugParam);

// 2. 获取当前文章
const { data: article } = await useAsyncData(`article-detail-${slugParam}`, () => 
  fetchArticleDetail(slugParam, categoryParam)
)


if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: '文章未找到', fatal: true })
}

// 3. 分类显示逻辑
const categoryMap = {
  industry: '行业新闻',
  company: '公司动态',
  knowledge: '知识百科'
}
const categoryDisplayName = computed(() => {
  return article.value?.category || categoryMap[categoryParam] || '资讯中心'
})

// 4. 获取上下篇文章
const { data: surround } = await useAsyncData(
  `article-context-${slugParam}`,
  () => fetchArticleContext(article.value._path)
)
const prev = computed(() => surround.value?.[0])
const next = computed(() => surround.value?.[1])

// 5. 获取相关文章
const { data: relatedArticles } = await useAsyncData(
  `related-articles-${slugParam}`,
  () => fetchRelatedArticles(slugParam, categoryParam)
)

// 6. 面包屑
const breadcrumbItems = computed(() => [
  { name: '首页', path: '/' },
  { name: '资讯中心', path: '/articles' },
  { name: categoryDisplayName.value, path: `/articles/${categoryParam}` },
  { name: article.value?.title, path: route.path }
])

// 7. 动态 Title / Description
const pageTitle = computed(() => `${article.value?.title} - ${categoryDisplayName.value} - ${COMPANY_INFO.name}`)
const pageDesc = computed(() => article.value?.description || article.value?.title)

// 8. JsonLd 结构化数据
const articleJsonLd = computed(() => {
  if (!article.value) return {}
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${COMPANY_INFO.domain}${route.path}#article`,
        "headline": article.value.title,
        "description": pageDesc.value,
        "image": article.value.image ? [article.value.image] : [],
        "datePublished": article.value.date,
        "dateModified": article.value.updatedAt || article.value.date,
        "author": {
          "@type": "Organization",
          "name": COMPANY_INFO.name,
          "url": COMPANY_INFO.domain
        },
        "publisher": {
          "@type": "Organization",
          "name": COMPANY_INFO.name,
          "logo": {
            "@type": "ImageObject",
            "url": `${COMPANY_INFO.domain}/logo.png`
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${COMPANY_INFO.domain}${route.path}`
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems.value.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": `${COMPANY_INFO.domain}${item.path}`.replace(/\/+$/, '')
        }))
      }
    ]
  }
})

// 9. 格式化日期
const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}年${month}月${day}日`
}
</script>


<style scoped>
.article-detail-page { padding: 1rem 0; background: #fcfcfc; min-height: 80vh; }
.article-article { 
  margin: 0 auto; 
  background: #fff; 
  padding: 2rem; 
  border-radius: 12px; 
  box-shadow: 0 10px 30px rgba(0,0,0,0.05); 
}
.article-category { 
  color: #008496; 
  background: rgba(0, 132, 150, 0.1); 
  padding: 4px 12px; 
  border-radius: 4px; 
  font-size: 14px; 
}
.article-title { font-size: 32px; margin: 20px 0; line-height: 1.4; color: #333; }
.article-meta { color: #888; margin-bottom: 2rem; }
.article-content { margin-top: 30px; line-height: 1.8; font-size: 17px; color: #444; }
.article-content :deep(img) { max-width: 100%; border-radius: 8px; margin: 20px 0; }
.tag { margin-left: 8px; background: #f0f0f0; padding: 2px 8px; border-radius: 4px; font-size: 12px; color: #666; }

@media (max-width: 768px) {
  .article-article { padding: 1.5rem; }
  .article-title { font-size: 24px; }
}
</style>