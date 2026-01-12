<template>
  <div class="service-detail-page">
    <BaseSeo 
      :title="`${serviceInfo.name}_跨境物流方案 - ${COMPANY_INFO.name}`"
      :description="serviceInfo.description"
      :jsonLd="serviceJsonLd"
    />
    <div class="container">
      <Breadcrumb :items="breadcrumbItems" />
      
      <div class="page-header">
        <div class="header-content">
          <div class="service-icon-large">{{ serviceInfo.icon }}</div>
          <div class="header-text">
            <h1>{{ serviceInfo.name }}</h1>
            <p>{{ serviceInfo.description }}</p>
          </div>
        </div>
      </div>

      <div class="service-main-wrapper">
        <div class="service-content">
          <section class="content-section">
            <h2 class="section-title">服务介绍</h2>
            <div class="content-text" v-html="serviceInfo.introduction"></div>
          </section>

          <section class="content-section">
            <h2 class="section-title">服务优势</h2>
            <ul class="advantage-list">
              <li v-for="advantage in serviceInfo.advantages" :key="advantage">
                <span class="check-icon">✓</span>
                {{ advantage }}
              </li>
            </ul>
          </section>

          <section class="content-section">
            <h2 class="section-title">服务流程</h2>
            <div class="process-steps">
              <div 
                v-for="(step, index) in serviceInfo.process" 
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

          <section class="content-section" v-if="serviceInfo.features">
            <h2 class="section-title">服务特色</h2>
            <div class="features-grid">
              <div 
                v-for="feature in serviceInfo.features" 
                :key="feature.title"
                class="feature-item"
              >
                <h4>{{ feature.title }}</h4>
                <p>{{ feature.content }}</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div class="more-services-section" v-if="moreServices.length > 0">
    <div class="related-header">
      <h3 class="related-title">更多服务</h3>
    </div>
    
    <div class="services-grid-small">
      <NuxtLink 
        v-for="item in moreServices" 
        :key="item.id" 
        :to="item.path"
        class="service-card-mini"
      >
        <div class="mini-icon">{{ item.icon }}</div>
        <div class="mini-info">
          <h4>{{ item.name }}</h4>
          <p>{{ item.description }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>

    <ServiceCTA />
    </div>
  </div>
</template>

<script setup>
import { COMPANY_INFO, services } from '~/composables/constants'

const route = useRoute()
const serviceId = route.params.service

// 过滤掉当前正在查看的服务，并随机/取前4个作为“更多服务”
const moreServices = computed(() => {
  return services
    .filter(s => s.id !== serviceId) // 排除当前服务
    .slice(0, 4) // 取前4个
})
const serviceMap = {
  fba: {
    name: 'FBA头程',
    description: '专业的FBA头程物流服务，快速安全送达亚马逊仓库',
    icon: '🚚',
    introduction: '<p>FBA头程是指将货物从中国运输到亚马逊仓库的物流服务。我们提供专业的FBA头程服务，帮助卖家将货物安全、快速地送达亚马逊仓库，让卖家能够专注于产品销售。</p>',
    advantages: [
      '快速时效：7-15个工作日送达',
      '安全可靠：全程保险，货物安全有保障',
      '专业清关：熟悉各国清关政策，快速通关',
      '全程跟踪：实时物流跟踪，随时掌握货物动态',
      '价格优惠：与多家运输公司合作，提供优惠价格'
    ],
    process: [
      { title: '货物接收', description: '我们接收您的货物，进行质量检查' },
      { title: '出口报关', description: '专业团队办理出口报关手续' },
      { title: '国际运输', description: '选择最优运输方式，确保时效' },
      { title: '目的国清关', description: '快速完成清关手续' },
      { title: '派送到仓', description: '安全送达亚马逊仓库' }
    ],
    features: [
      { title: '多种运输方式', content: '支持空运、海运、快递等多种运输方式' },
      { title: '专业团队', content: '拥有经验丰富的物流专业团队' },
      { title: '全程跟踪', content: '实时物流跟踪，信息透明' }
    ]
  },
  air: {
    name: '空运专线',
    description: '快速空运服务，时效稳定可靠',
    icon: '✈️',
    introduction: '<p>空运专线服务提供快速、高效的航空运输解决方案，适合对时效要求较高的货物。我们与多家航空公司建立合作关系，为客户提供优惠价格和稳定时效。</p>',
    advantages: [
      '快速时效：5-10个工作日',
      '安全可靠：全程保险保障',
      '价格优惠：批量优惠，价格透明',
      '专业服务：经验丰富的空运团队',
      '全程跟踪：实时物流信息'
    ],
    process: [
      { title: '订舱', description: '根据货物情况预订舱位' },
      { title: '提货', description: '安排上门提货或接收货物' },
      { title: '报关', description: '办理出口报关手续' },
      { title: '空运', description: '安排航班运输' },
      { title: '清关', description: '目的国清关' },
      { title: '派送', description: '派送到指定地址' }
    ]
  },
  sea: {
    name: '海运专线',
    description: '经济实惠的海运服务，适合大批量货物',
    icon: '🚢',
    introduction: '<p>海运专线服务提供经济实惠的海上运输解决方案，适合大批量货物运输。我们提供整柜和拼柜服务，满足不同客户的需求。</p>',
    advantages: [
      '价格优惠：海运价格经济实惠',
      '适合大批量：支持整柜和拼柜',
      '稳定可靠：定期班轮，时效稳定',
      '覆盖广泛：覆盖全球主要港口',
      '专业服务：专业的海运团队'
    ],
    process: [
      { title: '订舱', description: '根据货物情况预订舱位' },
      { title: '装柜', description: '安排装柜和拖车' },
      { title: '报关', description: '办理出口报关手续' },
      { title: '海运', description: '安排船期运输' },
      { title: '清关', description: '目的国清关' },
      { title: '派送', description: '派送到指定地址' }
    ]
  },
  parcel: {
    name: '电商小包',
    description: '专业的电商小包服务，快速便捷',
    icon: '📦',
    introduction: '<p>电商小包服务专为跨境电商卖家设计，提供快速、便捷的小包裹运输服务。适合轻小件商品，价格优惠，时效稳定。</p>',
    advantages: [
      '价格优惠：小包价格经济实惠',
      '快速便捷：操作简单，快速发货',
      '覆盖广泛：覆盖全球主要国家',
      '跟踪服务：提供物流跟踪服务',
      '专业包装：专业的包装服务'
    ],
    process: [
      { title: '下单', description: '在线下单或联系客服' },
      { title: '打包', description: '专业包装服务' },
      { title: '发货', description: '安排发货' },
      { title: '运输', description: '国际运输' },
      { title: '派送', description: '派送到收件人' }
    ]
  },
  express: {
    name: '快递专线',
    description: '门到门快递服务，全程跟踪',
    icon: '📮',
    introduction: '<p>快递专线服务提供门到门的快速快递服务，全程跟踪，安全可靠。适合对时效要求较高的货物。</p>',
    advantages: [
      '快速时效：3-7个工作日',
      '门到门服务：全程门到门服务',
      '全程跟踪：实时物流跟踪',
      '安全可靠：全程保险保障',
      '专业服务：专业的快递团队'
    ],
    process: [
      { title: '下单', description: '在线下单或联系客服' },
      { title: '上门取件', description: '安排上门取件' },
      { title: '运输', description: '国际快递运输' },
      { title: '清关', description: '目的国清关' },
      { title: '派送', description: '派送到收件人' }
    ]
  },
  warehouse: {
    name: '海外仓一件代发',
    description: '海外仓储服务，支持一件代发',
    icon: '🏭',
    introduction: '<p>海外仓一件代发服务提供海外仓储和一件代发服务，帮助卖家实现本地化发货，提升客户体验。</p>',
    advantages: [
      '快速发货：本地发货，时效快速',
      '降低成本：降低物流成本',
      '提升体验：提升客户购物体验',
      '库存管理：专业的库存管理系统',
      '一件代发：支持一件代发服务'
    ],
    process: [
      { title: '货物入库', description: '货物运输到海外仓' },
      { title: '仓储管理', description: '专业的仓储管理' },
      { title: '订单处理', description: '接收订单并处理' },
      { title: '打包发货', description: '打包并安排发货' },
      { title: '物流跟踪', description: '提供物流跟踪服务' }
    ]
  },
  clearance: {
    name: '双清包税',
    description: '一站式清关服务，省心省力',
    icon: '📋',
    introduction: '<p>双清包税服务提供出口报关和目的国清关的一站式服务，让您省心省力。我们熟悉各国清关政策，确保货物顺利通关。</p>',
    advantages: [
      '一站式服务：出口报关和目的国清关',
      '专业团队：熟悉各国清关政策',
      '快速通关：高效清关，快速通关',
      '价格透明：价格透明，无隐藏费用',
      '省心省力：全程代办，省心省力'
    ],
    process: [
      { title: '资料准备', description: '准备清关所需资料' },
      { title: '出口报关', description: '办理出口报关手续' },
      { title: '国际运输', description: '安排国际运输' },
      { title: '目的国清关', description: '办理目的国清关手续' },
      { title: '完成清关', description: '完成清关，货物放行' }
    ]
  },
  truck: {
    name: '欧洲卡航',
    description: '欧洲卡航专线，快速直达',
    icon: '🚛',
    introduction: '<p>欧洲卡航专线提供快速直达欧洲的卡车运输服务，时效稳定，价格优惠。适合对时效有一定要求但不需要空运的货物。</p>',
    advantages: [
      '快速时效：15-25个工作日',
      '价格优惠：比空运便宜，比海运快',
      '稳定可靠：定期班次，时效稳定',
      '覆盖广泛：覆盖欧洲主要国家',
      '专业服务：专业的卡航团队'
    ],
    process: [
      { title: '订舱', description: '根据货物情况预订舱位' },
      { title: '装车', description: '安排装车' },
      { title: '报关', description: '办理出口报关手续' },
      { title: '运输', description: '卡车运输到欧洲' },
      { title: '清关', description: '目的国清关' },
      { title: '派送', description: '派送到指定地址' }
    ]
  },
  railway: {
    name: '铁路专线',
    description: '中欧铁路专线，经济高效',
    icon: '🚂',
    introduction: '<p>中欧铁路专线提供经济高效的中欧铁路运输服务，价格比空运便宜，时效比海运快，是性价比很高的运输方式。</p>',
    advantages: [
      '经济高效：价格比空运便宜，时效比海运快',
      '稳定可靠：定期班列，时效稳定',
      '覆盖广泛：覆盖中欧主要城市',
      '绿色环保：铁路运输更环保',
      '专业服务：专业的铁路运输团队'
    ],
    process: [
      { title: '订舱', description: '根据货物情况预订舱位' },
      { title: '装车', description: '安排装车' },
      { title: '报关', description: '办理出口报关手续' },
      { title: '运输', description: '铁路运输到欧洲' },
      { title: '清关', description: '目的国清关' },
      { title: '派送', description: '派送到指定地址' }
    ]
  }
}

const serviceInfo = serviceMap[serviceId] || serviceMap.fba

const breadcrumbItems = computed(() => [
  { name: '首页', path: '/' },
  { name: '业务范围', path: '/services' },
  { name: serviceInfo.name, path: `/services/${serviceId}` }
])

// 3. 结构化数据 JSON-LD
const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  'name': serviceInfo.name,
  'description': serviceInfo.description,
  'provider': {
    '@type': 'LocalBusiness',
    'name': COMPANY_INFO.name,
    'telephone': COMPANY_INFO.phone
  },
  'serviceType': 'LogisticsService'
}

</script>

<style scoped>
/* 1. 基础容器与宽度对齐 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.service-detail-page {
  padding: 1rem 0;
  background: #fff;
}

/* 2. 页面头部调整 */
.page-header {
  margin-bottom: 3rem;
  padding: 2rem 0;
  border-bottom: 1px solid #eee;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.service-icon-large {
  font-size: 4rem;
  background: #f8f9fa;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 700;
}

/* 3. 核心边框容器 */
.service-main-wrapper {
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  padding: 40px;
  margin-bottom: 3rem;
  background: #fff;
}

.section-title {
  font-size: 1.5rem;
  margin: 0 0 2rem;
  padding-bottom: 0.8rem;
  color: #333;
  position: relative;
  border-bottom: 1px solid #eee;
}

/* 蓝色装饰短线 */
.section-title::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 45px;
  height: 2px;
  background-color: #5bc0de;
}

.content-section {
  margin-bottom: 4rem;
}

.content-section:last-child {
  margin-bottom: 0;
}

/* 4. 列表与步骤样式优化 */
.advantage-list li {
  padding: 1rem 0;
  padding-left: 2rem;
  position: relative;
  border-bottom: 1px dashed #eee;
  color: #555;
}

.check-icon {
  position: absolute;
  left: 0;
  color: #5bc0de;
  font-weight: bold;
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 保持两列布局对齐感 */
  gap: 2rem;
}

.process-step {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #fcfcfc;
  border-radius: 6px;
}

.step-number {
  width: 2.5rem;
  height: 2.5rem;
  background: #5bc0de;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}


.more-services-section {
  margin: 4rem 0;
}

/* 复用相关文章的标题样式 */
.related-header {
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
}

.related-title {
  font-size: 1.25rem;
  margin: 0;
  padding-bottom: 0.8rem;
  color: #333;
  display: inline-block;
  position: relative;
}

.related-title::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 45px;
  height: 2px;
  background-color: #5bc0de;
}

/* 4列网格布局 */
.services-grid-small {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.service-card-mini {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  height: 100%;
}

.service-card-mini:hover {
  border-color: #5bc0de;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transform: translateY(-3px);
}

.mini-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.mini-info h4 {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.mini-info p {
  font-size: 0.875rem;
  color: #888;
  line-height: 1.4;
  /* 限制描述行数，保持对齐 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 响应式适配 */
@media (max-width: 1200px) {
  .services-grid-small {
    grid-template-columns: repeat(2, 1fr); /* 平板端2列 */
  }
}

@media (max-width: 640px) {
  .services-grid-small {
    grid-template-columns: 1fr; /* 手机端1列 */
  }
}

@media (max-width: 992px) {
  .service-main-wrapper {
    padding: 20px;
  }
  .process-steps {
    grid-template-columns: 1fr;
  }
  .header-content {
    flex-direction: column;
    text-align: center;
  }
}
</style>
