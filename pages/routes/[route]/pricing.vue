<template>
  <div class="route-detail-page">
    <BaseSeo 
      :title="pageTitle" 
      :description="pageDesc" 
      :jsonLd="pricingJsonLd"
    />
    <div class="container">
      <Breadcrumb :items="breadcrumbItems" />
      
      <div class="page-header">
        <h1>{{ routeInfo.name }} - 价格与时效</h1>
        <p>透明的价格，稳定的时效</p>
      </div>

      <div class="service-content">
        <section class="content-section">
          <h2>价格表</h2>
          <div class="pricing-table-wrapper">
            <table class="pricing-table">
              <thead>
                <tr>
                  <th>运输方式</th>
                  <th>时效</th>
                  <th>首重价格</th>
                  <th>续重价格</th>
                  <th>最低收费</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="price in routeInfo.pricing" :key="price.method">
                  <td><strong>{{ price.method }}</strong></td>
                  <td>{{ price.time }}</td>
                  <td>{{ price.firstPrice }}</td>
                  <td>{{ price.continuePrice }}</td>
                  <td>{{ price.minPrice }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="pricing-note">* 以上价格仅供参考，实际价格以咨询为准。价格可能因货物类型、重量、体积等因素有所调整。</p>
        </section>

        <section class="content-section">
          <h2>时效说明</h2>
          <div class="timeline-info">
            <div class="timeline-item" v-for="(item, index) in routeInfo.timeline" :key="index">
              <div class="timeline-icon">{{ index + 1 }}</div>
              <div class="timeline-content">
                <h4>{{ item.stage }}</h4>
                <p>{{ item.time }}</p>
              </div>
            </div>
          </div>
        </section>

        <section class="content-section">
          <h2>价格说明</h2>
          <ul class="price-notes">
            <li>价格包含：运输费用、清关费用、税费（如适用）</li>
            <li>价格不包含：特殊包装费、保险费（可选）、仓储费（如适用）</li>
            <li>计费方式：按实际重量或体积重量，取较大值</li>
            <li>价格调整：如遇燃油附加费、汇率波动等情况，价格可能调整</li>
            <li>优惠政策：批量货物、长期合作客户可享受优惠价格</li>
          </ul>
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
    pricing: [
      { method: '空运', time: '7-10个工作日', firstPrice: '¥45/kg', continuePrice: '¥38/kg', minPrice: '¥200' },
      { method: '海运', time: '25-35个工作日', firstPrice: '¥12/kg', continuePrice: '¥8/kg', minPrice: '¥500' },
      { method: '快递', time: '5-7个工作日', firstPrice: '¥65/kg', continuePrice: '¥55/kg', minPrice: '¥300' }
    ],
    timeline: [
      { stage: '提货/接收', time: '1-2个工作日' },
      { stage: '出口报关', time: '1-2个工作日' },
      { stage: '国际运输', time: '3-5个工作日（空运）/ 20-30个工作日（海运）' },
      { stage: '目的国清关', time: '2-3个工作日' },
      { stage: '派送', time: '1-2个工作日' }
    ]
  },
  australia: {
    name: '澳洲专线',
    pricing: [
      { method: '空运', time: '10-15个工作日', firstPrice: '¥50/kg', continuePrice: '¥42/kg', minPrice: '¥250' },
      { method: '海运', time: '30-40个工作日', firstPrice: '¥15/kg', continuePrice: '¥10/kg', minPrice: '¥600' },
      { method: '快递', time: '7-10个工作日', firstPrice: '¥70/kg', continuePrice: '¥60/kg', minPrice: '¥350' }
    ],
    timeline: [
      { stage: '提货/接收', time: '1-2个工作日' },
      { stage: '出口报关', time: '1-2个工作日' },
      { stage: '国际运输', time: '5-8个工作日（空运）/ 25-35个工作日（海运）' },
      { stage: '目的国清关', time: '3-5个工作日' },
      { stage: '派送', time: '1-2个工作日' }
    ]
  },
  sea: {
    name: '东南亚专线',
    pricing: [
      { method: '空运', time: '5-8个工作日', firstPrice: '¥35/kg', continuePrice: '¥28/kg', minPrice: '¥150' },
      { method: '海运', time: '15-25个工作日', firstPrice: '¥10/kg', continuePrice: '¥6/kg', minPrice: '¥400' },
      { method: '快递', time: '3-5个工作日', firstPrice: '¥55/kg', continuePrice: '¥45/kg', minPrice: '¥250' }
    ],
    timeline: [
      { stage: '提货/接收', time: '1个工作日' },
      { stage: '出口报关', time: '1-2个工作日' },
      { stage: '国际运输', time: '2-4个工作日（空运）/ 12-20个工作日（海运）' },
      { stage: '目的国清关', time: '1-3个工作日' },
      { stage: '派送', time: '1个工作日' }
    ]
  }
}

const routeInfo = routeMap[routeName] || routeMap.usa

const breadcrumbItems = computed(() => [
  { name: '首页', path: '/' },
  { name: '热门线路', path: '/routes' },
  { name: routeInfo.name, path: `/routes/${routeName}` },
  { name: '价格与时效', path: `/routes/${routeName}/pricing` }
])

// 1. Title：直击价格和时效这两个核心痛点
const pageTitle = computed(() => 
  `${routeInfo.name}运费价格表_物流时效说明_${new Date().getFullYear()}报价 - ${COMPANY_INFO.name}`
)

// 2. Description：通过具体数值吸引点击
const pageDesc = computed(() => {
  const minPrice = routeInfo.pricing.find(p => p.method === '海运')?.firstPrice || '电询';
  return `查询最新${routeInfo.name}物流报价：海运低至${minPrice}起。涵盖空运、海运、快递全渠道时效说明，包含提货、清关、派送全流程节点。价格透明，计费清晰，助您精准预算物流成本。`
})

// 3. JsonLd：使用 Service + AggregateOffer (聚合报价) 模式
const pricingJsonLd = computed(() => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": `${routeInfo.name}物流报价与时效服务`,
        "description": pageDesc.value,
        "provider": { "@type": "Organization", "name": COMPANY_INFO.name },
        // 关键：将表格数据转化为结构化 Offer
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "CNY",
          "offerCount": routeInfo.pricing.length,
          "lowPrice": Math.min(...routeInfo.pricing.map(p => parseFloat(p.firstPrice.replace(/[^\d.]/g, '')))),
          "offers": routeInfo.pricing.map(p => ({
            "@type": "Offer",
            "name": `${p.method}运输`,
            "price": p.firstPrice.replace(/[^\d.]/g, ''),
            "description": `预计时效 ${p.time}`
          }))
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "国际物流计费重量如何计算？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "计费重量取实际重量与体积重量中的较大值。体积重计算公式通常为：长(cm) x 宽(cm) x 高(cm) / 6000（或5000，视具体渠道而定）。"
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

.pricing-table-wrapper {
  overflow-x: auto;
  margin: 2rem 0;
}

.pricing-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

.pricing-table th,
.pricing-table td {
  padding: 1.25rem;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
}

.pricing-table th {
  background: var(--primary-color);
  color: #fff;
  font-weight: 600;
  text-align: center;
}

.pricing-table td {
  text-align: center;
  color: var(--text-color);
}

.pricing-table tbody tr:hover {
  background: #f8fdf9;
}

.pricing-table strong {
  color: var(--primary-color);
  font-weight: 600;
}

.pricing-note {
  font-size: 0.875rem;
  color: var(--text-light);
  font-style: italic;
  margin-top: 1rem;
  line-height: 1.6;
}

.timeline-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 2rem 0;
}

.timeline-item {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.timeline-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: var(--primary-color);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 700;
  flex-shrink: 0;
}

.timeline-content {
  flex: 1;
  padding-top: 0.25rem;
}

.timeline-content h4 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-weight: 600;
}

.timeline-content p {
  color: var(--text-light);
  line-height: 1.8;
}

.price-notes {
  list-style: none;
  padding: 0;
}

.price-notes li {
  padding: 1rem 0;
  padding-left: 2rem;
  position: relative;
  color: var(--text-color);
  font-size: 1.0625rem;
  line-height: 1.8;
  border-bottom: 1px solid #f0f0f0;
}

.price-notes li:last-child {
  border-bottom: none;
}

.price-notes li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--primary-color);
  font-size: 1.5rem;
  line-height: 1;
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
  
  .timeline-item {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>

