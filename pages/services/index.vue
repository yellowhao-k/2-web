<template>
  <div class="services-page">
    <BaseSeo
      :title="`业务范围_国际物流服务项目 - ${COMPANY_INFO.name}`"
      :description="`${COMPANY_INFO.name}主营业务涵盖：${services.map(s => s.name).join('、')}。我们为跨境电商卖家提供从国内仓储到海外末端派送的全链路物流解决方案，确保货物安全高效送达。`"
      :jsonLd="servicesJsonLd"
    />
    <div class="container">
      <Breadcrumb :items="breadcrumbItems" />
      
      <div class="page-header">
        <h1>业务范围</h1>
        <p>我们提供全方位的跨境物流服务</p>
      </div>

      <div class="services-grid">
        <div 
          v-for="service in services" 
          :key="service.id"
          class="service-item"
        >
          <NuxtLink :to="service.path">
            <div class="service-icon">{{ service.icon }}</div>
            <h3>{{ service.name }}</h3>
            <p>{{ service.description }}</p>
            <span class="service-link">查看详情 →</span>
          </NuxtLink>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { COMPANY_INFO, services } from '~/composables/constants'


const breadcrumbItems = [
  { name: '首页', path: '/' },
  { name: '业务范围', path: '/services' }
]

// 针对服务集合页的 SEO 优化
const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  'serviceType': '跨境物流与供应链服务',
  'provider': {
    '@type': 'Organization',
    'name': COMPANY_INFO.name,
    'url': COMPANY_INFO.domain
  },
  'areaServed': 'Global',
  'hasOfferCatalog': {
    '@type': 'OfferCatalog',
    'name': '物流服务目录',
    'itemListElement': services.map((s, index) => ({
      '@type': 'Offer',
      'itemOffered': {
        '@type': 'Service',
        'name': s.name,
        'description': s.description
      }
    }))
  }
}
</script>

<style scoped>
.services-page {
  padding: 1rem 0;
  background: linear-gradient(to bottom, #ffffff 0%, #f8fdf9 100%);
  min-height: calc(100vh - 4rem);
}

.page-header {
  text-align: center;
  margin-bottom: 4rem;
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

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.service-item {
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 1rem;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  text-align: center;
  border: 1px solid #f0f0f0;
}

.service-item:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-hover);
  border-color: var(--primary-light);
}

.service-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  display: block;
}

.service-item h3 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: var(--text-color);
  font-weight: 600;
}

.service-item p {
  color: var(--text-light);
  line-height: 1.8;
  margin-bottom: 1.5rem;
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

.service-item:hover .service-link {
  gap: 1rem;
  color: var(--primary-dark);
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .page-header h1 {
    font-size: 2.25rem;
  }
  
  .service-item {
    padding: 2rem 1.5rem;
  }
}
</style>
