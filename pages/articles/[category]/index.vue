<template>
  <div class="articles-category-page">
    <BaseSeo 
      :title="pageTitle" 
      :description="pageDesc" 
      :jsonLd="categoryJsonLd"
    />
    <div class="container">
      <Breadcrumb :items="breadcrumbItems" />
      
      <div class="page-header">
        <h1>{{ categoryName }}</h1>
        <p>{{ categoryDesc }}</p>
      </div>

      <div class="category-tabs">
        <NuxtLink 
          v-for="(label, key) in categoryMap" 
          :key="key"
          :to="`/articles/${key}`"
          class="tab"
          :class="{ active: route.params.category === key }"
        >
          {{ label.name }}
        </NuxtLink>
      </div>

      <div v-if="pending" class="loading">加载中...</div>
      
      <div v-else-if="paginatedArticles.length > 0" class="articles-grid">
        <article 
          v-for="article in paginatedArticles" 
          :key="article._path"
          class="article-card"
        >
          <NuxtLink :to="`/articles/${route.params.category}/${article.slug}`">
            <div class="article-image" v-if="article.image">
              <NuxtImg 
                :src="article.image" 
                :alt="article.title"
                loading="lazy"
                width="400"
                height="250"
              />
            </div>
            <div class="article-content">
              <span class="article-category">{{ categoryName }}</span>
              <h3 class="article-title">{{ article.title }}</h3>
              <p class="article-desc" v-if="article.description">
                {{ article.description }}
              </p>
              <div class="article-footer">
                <span class="article-date">{{ formatDate(article.date) }}</span>
                <span class="article-tags" v-if="article.tags?.length > 0">
                  <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
                </span>
              </div>
            </div>
          </NuxtLink>
        </article>
      </div>
      
      <div v-else class="no-data">暂无文章</div>

      <Pagination 
        v-if="totalPages > 1"
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { COMPANY_INFO } from '~/composables/constants'
import { useContents } from '~/composables/useContents'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { fetchArticlesList } = useContents() // ✅ 使用封装方法

const categoryMap = {
  company: { name: '公司动态', desc: '了解公司最新动态和发展' },
  industry: { name: '行业新闻', desc: '关注跨境物流行业最新资讯' },
  knowledge: { name: '知识百科', desc: '学习跨境物流专业知识' }
}

const currentCategory = computed(() => route.params.category)
const categoryInfo = computed(() => categoryMap[currentCategory.value] || { name: '资讯中心', desc: '' })
const categoryName = computed(() => categoryInfo.value.name)
const categoryDesc = computed(() => categoryInfo.value.desc)

// 分页逻辑
const itemsPerPage = 6
const currentPage = ref(parseInt(route.query.page) || 1)

// ✅ 使用 useAsyncData + fetchArticlesList 获取文章列表
const { data: articles, pending } = await useAsyncData(
  `articles-${currentCategory.value}`,
  () => fetchArticlesList(currentCategory.value)
)

// 分页计算
const paginatedArticles = computed(() => {
  if (!articles.value) return []
  const start = (currentPage.value - 1) * itemsPerPage
  return articles.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => {
  return articles.value ? Math.ceil(articles.value.length / itemsPerPage) : 0
})

// 面包屑
const breadcrumbItems = computed(() => [
  { name: '首页', path: '/' },
  { name: '资讯中心', path: '/articles' },
  { name: categoryName.value, path: route.path }
])

// 动态 Title / Description
const pageTitle = computed(() => {
  const pageSuffix = currentPage.value > 1 ? ` - 第${currentPage.value}页` : ''
  return `${categoryName.value}资讯 - ${COMPANY_INFO.name}${pageSuffix}`
})
const pageDesc = computed(() => 
  `${COMPANY_INFO.name}${categoryName.value}频道：为您提供${categoryDesc.value}。涵盖最新的${categoryName.value}文章，帮助您深度了解跨境物流趋势。`
)

// CollectionPage JsonLd
const categoryJsonLd = computed(() => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "name": pageTitle.value,
      "description": pageDesc.value,
      "url": `${COMPANY_INFO.domain}${route.path}`,
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": paginatedArticles.value.map((article, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "url": `${COMPANY_INFO.domain}/articles/${currentCategory.value}/${article.slug}`,
          "name": article.title
        }))
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "首页", "item": COMPANY_INFO.domain },
        { "@type": "ListItem", "position": 2, "name": "资讯中心", "item": `${COMPANY_INFO.domain}/articles` },
        { "@type": "ListItem", "position": 3, "name": categoryName.value, "item": `${COMPANY_INFO.domain}${route.path}` }
      ]
    }
  ]
}))

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 分页跳转
const handlePageChange = (page) => {
  currentPage.value = page
  router.push({ query: { ...route.query, page } })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>


<style scoped>
.articles-category-page {
  padding: 1rem 0;
  background: linear-gradient(to bottom, #ffffff 0%, #f8fdf9 100%);
  min-height: calc(100vh - 4rem);
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--text-color);
  font-weight: 700;
}

.page-header p {
  font-size: 1.25rem;
  color: var(--text-light);
}

.category-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.tab {
  padding: 0.875rem 2rem;
  border: 2px solid var(--primary-light);
  border-radius: 2rem;
  color: var(--text-color);
  transition: all 0.3s ease;
  font-weight: 500;
  background: #fff;
}

.tab:hover,
.tab.active {
  background: var(--primary-color);
  color: #fff;
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.loading,
.no-data {
  text-align: center;
  padding: 3rem;
  color: #999;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.article-card {
  background: #fff;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
}

.article-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-hover);
  border-color: var(--primary-light);
}

.article-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-content {
  padding: 1.5rem;
}

.article-category {
  display: inline-block;
  padding: 0.375rem 1rem;
  background: rgba(76, 175, 80, 0.1);
  border-radius: 1.5rem;
  font-size: 0.75rem;
  color: var(--primary-color);
  margin-bottom: 0.75rem;
  font-weight: 500;
}

.article-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.article-desc {
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.article-date {
  font-size: 0.75rem;
  color: #999;
}

.article-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  background: rgba(76, 175, 80, 0.1);
  border-radius: 0.25rem;
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .articles-grid {
    grid-template-columns: 1fr;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .category-tabs {
    justify-content: flex-start;
  }
}
</style>