<script setup>
import { COMPANY_INFO } from '~/composables/constants'

const route = useRoute()
const router = useRouter()

const { fetchCasesList, loading } = useContents()

// 1. 配置
const itemsPerPage = 6

// 2. SSR 获取 cases 列表（字段已裁剪）
const { data: casesData } = await useAsyncData(
  'cases-list',
  () => fetchCasesList()
)

// 3. 当前页
const currentPage = computed(() => {
  const page = parseInt(route.query.page) || 1
  return page > 0 ? page : 1
})

// 4. 当前页数据
const paginatedCases = computed(() => {
  if (!casesData.value) return []
  const start = (currentPage.value - 1) * itemsPerPage
  return casesData.value.slice(start, start + itemsPerPage)
})

// 5. 总页数
const totalPages = computed(() => {
  if (!casesData.value) return 0
  return Math.ceil(casesData.value.length / itemsPerPage)
})

const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 6. 翻页
const handlePageChange = (page) => {
  router.push({ query: { ...route.query, page } })
  if (process.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// 面包屑
const breadcrumbItems = [
  { name: '首页', path: '/' },
  { name: '客户案例', path: '/cases' }
]

// CollectionPage Schema
const casesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: `跨境物流成功案例 - ${COMPANY_INFO.name}`,
  description: `展示我们在${COMPANY_INFO.services.join('、')}等领域的专业解决方案。`,
  url: `${COMPANY_INFO.domain}/cases`
}
</script>

<template>
  <div class="cases-page">
    <div class="container">
      <BaseSeo
        :title="`客户案例 | 成功跨境物流解决方案 - ${COMPANY_INFO.name}`"
        :description="`查看${COMPANY_INFO.name}最新的跨境物流成功案例。涵盖亚马逊FBA、传统海运、超大件出口及双清包税等实际操作场景，展示专业的国际物流执行力。`"
        :jsonLd="casesJsonLd"
      />
    
      <Breadcrumb :items="breadcrumbItems" />
      
      <div class="page-header">
        <h1>客户案例</h1>
        <p>成功案例展示我们的专业服务能力</p>
      </div>

      <div v-if="loading && cases.length === 0" class="loading">加载中...</div>
      
      <div v-else-if="paginatedCases.length > 0" class="cases-grid">
        <article 
          v-for="caseItem in paginatedCases" 
          :key="caseItem.slug || caseItem._path"
          class="case-card"
        >
          <NuxtLink :to="`/cases/${caseItem.slug}`">
            <div class="case-image" v-if="caseItem.image">
              <NuxtImg 
                :src="caseItem.image" 
                :alt="caseItem.title"
                loading="lazy"
                width="400"
                height="250"
              />
            </div>
            <div class="case-content">
              <h3 class="case-title">{{ caseItem.title }}</h3>
              <p class="case-desc" v-if="caseItem.description">
                {{ caseItem.description }}
              </p>
              <span class="case-date">{{ formatDate(caseItem.date) }}</span>
            </div>
          </NuxtLink>
        </article>
      </div>
      
      <div v-else class="no-data">暂无案例</div>

      <Pagination 
        v-if="totalPages > 1"
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="handlePageChange"
      />

      <ServiceCTA />
    </div>
  </div>
</template>

<style scoped>
/* 完全恢复为你提供的原始样式 */
.cases-page {
  padding: 1rem 0;
  background: linear-gradient(to bottom, #ffffff 0%, #f8fdf9 100%);
  min-height: calc(100vh - 4rem);
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
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

.loading,
.no-data {
  text-align: center;
  padding: 3rem;
  color: #999;
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.case-card {
  background: #fff;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
}

.case-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-hover);
  border-color: var(--primary-light);
}

.case-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.case-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.case-content {
  padding: 1.5rem;
}

.case-title {
  font-size: 1.375rem;
  margin-bottom: 0.75rem;
  color: var(--text-color);
  font-weight: 600;
}

.case-desc {
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.case-date {
  font-size: 0.75rem;
  color: #999;
}

@media (max-width: 768px) {
  .cases-grid {
    grid-template-columns: 1fr;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
}
</style>