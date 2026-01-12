<template>
  <div class="route-detail-page">
    <BaseSeo 
      :title="pageTitle" 
      :description="pageDesc" 
      :jsonLd="clearanceJsonLd"
    />
    <div class="container">
      <Breadcrumb :items="breadcrumbItems" />
      
      <div class="page-header">
        <h1>{{ routeInfo.name }} - 双清包税</h1>
        <p>一站式清关服务，省心省力</p>
      </div>

      <div class="service-content">
        <section class="content-section">
          <h2>双清包税服务介绍</h2>
          <div class="content-text">
            <p>我们提供{{ routeInfo.name }}双清包税服务，一站式解决出口报关和目的国清关问题。双清包税是指我们负责出口报关和目的国清关，并包含税费，让您省心省力。</p>
          </div>
        </section>

        <section class="content-section">
          <h2>服务内容</h2>
          <ul class="advantage-list">
            <li>出口报关：专业团队办理出口报关手续</li>
            <li>目的国清关：熟悉{{ routeInfo.name }}清关政策，快速通关</li>
            <li>包税服务：价格透明，无隐藏费用</li>
            <li>清关咨询：提供专业的清关咨询服务</li>
            <li>全程跟踪：实时跟踪清关进度</li>
          </ul>
        </section>

        <section class="content-section">
          <h2>适用货物</h2>
          <div class="goods-grid">
            <div class="goods-item">
              <h4>一般贸易货物</h4>
              <p>适合一般贸易货物，提供完整的清关服务</p>
            </div>
            <div class="goods-item">
              <h4>电商货物</h4>
              <p>适合电商货物，熟悉电商清关流程</p>
            </div>
            <div class="goods-item">
              <h4>个人物品</h4>
              <p>适合个人物品，提供个人物品清关服务</p>
            </div>
            <div class="goods-item">
              <h4>特殊货物</h4>
              <p>特殊货物需提前咨询，我们提供专业建议</p>
            </div>
          </div>
        </section>

        <section class="content-section">
          <h2>服务优势</h2>
          <div class="advantages-grid">
            <div class="advantage-item">
              <div class="advantage-icon">✓</div>
              <h4>专业团队</h4>
              <p>拥有经验丰富的清关专业团队</p>
            </div>
            <div class="advantage-item">
              <div class="advantage-icon">✓</div>
              <h4>快速通关</h4>
              <p>熟悉各国清关政策，快速通关</p>
            </div>
            <div class="advantage-item">
              <div class="advantage-icon">✓</div>
              <h4>价格透明</h4>
              <p>价格透明，无隐藏费用</p>
            </div>
            <div class="advantage-item">
              <div class="advantage-icon">✓</div>
              <h4>省心省力</h4>
              <p>全程代办，让您省心省力</p>
            </div>
          </div>
        </section>
      </div>

      <ServiceCTA />
    </div>
  </div>
</template>

<script setup>
import { COMPANY_INFO } from '~/composables/constants'

const route = useRoute()
const routeName = route.params.route

const routeMap = {
  usa: { name: '美国专线' },
  australia: { name: '澳洲专线' },
  sea: { name: '东南亚专线' }
}


const routeInfo = routeMap[routeName] || routeMap.usa

const breadcrumbItems = computed(() => [
  { name: '首页', path: '/' },
  { name: '热门线路', path: '/routes' },
  { name: routeInfo.name, path: `/routes/${routeName}` },
  { name: '双清包税', path: `/routes/${routeName}/clearance` }
])

// 1. 动态生成 Title (建议：线路名 + 核心服务 + 关键词 + 公司名)
const pageTitle = computed(() => 
  `${routeInfo.name}双清包税_DDP国际物流门到门服务 - ${COMPANY_INFO.name}`
)

// 2. 动态生成 Description (建议：包含起运、清关、税费、派送全流程总结)
const pageDesc = computed(() => 
  `专业的${routeInfo.name}双清包税(DDP)服务。一站式解决出口报关、代缴关税、目的国清关及派送难题。价格透明无隐忧，适合电商FBA、一般贸易及个人物品快运。`
)

// 3. 整合 JsonLd
const clearanceJsonLd = computed(() => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": `${routeInfo.name}双清包税服务 (DDP)`,
        "description": pageDesc.value, // 复用 Description 保持一致
        "provider": {
          "@type": "Organization",
          "name": COMPANY_INFO.name
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "双清包税服务细项",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "出口报关 (Export Customs)" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "国际运输 (International Freight)" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "代缴关税 (Duty & Tax Paid)" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "目的国清关 (Import Customs)" } }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `什么是${routeInfo.name}双清包税？`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "双清包税（DDP）是指由货代负责出口报关、目的国进口清关，并由其代缴关税和税金。客户只需在国内交货，目的地直接收货即可。"
            }
          },
          {
            "@type": "Question",
            "name": `${routeInfo.name}双清服务包含哪些费用？`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "费用通常包含：起运港报关费、国际运费、目的国清关费、预缴关税及末端派送费，确保价格透明，无隐藏收费。"
            }
          }
        ]
      }
    ]
  }
})

</script>

<style scoped>
.route-detail-page {
  padding: 1rem 0;
  background: linear-gradient(to bottom, #ffffff 0%, #f8fdf9 100%);
  min-height: calc(100vh - 4rem);
}

.page-header {
  text-align: center;
  margin-bottom: 4rem;
  padding: 3rem 0;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(129, 199, 132, 0.1) 100%);
  /* background-color: #e8f4ff; */
  border-radius: 1rem;
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

.service-content {
  margin: 0 auto;
}

.content-section {
  margin-bottom: 4rem;
  background: #fff;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: var(--shadow);
}

.content-section h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  font-weight: 600;
  padding-bottom: 1rem;
  border-bottom: 3px solid var(--primary-color);
}

.content-text {
  line-height: 1.8;
  color: var(--text-color);
  font-size: 1.0625rem;
}

.content-text :deep(p) {
  margin-bottom: 1rem;
}

.advantage-list {
  list-style: none;
  padding: 0;
}

.advantage-list li {
  padding: 1rem 0;
  padding-left: 2.5rem;
  position: relative;
  color: var(--text-color);
  font-size: 1.0625rem;
  line-height: 1.8;
  border-bottom: 1px solid #f0f0f0;
}

.advantage-list li:last-child {
  border-bottom: none;
}

.advantage-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  top: 1rem;
  width: 1.5rem;
  height: 1.5rem;
  background: var(--primary-color);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.875rem;
}

.goods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.goods-item {
  padding: 2rem;
  background: #f8fdf9;
  border-radius: 0.5rem;
  border: 1px solid var(--primary-light);
  text-align: center;
}

.goods-item h4 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: var(--text-color);
  font-weight: 600;
}

.goods-item p {
  color: var(--text-light);
  line-height: 1.8;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.advantage-item {
  padding: 2rem;
  background: #f8fdf9;
  border-radius: 0.5rem;
  border: 1px solid var(--primary-light);
  text-align: center;
}

.advantage-icon {
  width: 3rem;
  height: 3rem;
  background: var(--primary-color);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 auto 1rem;
}

.advantage-item h4 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: var(--text-color);
  font-weight: 600;
}

.advantage-item p {
  color: var(--text-light);
  line-height: 1.8;
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2.25rem;
  }
  
  .content-section {
    padding: 1.5rem;
  }
  
  .content-section h2 {
    font-size: 1.5rem;
  }
  
  .goods-grid,
  .advantages-grid {
    grid-template-columns: 1fr;
  }
}
</style>

