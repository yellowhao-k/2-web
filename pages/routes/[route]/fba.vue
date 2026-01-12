<template>
  <div class="route-detail-page">
    <BaseSeo 
      :title="pageTitle" 
      :description="pageDesc" 
      :jsonLd="fbaJsonLd"
    />
    <div class="container">
      <Breadcrumb :items="breadcrumbItems" />
      
      <div class="page-header">
        <h1>{{ routeInfo.name }} - FBA头程</h1>
        <p>专业的FBA头程物流服务</p>
      </div>

      <div class="service-content">
        <section class="content-section">
          <h2>FBA头程服务介绍</h2>
          <div class="content-text">
            <p>我们提供专业的{{ routeInfo.name }}FBA头程服务，帮助您将货物安全、快速地送达亚马逊仓库。FBA头程是指将货物从中国运输到亚马逊仓库的物流服务，这是卖家使用FBA服务的第一步。</p>
          </div>
        </section>

        <section class="content-section">
          <h2>服务优势</h2>
          <ul class="advantage-list">
            <li>快速时效：{{ routeInfo.fbaTime }}</li>
            <li>安全可靠：全程保险，货物安全有保障</li>
            <li>专业清关：熟悉{{ routeInfo.name }}清关政策，快速通关</li>
            <li>全程跟踪：实时物流跟踪，随时掌握货物动态</li>
            <li>价格优惠：与多家运输公司合作，提供优惠价格</li>
          </ul>
        </section>

        <section class="content-section">
          <h2>服务流程</h2>
          <div class="process-steps">
            <div 
              v-for="(step, index) in serviceProcess" 
              :key="index"
              class="process-step"
            >
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-content">
                <h3>{{ step.title }}</h3>
                <p>{{ step.description }}</p>
              </div>
            </div>
          </div>
        </section>

        <section class="content-section">
          <h2>运输方式</h2>
          <div class="transport-methods">
            <div class="method-item">
              <h4>空运FBA头程</h4>
              <p>快速高效，适合紧急货物，时效{{ routeInfo.airTime }}</p>
            </div>
            <div class="method-item">
              <h4>海运FBA头程</h4>
              <p>经济实惠，适合大批量货物，时效{{ routeInfo.seaTime }}</p>
            </div>
            <div class="method-item">
              <h4>快递FBA头程</h4>
              <p>门到门服务，全程跟踪，时效{{ routeInfo.expressTime }}</p>
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
  usa: {
    name: '美国专线',
    fbaTime: '7-15个工作日',
    airTime: '7-10个工作日',
    seaTime: '25-35个工作日',
    expressTime: '5-7个工作日'
  },
  australia: {
    name: '澳洲专线',
    fbaTime: '10-20个工作日',
    airTime: '10-15个工作日',
    seaTime: '30-40个工作日',
    expressTime: '7-10个工作日'
  },
  sea: {
    name: '东南亚专线',
    fbaTime: '5-12个工作日',
    airTime: '5-8个工作日',
    seaTime: '15-25个工作日',
    expressTime: '3-5个工作日'
  }
}

const routeInfo = routeMap[routeName] || routeMap.usa

const serviceProcess = [
  { title: '货物接收', description: '我们接收您的货物，进行质量检查' },
  { title: '出口报关', description: '专业团队办理出口报关手续' },
  { title: '国际运输', description: '选择最优运输方式，确保时效' },
  { title: '目的国清关', description: '快速完成清关手续' },
  { title: '派送到仓', description: '安全送达亚马逊仓库' }
]

const breadcrumbItems = computed(() => [
  { name: '首页', path: '/' },
  { name: '热门线路', path: '/routes' },
  { name: routeInfo.name, path: `/routes/${routeName}` },
  { name: 'FBA头程', path: `/routes/${routeName}/fba` }
])

// 1. Title：包含“亚马逊”、“入仓”、“头程”等转化词
const pageTitle = computed(() => 
  `${routeInfo.name}亚马逊FBA头程运输_空派/海派入仓服务 - ${COMPANY_INFO.name}`
)

// 2. Description：强调时效、安全和专业性
const pageDesc = computed(() => 
  `专业的${routeInfo.name}FBA头程服务，最快${routeInfo.expressTime}送达。提供海运、空运及快递多种渠道入仓，专业清关，全程保险，确保您的亚马逊库存准时、安全入库。`
)

// 3. JsonLd：使用 Service 结合 Offers 模式，并注入 FBA 专用常见问题
const fbaJsonLd = computed(() => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": `${routeInfo.name}亚马逊FBA头程服务`,
        "description": pageDesc.value,
        "provider": {
          "@type": "Organization",
          "name": COMPANY_INFO.name
        },
        "areaServed": { "@type": "Country", "name": routeInfo.name.replace('专线', '') },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "FBA运输渠道",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "FBA空运专线", "description": `时效约${routeInfo.airTime}` } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "FBA海运专线", "description": `时效约${routeInfo.seaTime}` } }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `什么是${routeInfo.name}FBA头程？`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "FBA头程是指将货物从中国供应商处通过空运、海运或快递方式，经过清关、缴纳税费后，直接送达亚马逊指定的FBA仓库的过程。"
            }
          },
          {
            "@type": "Question",
            "name": "发往亚马逊FBA仓库有哪些注意事项？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "需确保外箱贴好FBA标签，重量不超标，不包含亚马逊禁售物品，并选择具备清关实力的物流商以防拒收。"
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

.process-steps {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.process-step {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.step-number {
  width: 3rem;
  height: 3rem;
  background: var(--primary-color);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-content h3 {
  font-size: 1.375rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-weight: 600;
}

.step-content p {
  color: var(--text-light);
  line-height: 1.8;
}

.transport-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.method-item {
  padding: 2rem;
  background: #f8fdf9;
  border-radius: 0.5rem;
  border: 1px solid var(--primary-light);
}

.method-item h4 {
  font-size: 1.375rem;
  margin-bottom: 0.75rem;
  color: var(--text-color);
  font-weight: 600;
}

.method-item p {
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
  
  .process-step {
    flex-direction: column;
    gap: 1rem;
  }
  
  .transport-methods {
    grid-template-columns: 1fr;
  }
}
</style>

