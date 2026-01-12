<template>
  <div class="route-detail-page">
    <BaseSeo 
      :title="pageTitle" 
      :description="pageDesc" 
      :jsonLd="routeDetailJsonLd"
    />
    <div class="container">
      <Breadcrumb :items="breadcrumbItems" />
      
      <div class="page-header">
        <div class="header-content">

          <h1>{{ routeInfo.name }}</h1>
          <p>{{ routeInfo.description }}</p>
          <div class="timeline-indicator">
            <div class="timeline-line">
              <div class="timeline-point start">
                <span class="point-label">起始</span>
              </div>
              <div class="timeline-point middle">
                <span class="point-label">运输</span>
              </div>
              <div class="timeline-point middle">
                <span class="point-label">清关</span>
              </div>
              <div class="timeline-point end">
                <span class="point-label">派送</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="route-tabs">
        <div class="tabs-container">
          <NuxtLink 
            :to="`/routes/${routeName}/fba`"
            class="tab-btn"
            :class="{ 'active': isActiveTab('fba') }"
          >
            <svg class="tab-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>FBA头程</span>
          </NuxtLink>
          <NuxtLink 
            :to="`/routes/${routeName}/tips`"
            class="tab-btn"
            :class="{ 'active': isActiveTab('tips') }"
          >
            <svg class="tab-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 16V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="12" cy="8" r="1" fill="currentColor"/>
            </svg>
            <span>避坑指南</span>
          </NuxtLink>
          <NuxtLink 
            :to="`/routes/${routeName}/clearance`"
            class="tab-btn"
            :class="{ 'active': isActiveTab('clearance') }"
          >
            <svg class="tab-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.386 3 16.5641 3.94918 18.178 5.53553" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span>双清包税</span>
          </NuxtLink>
          <NuxtLink 
            :to="`/routes/${routeName}/pricing`"
            class="tab-btn"
            :class="{ 'active': isActiveTab('pricing') }"
          >
            <svg class="tab-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>价格与时效</span>
          </NuxtLink>
        </div>
      </div>

      <div class="route-intro">
        <div class="intro-card">
          <div class="intro-header">
            <h2>{{ routeInfo.name }}服务介绍</h2>
            <div class="highlight-box">
              <span class="highlight-text">🚚 最快{{ getFastestTime(routeInfo.pricing) }}到达</span>
            </div>
          </div>
          <div class="intro-content">
            <p>{{ routeInfo.description }}</p>
            <p>我们提供专业的{{ routeInfo.name }}物流服务，包括FBA头程、避坑指南、双清包税、价格与时效等全方位服务。</p>
            
            <div class="features-grid">
              <div class="feature-item" v-for="tip in routeInfo.tips" :key="tip.title">
                <div class="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 16V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="12" cy="8" r="1" fill="currentColor"/>
                  </svg>
                </div>
                <div class="feature-content">
                  <h4>{{ tip.title }}</h4>
                  <p>{{ tip.content }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { COMPANY_INFO } from '~/composables/constants'

const route = useRoute()
const routeName = route.params.route

const routeMap = {
  usa: {
    name: '美国专线',
    description: '快速直达美国，时效稳定，价格优惠',
    fbaTime: '7-15个工作日',
    tips: [
      {
        title: '货物包装',
        content: '确保货物包装牢固，符合美国运输标准，避免运输过程中损坏。'
      },
      {
        title: '清关文件',
        content: '准备完整的清关文件，包括商业发票、装箱单等，确保清关顺利。'
      },
      {
        title: '禁运物品',
        content: '注意美国禁运物品清单，避免运输违禁品导致货物被扣。'
      }
    ],
    pricing: [
      { method: '空运', time: '7-10个工作日', firstPrice: '¥45/kg', continuePrice: '¥38/kg' },
      { method: '海运', time: '25-35个工作日', firstPrice: '¥12/kg', continuePrice: '¥8/kg' },
      { method: '快递', time: '5-7个工作日', firstPrice: '¥65/kg', continuePrice: '¥55/kg' }
    ]
  },
  australia: {
    name: '澳洲专线',
    description: '专业澳洲物流解决方案，服务完善',
    fbaTime: '10-20个工作日',
    tips: [
      {
        title: '澳洲海关要求',
        content: '了解澳洲海关要求，确保货物符合澳洲进口标准，避免清关延误。'
      },
      {
        title: 'GST税务',
        content: '注意澳洲GST税务政策，确保税务申报准确，避免税务问题。'
      },
      {
        title: '生物安全',
        content: '澳洲对生物安全要求严格，注意相关物品的申报和检疫要求。'
      }
    ],
    pricing: [
      { method: '空运', time: '10-15个工作日', firstPrice: '¥50/kg', continuePrice: '¥42/kg' },
      { method: '海运', time: '30-40个工作日', firstPrice: '¥15/kg', continuePrice: '¥10/kg' },
      { method: '快递', time: '7-10个工作日', firstPrice: '¥70/kg', continuePrice: '¥60/kg' }
    ]
  },
  sea: {
    name: '东南亚专线',
    description: '覆盖东南亚主要国家，物流网络完善',
    fbaTime: '5-12个工作日',
    tips: [
      {
        title: '多国政策',
        content: '东南亚各国政策不同，需要了解目标国家的具体要求和规定。'
      },
      {
        title: '语言沟通',
        content: '部分国家需要当地语言文件，建议提前准备相关翻译文件。'
      },
      {
        title: '时效把握',
        content: '东南亚国家距离较近，但清关时间可能较长，需要合理规划时间。'
      }
    ],
    pricing: [
      { method: '空运', time: '5-8个工作日', firstPrice: '¥35/kg', continuePrice: '¥28/kg' },
      { method: '海运', time: '15-25个工作日', firstPrice: '¥10/kg', continuePrice: '¥6/kg' },
      { method: '快递', time: '3-5个工作日', firstPrice: '¥55/kg', continuePrice: '¥45/kg' }
    ]
  }
}

const routeInfo = routeMap[routeName] || routeMap.usa

const breadcrumbItems = computed(() => [
  { name: '首页', path: '/' },
  { name: '热门线路', path: '/routes' },
  { name: routeInfo.name, path: `/routes/${routeName}` }
])
// 动态 SEO：根据线路名定制标题
const pageTitle = `${routeInfo.name}_FBA头程价格_双清包税派送 - ${COMPANY_INFO.name}`
const pageDesc = `${routeInfo.name}专线解决方案：提供最快的物流方案。涵盖${routeInfo.tips.map(t => t.title).join('、')}等避坑指南，助力跨境电商高效出海。`

// 在 <script setup> 中
const routeDetailJsonLd = computed(() => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      // 1. 服务实体描述
      {
        "@type": "Service",
        "@id": `${COMPANY_INFO.domain}${route.path}`,
        "name": `${routeInfo.name}综合物流方案`,
        "serviceType": "International Freight Forwarding",
        "description": routeInfo.description,
        "provider": {
          "@type": "LocalBusiness",
          "name": COMPANY_INFO.name,
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "CN"
          }
        },
        "areaServed": [
          {
            "@type": "Country",
            "name": routeInfo.name.replace('专线', '') // 提取国家名，如“美国”
          }
        ],
        // 提供报价参考范围
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "CNY",
          "offerCount": routeInfo.pricing.length,
          "lowPrice": Math.min(...routeInfo.pricing.map(p => parseFloat(p.firstPrice.replace(/[^\d.]/g, ''))))
        }
      },
      // 2. 面包屑导航（增强搜索结果中的路径展示）
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "首页", "item": COMPANY_INFO.domain },
          { "@type": "ListItem", "position": 2, "name": "热门线路", "item": `${COMPANY_INFO.domain}/routes` },
          { "@type": "ListItem", "position": 3, "name": routeInfo.name, "item": `${COMPANY_INFO.domain}${route.path}` }
        ]
      },
      // 3. 避坑指南/常见问题 (FAQPage 可显著增加搜索结果占位面积)
      {
        "@type": "FAQPage",
        "mainEntity": routeInfo.tips.map(tip => ({
          "@type": "Question",
          "name": `${routeInfo.name}${tip.title}需要注意什么？`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": tip.content
          }
        }))
      }
    ]
  }
})
const getFastestTime = (pricing) => {
  if (!pricing || pricing.length === 0) return '快速'
  const times = pricing.map(p => parseInt(p.time))
  return Math.min(...times) + '天'
}

const isActiveTab = (tabName) => {
  return route.path.includes(`/${tabName}`)
}

</script>

<style scoped>
.route-detail-page {
  padding: 1rem 0 4rem;
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.page-header {
  position: relative;
  overflow: hidden;
}

.header-content {
  padding: 2rem 0;
  text-align: center;
  position: relative;
  z-index: 1;
}

.country-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(59, 130, 246, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
}

.flag {
  font-size: 1.25rem;
}

.country-text {
  color: #1e40af;
  font-weight: 600;
  font-size: 0.875rem;
}

.page-header h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

.page-header p {
  font-size: 1.25rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.timeline-indicator {
  max-width: 600px;
  margin: 2rem auto 0;
}

.timeline-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0 1rem;
}

.timeline-line::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #10b981, #f59e0b, #ef4444);
  z-index: 0;
}

.timeline-point {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  border: 3px solid;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline-point.start {
  border-color: #3b82f6;
}

.timeline-point.middle {
  border-color: #10b981;
}

.timeline-point.end {
  border-color: #ef4444;
}

.timeline-point::after {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}

.timeline-point.start::after { background: #3b82f6; }
.timeline-point.middle::after { background: #10b981; }
.timeline-point.end::after { background: #ef4444; }

.point-label {
  position: absolute;
  top: calc(100% + 0.5rem);
  font-size: 0.75rem;
  color: #64748b;
  white-space: nowrap;
  font-weight: 500;
}

.route-tabs {
  margin-bottom: 3rem;
}

.tabs-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.tab-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 1rem;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 0.75rem;
  text-decoration: none;
  color: #475569;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.tab-btn:hover {
  transform: translateY(-4px);
  background: white;
  border-color: #3b82f6;
  color: #1e40af;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
}

.tab-btn.active {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-color: transparent;
  color: white;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
}

.tab-btn.active .tab-icon {
  color: white;
}

.tab-icon {
  color: #64748b;
  transition: color 0.3s;
}

.tab-btn:hover .tab-icon {
  color: #3b82f6;
}

.route-intro {
  margin-top: 2rem;
}

.intro-card {
  background: white;
  border-radius: 1.5rem;
  padding: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;
}

.intro-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #10b981);
}

.intro-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.intro-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.highlight-box {
  background: linear-gradient(135deg, #fffbeb, #fef3c7);
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  border: 2px solid #f59e0b;
}

.highlight-text {
  color: #92400e;
  font-weight: 600;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.intro-content {
  color: #475569;
  line-height: 1.8;
}

.intro-content > p {
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2.5rem;
}

.feature-item {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 1rem;
  border-left: 4px solid #3b82f6;
  transition: transform 0.3s;
}

.feature-item:hover {
  transform: translateX(4px);
  background: #f1f5f9;
}

.feature-icon {
  color: #3b82f6;
  flex-shrink: 0;
}

.feature-content h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.feature-content p {
  color: #64748b;
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .page-header h1 {
    font-size: 2.25rem;
  }
  
  .page-header p {
    font-size: 1.125rem;
  }
  
  .tabs-container {
    grid-template-columns: 1fr;
  }
  
  .intro-card {
    padding: 2rem;
  }
  
  .intro-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .timeline-point .point-label {
    font-size: 0.7rem;
    transform: rotate(-45deg);
    transform-origin: left top;
    position: absolute;
    left: 50%;
    top: 100%;
  }
}

@media (max-width: 480px) {
  .page-header h1 {
    font-size: 2rem;
  }
  
  .header-content {
    padding: 2rem 0;
  }
  
  .intro-card {
    padding: 1.5rem;
  }
  
  .intro-header h2 {
    font-size: 1.5rem;
  }
}
</style>