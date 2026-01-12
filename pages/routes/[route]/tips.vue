<template>
  <div class="route-detail-page">
    <BaseSeo 
      :title="pageTitle" 
      :description="pageDesc" 
      :jsonLd="tipsJsonLd"
    />
    <div class="container">
      <Breadcrumb :items="breadcrumbItems" />
      
      <div class="page-header">
        <h1>{{ routeInfo.name }} - 避坑指南</h1>
        <p>了解常见问题，避免不必要的损失</p>
      </div>

      <div class="service-content">
        <section class="content-section">
          <h2>避坑指南</h2>
          <div class="content-text">
            <p>在{{ routeInfo.name }}物流过程中，需要注意以下事项，避免不必要的损失。我们总结了常见问题和解决方案，帮助您顺利完成物流运输。</p>
          </div>
        </section>

        <section class="content-section">
          <h2>常见问题及解决方案</h2>
          <div class="tips-list">
            <div 
              v-for="(tip, index) in routeInfo.tips" 
              :key="index"
              class="tip-item"
            >
              <div class="tip-number">{{ index + 1 }}</div>
              <div class="tip-content">
                <h3>{{ tip.title }}</h3>
                <p>{{ tip.content }}</p>
              </div>
            </div>
          </div>
        </section>

        <section class="content-section">
          <h2>注意事项</h2>
          <ul class="notice-list">
            <li v-for="notice in routeInfo.notices" :key="notice">
              <span class="notice-icon">⚠</span>
              {{ notice }}
            </li>
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
    tips: [
      {
        title: '货物包装',
        content: '确保货物包装牢固，符合美国运输标准，避免运输过程中损坏。建议使用专业的包装材料，对易碎物品进行特殊保护。'
      },
      {
        title: '清关文件',
        content: '准备完整的清关文件，包括商业发票、装箱单等，确保清关顺利。文件信息要准确无误，避免因文件问题导致清关延误。'
      },
      {
        title: '禁运物品',
        content: '注意美国禁运物品清单，避免运输违禁品导致货物被扣。常见禁运物品包括危险品、食品、药品等，需要提前了解相关规定。'
      },
      {
        title: '关税问题',
        content: '了解美国的关税政策，合理申报货物价值，避免因申报不实导致的问题。建议咨询专业的清关团队。'
      }
    ],
    notices: [
      '货物包装要符合美国运输标准',
      '清关文件要准备完整准确',
      '注意美国禁运物品清单',
      '合理申报货物价值',
      '选择可靠的物流服务商'
    ]
  },
  australia: {
    name: '澳洲专线',
    tips: [
      {
        title: '澳洲海关要求',
        content: '了解澳洲海关要求，确保货物符合澳洲进口标准，避免清关延误。澳洲对进口货物有严格的检验检疫要求。'
      },
      {
        title: 'GST税务',
        content: '注意澳洲GST税务政策，确保税务申报准确，避免税务问题。GST税率为10%，需要合理申报。'
      },
      {
        title: '生物安全',
        content: '澳洲对生物安全要求严格，注意相关物品的申报和检疫要求。食品、动植物制品等需要特殊处理。'
      },
      {
        title: '包装要求',
        content: '澳洲对包装材料有严格要求，需要使用符合标准的包装材料，避免因包装问题导致清关延误。'
      }
    ],
    notices: [
      '了解澳洲海关和检疫要求',
      '注意GST税务政策',
      '生物安全要求严格',
      '包装材料要符合标准',
      '选择有澳洲清关经验的物流商'
    ]
  },
  sea: {
    name: '东南亚专线',
    tips: [
      {
        title: '多国政策',
        content: '东南亚各国政策不同，需要了解目标国家的具体要求和规定。每个国家的清关政策、税率等都有所不同。'
      },
      {
        title: '语言沟通',
        content: '部分国家需要当地语言文件，建议提前准备相关翻译文件。确保文件信息准确，避免因语言问题导致清关延误。'
      },
      {
        title: '时效把握',
        content: '东南亚国家距离较近，但清关时间可能较长，需要合理规划时间。建议提前了解各国的清关时效。'
      },
      {
        title: '文化差异',
        content: '注意不同国家的文化差异和商业习惯，在文件准备和沟通中要尊重当地文化。'
      }
    ],
    notices: [
      '了解目标国家的具体政策',
      '准备当地语言文件',
      '合理规划清关时间',
      '注意文化差异',
      '选择熟悉当地市场的物流商'
    ]
  }
}

const routeInfo = routeMap[routeName] || routeMap.usa

const breadcrumbItems = computed(() => [
  { name: '首页', path: '/' },
  { name: '热门线路', path: '/routes' },
  { name: routeInfo.name, path: `/routes/${routeName}` },
  { name: '避坑指南', path: `/routes/${routeName}/tips` }
])

const pageTitle = computed(() => 
  `${routeInfo.name}物流避坑指南_清关注意事项与常见问题 - ${COMPANY_INFO.name}`
)

const pageDesc = computed(() => 
  `为您总结${routeInfo.name}运输中的常见陷阱：包含${routeInfo.tips.map(t => t.title).join('、')}等关键环节。通过专业的避坑建议，降低清关延误、货物被扣及额外税费风险。`
)

const tipsJsonLd = computed(() => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": pageTitle.value,
        "description": pageDesc.value,
        "author": { "@type": "Organization", "name": COMPANY_INFO.name },
        "datePublished": "2026-01-01", // 建议使用动态日期
        "articleSection": "Logistics Tips"
      },
      {
        "@type": "FAQPage",
        "mainEntity": routeInfo.tips.map(item => ({
          "@type": "Question",
          "name": `${routeInfo.name}${item.title}需要注意什么？`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.content
          }
        }))
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

.tips-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.tip-item {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  background: #f8fdf9;
  border-radius: 0.5rem;
  border-left: 4px solid var(--primary-color);
}

.tip-number {
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

.tip-content {
  flex: 1;
}

.tip-content h3 {
  font-size: 1.375rem;
  margin-bottom: 0.75rem;
  color: var(--text-color);
  font-weight: 600;
}

.tip-content p {
  color: var(--text-light);
  line-height: 1.8;
}

.notice-list {
  list-style: none;
  padding: 0;
}

.notice-list li {
  padding: 1rem 0;
  padding-left: 2.5rem;
  position: relative;
  color: var(--text-color);
  font-size: 1.0625rem;
  line-height: 1.8;
  border-bottom: 1px solid #f0f0f0;
}

.notice-list li:last-child {
  border-bottom: none;
}

.notice-icon {
  position: absolute;
  left: 0;
  top: 1rem;
  font-size: 1.25rem;
  color: #ff9800;
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
  
  .tip-item {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>

