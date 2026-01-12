<template>
  <div class="articles-page">
    <BaseSeo 
      :title="pageTitle" 
      :description="pageDesc" 
      :jsonLd="articlesJsonLd"
    />
    <div class="container">
      <Breadcrumb :items="breadcrumbItems" />
      
      <div class="page-header">
        <h1>资讯中心</h1>
        <p>了解最新的行业动态和物流专业知识</p>
      </div>

      <div class="category-tabs">
        <NuxtLink to="/articles/industry" class="tab">行业新闻</NuxtLink>
        <NuxtLink to="/articles/company" class="tab">公司动态</NuxtLink>
        <NuxtLink to="/articles/knowledge" class="tab">知识百科</NuxtLink>
      </div>

      <div v-if="loading" class="loading">正在加载资讯...</div>

      <div v-else class="content-wrapper">
        <section 
          v-for="(label, key) in categoryMap" 
          :key="key" 
          :id="key"
          class="category-section"
        >
          <div class="section-header">
            <h2 class="category-title">{{ label }}</h2>
          </div>

          <div class="article-list" v-if="articlesMap[key]?.length > 0">
            <div 
              v-for="article in articlesMap[key].slice(0, 3)" 
              :key="article._path"
              class="article-item"
            >
              <NuxtLink :to="article._path" class="item-inner">
                <div class="item-image">
                  <NuxtImg 
                    v-if="article.image" 
                    :src="article.image" 
                    :alt="article.title"
                    width="240"
                    height="150"
                    fit="cover"
                  />
                  <div v-else class="image-placeholder">articles</div>
                </div>

                <div class="item-info">
                  <h3 class="item-title">{{ article.title }}</h3>
                  <p class="item-excerpt">{{ article.description }}</p>
                  <div class="item-meta">
                    <span class="meta-tag">{{ label }}</span>
                    <span class="meta-date">{{ formatDate(article.date) }}</span>
                  </div>
                </div>

                <div class="item-action">
                  <span class="detail-btn">详情 →</span>
                </div>
              </NuxtLink>
            </div>
          </div>

          <div v-else class="no-data-inline">暂无 {{ label }} 相关内容</div>

          <div class="more-actions" v-if="articlesMap[key]?.length > 0">
            <NuxtLink :to="`/articles/${key}`" class="view-more-btn">
              查看更多 {{ label }} →
            </NuxtLink>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
const { fetchArticles } = useArticles()

const loading = ref(false)
const articlesMap = ref({
  industry: [],
  company: [],
  knowledge: []
})

const categoryMap = {
  industry: '行业新闻',
  company: '公司动态',
  knowledge: '知识百科'
}

const breadcrumbItems = [
  { name: '首页', path: '/' },
  {name: '资讯中心', path: '/articles' }
]


const pageTitle = `跨境物流资讯中心_行业动态与专业百科 - ${COMPANY_INFO.name}`;
const pageDesc = `关注${COMPANY_INFO.name}资讯中心，为您提供最新的国际物流行业动态、出口政策解读、FBA头程百科知识及公司实时新闻，助您掌握跨境贸易一手资讯。`;

// 针对列表页的 JsonLd：CollectionPage（集合页）
const articlesJsonLd = computed(() => {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pageTitle,
    "description": pageDesc,
    "url": `${COMPANY_INFO.domain}/articles`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": Object.values(articlesMap.value).flat().slice(0, 10).map((article, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `${COMPANY_INFO.domain}${article._path}`,
        "name": article.title
      }))
    }
  };
});

const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return `${d.getFullYear()}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}`
}

onMounted(async () => {
  loading.value = true
  try {
    // 同时获取三个分类的内容
    const [industry, company, knowledge] = await Promise.all([
      fetchArticles('industry'),
      fetchArticles('company'),
      fetchArticles('knowledge')
    ])
    articlesMap.value.industry = industry || []
    articlesMap.value.company = company || []
    articlesMap.value.knowledge = knowledge || []
  } catch (e) {
    console.error('Fetch error:', e)
  } finally {
    loading.value = false
  }
})

</script>

<style scoped>
.articles-page {
  padding: 1rem 0;
  background-color: #fcfcfc;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.category-tabs {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 50px;
}

.tab {
  padding: 8px 24px;
  border-radius: 20px;
  background: #fff;
  border: 1px solid #e0e0e0;
  color: #666;
  text-decoration: none;
  transition: all 0.3s;
}

.tab:hover {
  border-color: #008496;
  color: #008496;
}

/* 板块样式 */
.category-section {
  margin-bottom: 60px;
  scroll-margin-top: 100px; /* 锚点跳转留白 */
}

.section-header {
  margin-bottom: 25px;
  border-bottom: 1px solid #eee;
}

.category-title {
  font-size: 24px;
  padding-bottom: 15px;
  position: relative;
  display: inline-block;
}

.category-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #ffb400; /* 图片中的黄色横线 */
}

/* 列表样式 (保持您要求的左中右布局) */
.article-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.article-item {
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.article-item:hover {
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  border-color: #e0e0e0;
}

.item-inner {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  text-decoration: none;
  color: inherit;
}

.item-image {
  width: 200px;
  height: 120px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 25px;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  flex-grow: 1;
}

.item-title {
  font-size: 18px;
  margin-bottom: 8px;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-excerpt {
  color: #777;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-meta {
  display: flex;
  gap: 15px;
  align-items: center;
  font-size: 13px;
}

.meta-tag {
  background: #f0f7f8;
  color: #008496;
  padding: 2px 10px;
  border-radius: 4px;
}

.meta-date {
  color: #999;
}

.item-action {
  margin-left: 20px;
}

.detail-btn {
  padding: 5px 15px;
  border: 1px solid #eee;
  border-radius: 20px;
  font-size: 13px;
  color: #666;
}

/* 查看更多按钮样式 */
.more-actions {
  margin-top: 30px;
  text-align: center;
}

.view-more-btn {
  display: inline-block;
  padding: 10px 35px;
  background: #fff;
  border: 1px solid #008496;
  color: #008496;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
}

.view-more-btn:hover {
  background: #008496;
  color: #fff;
}

.no-data-inline {
  padding: 40px;
  text-align: center;
  background: #f9f9f9;
  border-radius: 12px;
  color: #999;
}

@media (max-width: 768px) {
  .item-inner { flex-direction: column; align-items: flex-start; }
  .item-image { width: 100%; margin-right: 0; margin-bottom: 15px; }
  .item-action { display: none; }
}
</style>