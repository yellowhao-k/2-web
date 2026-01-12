<template>
  <div class="home-page">
    <BaseSeo
      :title="`${COMPANY_INFO.name}_专业的FBA头程|国际海运|空运专线物流服务商`"
      :description="`${COMPANY_INFO.name}专注跨境物流15年，提供${COMPANY_INFO.services.join('、')}。覆盖${COMPANY_INFO.markets.join('/')}，双清包税，时效稳定，价格透明。`"
      :jsonLd="homeJsonLd"
    />
    <!-- Hero Section -->
    <section class="hero">
      <div class="container hero-wrapper">
        <div class="hero-content">
          <p class="top-category">跨境物流 · 海运 · 空运 · 仓配</p>
          <h1 class="main-title">降低物流成本，提速全球交付</h1>
          <p class="sub-description">
            基于数据选线、实时轨迹与合规清关，让跨境货物更快、更稳地送达。
          </p>
          
          <div class="action-group">
            <NuxtLink to="/contact" class="btn-primary">获取报价</NuxtLink>
            <NuxtLink to="/services" class="btn-secondary">查看服务</NuxtLink>
          </div>

          <div class="info-tags">
            <div class="tag-item">72 小时快速清关</div>
            <div class="tag-item">覆盖 50+ 国家与地区</div>
            <div class="tag-item">海外仓 + 尾程派送</div>
          </div>
        </div>

        <div class="hero-visual">
          <NuxtImg src="/images/hero.webp" alt="Global Network" class="hero-img"
           width="550" height="350" />
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services-section">
      <div class="container">
        <h2 class="section-title">我们的服务</h2>
        <div class="services-grid">
          <div v-for="service in services" :key="service.title" class="service-card">
            <div class="service-icon">{{ service.icon }}</div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
            <NuxtLink :to="service.path" class="service-link">了解更多 →</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest Articles Section -->
    <section class="articles-section">
      <div class="container">
        <h2 class="section-title">最新资讯</h2>
        <div class="articles-grid" v-if="latestArticles?.length > 0">
         <article 
            v-for="article in latestArticles" 
            :key="article._path"
            class="article-card"
          >
            <NuxtLink :to="article._path">
              <div class="article-image" v-if="article.image">
                <NuxtImg :src="article.image" :alt="article.title" loading="lazy" width="400" height="250" />
              </div>
              <div class="article-content">
                <span class="article-category">{{ article.category || '知识百科' }}</span>
                <h3 class="article-title">{{ article.title }}</h3>
                <p class="article-desc" v-if="article.description">{{ article.description }}</p>
                <span class="article-date">{{ formatDate(article.date) }}</span>
              </div>
            </NuxtLink>
          </article>
        </div>
        <div class="section-actions">
          <NuxtLink to="/articles" class="btn btn-outline-primary">查看更多资讯</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Routes Section -->
    <section class="routes-section">
      <div class="container">
        <!-- 区域标题 -->
        <div class="section-header">
          <h2 class="section-title">
            <span>热门线路</span>
          </h2>
        </div>

        <!-- 线路卡片网格 -->
        <div class="routes-grid">
          <div 
            v-for="route in routes" 
            :key="route.name"
            class="route-card"
          >
            <NuxtLink :to="route.path" class="route-link">
              <!-- 卡片顶部装饰 -->
              <div class="card-header">
                <div class="route-icon">
                  <div class="icon-circle">
                    <span class="icon-emoji">
                      <template v-if="route.name.includes('美国')">🇺🇸</template>
                      <template v-else-if="route.name.includes('澳洲')">🇦🇺</template>
                      <template v-else>🌏</template>
                    </span>
                  </div>
                  <span class="hot-badge">热门</span>
                </div>
              </div>
              
              <!-- 卡片内容 -->
              <div class="card-content">
                <h3>{{ route.name }}</h3>
                <p>{{ route.description }}</p>
              </div>
              
              <!-- 卡片底部 -->
              <div class="card-footer">
                <div class="route-features">
                  <span class="feature">· 专业清关</span>
                  <span class="feature">· 全程追踪</span>
                  <span class="feature">· 门到门服务</span>
                </div>
                <div class="cta-button">
                  立即咨询
                  <span class="arrow">→</span>
                </div>
              </div>
              
              <!-- 悬浮效果装饰 -->
              <div class="hover-effect"></div>
            </NuxtLink>
          </div>
        </div>
        
        <!-- 查看全部按钮 -->
        <div class="view-all">
          <NuxtLink to="/routes" class="view-all-btn">
            查看全部线路
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { COMPANY_INFO, services, routes } from '~/composables/constants'

const { data: latestArticles } = await useAsyncData('home-articles', () => {
  return queryContent('articles')
    .where({ _path: { $contains: '/articles/knowledge' } })
    .sort({ date: -1 })
    .limit(6)
    // 核心优化：只提取展示卡片所需的字段
    .only(['_path', 'title', 'description', 'image', 'date', 'category']) 
    .find()
}, {
  lazy: true,
  server: true
})
const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  // 使用标准的 ISO 格式或固定格式，不要使用 toLocaleDateString()
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate()}`
}


/* ================= 首页 JSON-LD (WebSite + SearchBox) ================= */
const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  'name': COMPANY_INFO.name,
  'url': COMPANY_INFO.domain,
  'publisher': {
    '@type': 'Organization',
    'name': COMPANY_INFO.name,
    'logo': COMPANY_INFO.domain + COMPANY_INFO.logo
  },
  // 描述核心业务，增强关键词相关性
  'description': `提供${COMPANY_INFO.services.join('、')}等一站式跨境物流服务。`
}

</script>

<style scoped>
.home-page {
  background: #fff;
}

.hero {
  background-color: #f0f9ff; /* 极其浅蓝的背景底色 */
  padding: 3rem 0 2rem;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
}

.hero-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.hero-content {
  flex: 0 0 550px;
}

/* 顶部蓝色小字 */
.top-category {
  color: #0ea5e9;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* 主标题 */
.main-title {
  color: #1f2937;
  font-size: 42px;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 24px;
}

/* 描述文字 */
.sub-description {
  color: #6b7280;
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 32px;
}

/* 按钮组 */
.action-group {
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
}

.btn-primary {
  background: #10b981; /* 图片中的青绿色 */
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.btn-secondary {
  background: #f0f9ff;
  color: #1f2937;
  border: 1px solid #bae6fd; /* 浅蓝色边框 */
  padding: 12px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

/* 底部三个标签样式 */
.info-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tag-item {
  background-color: #f8fafc; /* 极浅灰近乎白 */
  color: #374151;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 15px;
  min-width: 180px; /* 保证整齐感 */
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

/* 右侧大图 */
.hero-visual {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.hero-img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

/* 适配手机端 */
@media (max-width: 768px) {
  .hero-wrapper {
    flex-direction: column;
    text-align: center;
  }
  .hero-content {
    flex: 0 0 100%;
  }
  .hero-visual {
    display: none;
  }
  .action-group {
    justify-content: center;
  }
  .info-tags {
    justify-content: center;
  }
}

.services-section {
  padding: 5rem 0;
  background: linear-gradient(to bottom, #f8fdf9 0%, #ffffff 100%);
}

.articles-section {
  padding: 5rem 0;
  background: #ffffff;
}


.section-title {
  font-size: 2.75rem;
  text-align: center;
  margin-bottom: 4rem;
  color: var(--text-color);
  font-weight: 700;
  position: relative;
  padding-bottom: 1rem;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: var(--primary-color);
  border-radius: 2px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.service-card {
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 1rem;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  text-align: center;
  border: 1px solid #f0f0f0;
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-hover);
  border-color: var(--primary-light);
}

.service-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.service-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
  font-weight: 600;
}

.service-card p {
  color: var(--text-light);
  margin-bottom: 1.5rem;
  line-height: 1.8;
  min-height: 3.6rem;
}

.service-link {
  color: var(--primary-color);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
}

.service-link:hover {
  gap: 1rem;
  color: var(--primary-dark);
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
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
}

.article-image {
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary-color) 100%);
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.article-card:hover .article-image img {
  transform: scale(1.05);
}

.article-content {
  padding: 1.75rem;
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
  font-size: 1.375rem;
  margin-bottom: 0.75rem;
  color: var(--text-color);
  font-weight: 600;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-desc {
  color: var(--text-light);
  font-size: 0.9375rem;
  margin-bottom: 1rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-date {
  font-size: 0.8125rem;
  color: #999;
}

.section-actions {
  text-align: center;
}

.routes-section {
  padding: 2rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  position: relative;
}

/* 线路卡片网格 */
.routes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
  margin-bottom: 50px;
}

.route-card {
  position: relative;
}

.route-link {
  display: block;
  background: white;
  border-radius: 20px;
  padding: 32px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.route-link:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: #cbd5e0;
}

/* 卡片头部 */
.card-header {
  margin-bottom: 10px;
}

.route-icon {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.icon-circle {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #bae6fd;
}

.icon-emoji {
  font-size: 28px;
}

.hot-badge {
  padding: 6px 16px;
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  color: #92400e;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 20px;
  border: 1px solid rgba(245, 158, 11, 0.2);
}

/* 卡片内容 */
.card-content {
  margin-bottom: 32px;
}

.card-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.card-content p {
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.6;
}

/* 卡片底部 */
.card-footer {
  border-top: 1px solid #f1f5f9;
  padding-top: 20px;
}

.route-features {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}

.feature {
  font-size: 0.875rem;
  color: #64748b;
  padding: 4px 12px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  font-weight: 500;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.route-link:hover .cta-button {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  transform: translateY(-2px);
}

.arrow {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

.route-link:hover .arrow {
  transform: translateX(4px);
}

/* 悬浮效果装饰 */
.hover-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent 0%,
    rgba(59, 130, 246, 0.05) 50%,
    transparent 100%);
  transition: left 0.6s ease;
  z-index: 1;
  pointer-events: none;
}

.route-link:hover .hover-effect {
  left: 100%;
}

/* 查看全部按钮 */
.view-all {
  text-align: center;
}

.view-all-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  background: white;
  color: #3b82f6;
  font-weight: 500;
  text-decoration: none;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.view-all-btn:hover {
  background: #f8fafc;
  border-color: #cbd5e0;
  gap: 12px;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}
@media (max-width: 768px) {
  .hero {
    padding: 6rem 0 4rem;
  }
  
  .hero-title {
    font-size: 2.25rem;
  }
  
  .hero-subtitle {
    font-size: 1.125rem;
    margin-bottom: 2rem;
  }
  
  .btn {
    padding: 0.875rem 2rem;
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 2rem;
    margin-bottom: 2.5rem;
  }
  
  .services-grid,
  .articles-grid,
  .routes-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .service-card,
  .route-card {
    padding: 2rem 1.5rem;
  }
}
/* 响应式设计 */
@media (max-width: 768px) {
  .routes-section {
    padding: 10px 0;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .routes-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto 10px;
  }
  
  .route-link {
    padding: 24px;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.8rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
  
  .icon-circle {
    width: 56px;
    height: 56px;
  }
  
  .route-features {
    flex-direction: column;
  }
}
</style>
