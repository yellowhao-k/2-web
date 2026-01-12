<template>
  <div class="routes-page">
    <BaseSeo 
      :title="`热门物流专线_国际快递专线查询 - ${COMPANY_INFO.name}`"
      :description="`精选跨境专线服务：${routes.map(r => r.name).join('、')}等。支持双清包税、DDP/DDU服务，为您提供稳定、高效、低成本的全球货运解决方案。`"
      :jsonLd="routesJsonLd"
    />
    <div class="container">
      <Breadcrumb :items="breadcrumbItems" />
      
      <div class="page-header">
        <div class="header-content">
          <h1 class="title">热门线路</h1>
          <p class="subtitle">选择适合您的物流专线</p>
          <div class="header-decoration">
            <span class="dot dot-blue"></span>
            <span class="dot dot-green"></span>
            <span class="dot dot-orange"></span>
          </div>
        </div>
      </div>

      <div class="routes-grid">
        <div 
          v-for="(route, index) in routes" 
          :key="route.path"
          class="route-card"
          :style="{ '--delay': `${index * 0.1}s` }"
        >
          <NuxtLink :to="route.path" class="route-card-link">
            <div class="card-header">
              <div class="country-flag" :class="getCountryClass(route.name)">
                <span class="country-icon">{{ getCountryIcon(route.name) }}</span>
              </div>
              <h3 class="route-title">{{ route.name }}</h3>
            </div>
            
            <p class="route-description">{{ route.description }}</p>
            
            <div class="route-badge">
              <span class="badge-text">{{ getTimeRange(route.features) }}</span>
            </div>
            
            <ul class="route-features">
              <li v-for="feature in route.features" :key="feature" class="feature-item">
                <span class="feature-icon">✓</span>
                <span class="feature-text">{{ feature }}</span>
              </li>
            </ul>
            
            <div class="card-footer">
              <span class="route-link">
                查看详情
                <svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </div>
            
            <div class="card-corner"></div>
          </NuxtLink>
        </div>
      </div>

      <ServiceCTA />
    </div>
  </div>
</template>

<script setup>
import { COMPANY_INFO, routes } from '~/composables/constants'

const breadcrumbItems = [
  { name: '首页', path: '/' },
  { name: '热门线路', path: '/routes' }
]

// 针对线路列表的结构化数据
const routesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  'name': '跨境物流热门专线列表',
  'description': `为您提供${routes.map(r => r.name).join('、')}等热门专线服务。`,
  'itemListElement': routes.map((route, index) => ({
    '@type': 'ListItem',
    'position': index + 1,
    'url': `${COMPANY_INFO.domain}${route.path}`,
    'name': `${route.name}专线物流`
  }))
}

const getCountryClass = (name) => {
  if (name.includes('美国')) return 'flag-usa'
  if (name.includes('澳洲')) return 'flag-australia'
  if (name.includes('东南亚')) return 'flag-sea'
  return ''
}

const getCountryIcon = (name) => {
  if (name.includes('美国')) return '🇺🇸'
  if (name.includes('澳洲')) return '🇦🇺'
  if (name.includes('东南亚')) return '🌏'
  return '✈️'
}

const getTimeRange = (features) => {
  const timeFeature = features.find(f => f.includes('工作日'))
  return timeFeature ? timeFeature : '快速直达'
}


</script>

<style scoped>
.routes-page {
  padding: 2rem 0 4rem;
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.page-header {
  text-align: center;
  margin-bottom: 4rem;
}

.header-content {
  position: relative;
  padding: 2rem 0;
}

.title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 1.25rem;
  color: #64748b;
  margin-bottom: 2rem;
  font-weight: 400;
}

.header-decoration {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: float 3s ease-in-out infinite;
}

.dot-blue {
  background: #3b82f6;
  animation-delay: 0s;
}

.dot-green {
  background: #10b981;
  animation-delay: 0.2s;
}

.dot-orange {
  background: #f59e0b;
  animation-delay: 0.4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.routes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
}

.route-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease-out var(--delay) forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.route-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 123, 255, 0.15);
  border-color: #3b82f6;
}

.route-card-link {
  display: block;
  padding: 2rem;
  text-decoration: none;
  color: inherit;
  position: relative;
  height: 100%;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.country-flag {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.flag-usa {
  background: linear-gradient(135deg, #3b82f6 0%, #ef4444 100%);
  color: white;
}

.flag-australia {
  background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);
  color: white;
}

.flag-sea {
  background: linear-gradient(135deg, #10b981 0%, #f59e0b 100%);
  color: white;
}

.route-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.route-description {
  color: #64748b;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-size: 0.95rem;
}

.route-badge {
  display: inline-block;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  margin-bottom: 1.5rem;
}

.badge-text {
  color: #0ea5e9;
  font-size: 0.875rem;
  font-weight: 600;
}

.route-features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f1f5f9;
}

.feature-item:last-child {
  border-bottom: none;
}

.feature-icon {
  width: 20px;
  height: 20px;
  background: #10b981;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.feature-text {
  color: #475569;
  font-size: 0.9rem;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
}

.route-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #3b82f6;
  font-weight: 600;
  font-size: 0.95rem;
  transition: gap 0.3s;
}

.route-card:hover .route-link {
  gap: 0.75rem;
}

.arrow-icon {
  transition: transform 0.3s;
}

.route-card:hover .arrow-icon {
  transform: translateX(4px);
}

.card-corner {
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 40px 40px 0;
  border-color: transparent #f1f5f9 transparent transparent;
}

.route-card:hover .card-corner {
  border-color: transparent #3b82f6 transparent transparent;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .routes-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .title {
    font-size: 2.25rem;
  }
  
  .subtitle {
    font-size: 1.125rem;
  }
  
  .route-card-link {
    padding: 1.5rem;
  }
  
  .page-header {
    margin-bottom: 2.5rem;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 2rem;
  }
  
  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .route-title {
    font-size: 1.25rem;
  }
}
</style>