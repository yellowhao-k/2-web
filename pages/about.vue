<template>
  <div class="about-page">
    <BaseSeo
      :title="`关于我们 - ${companyInfo.name} | 15年专注跨境物流方案`"
      :description="`了解${companyInfo.name}：深耕跨境物流15年，业务覆盖${companyInfo.markets.join('、')}等${companyInfo.markets.length}个国家和地区。提供海运、空运及双清包税一站式服务，您的全球贸易增长伙伴。`"
      :jsonLd="combinedJsonLd"
    />

    <!-- 英雄区域 -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="container">
          <div class="hero-text">
            <h1 class="hero-title">连接世界，<span class="highlight">物流全球</span></h1>
            <p class="hero-subtitle">
              专业的跨境物流服务提供商，致力于为全球客户提供安全、快速、可靠的国际物流解决方案。
              我们不仅是物流服务商，更是您跨境业务的战略伙伴。
            </p>
            <div class="hero-stats">
              <div class="stat-item">
                <span class="stat-number">15+</span>
                <span class="stat-label">年行业经验</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">50+</span>
                <span class="stat-label">国家覆盖</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">10,000+</span>
                <span class="stat-label">客户信赖</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">99.8%</span>
                <span class="stat-label">准时送达率</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="hero-image">
        <div class="image-container">
          <!-- 这里可以添加动态物流图或背景视频 -->
          <div class="logistics-animation">
            <div class="map-overlay"></div>
            <div class="route-line route-usa"></div>
            <div class="route-line route-europe"></div>
            <div class="route-line route-asia"></div>
          </div>
        </div>
      </div>
    </section>

    <div class="container">
      <Breadcrumb :items="breadcrumbItems" />
      <!-- 公司简介 -->
      <section class="intro-section">
        <div class="section-header">
          <h2 class="section-title">关于 <span class="company-name">{{ companyInfo.name }}</span></h2>
          <p class="section-subtitle">我们的使命是让跨境物流更简单、更高效、更可靠</p>
        </div>
        
        <div class="intro-content">
          <div class="intro-text">
            <p>
              自2010年成立以来，{{ companyInfo.name }}始终致力于为全球客户提供专业的跨境物流解决方案。
              我们从一家小型物流公司发展成为覆盖全球主要市场的行业领先企业，这背后是我们对服务质量的不懈追求。
            </p>
            <p>
              我们理解每一次货物的运输都关系到客户的业务发展，因此我们以最高的标准要求自己，
              确保每一票货物都能安全、准时地送达目的地。了解更多我们的
              <NuxtLink to="/services" class="internal-link">服务范围</NuxtLink>
              和
              <NuxtLink to="/cases" class="internal-link">成功案例</NuxtLink>。
            </p>
            <div class="cta-buttons">
              <NuxtLink to="/contact" class="btn btn-primary">
                <i class="icon-consult"></i>
                立即咨询
              </NuxtLink>
              <NuxtLink to="/tools" class="btn btn-outline">
                <i class="icon-tools"></i>
                使用物流工具
              </NuxtLink>
            </div>
          </div>
          
          <div class="intro-image">
            <div class="image-card">
              <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="我们的团队" />
              <div class="image-caption">专业物流团队在工作</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心价值观 -->
      <section class="values-section">
        <div class="section-header">
          <h2 class="section-title">核心价值观</h2>
          <p class="section-subtitle">驱动我们前进的信念与原则</p>
        </div>
        
        <div class="values-grid">
          <div class="value-card">
            <div class="value-icon">
              <i class="icon-trust"></i>
            </div>
            <h3 class="value-title">诚信可靠</h3>
            <p class="value-description">
              我们以诚信为本，承诺必达。每一个承诺都是我们对客户的坚定保障。
              了解更多我们的
              <NuxtLink to="/articles/company" class="internal-link">企业承诺</NuxtLink>。
            </p>
          </div>
          
          <div class="value-card">
            <div class="value-icon">
              <i class="icon-innovation"></i>
            </div>
            <h3 class="value-title">创新驱动</h3>
            <p class="value-description">
              持续创新物流解决方案，运用科技提升效率。探索我们的
              <NuxtLink to="/tools" class="internal-link">智能物流工具</NuxtLink>。
            </p>
          </div>
          
          <div class="value-card">
            <div class="value-icon">
              <i class="icon-customer"></i>
            </div>
            <h3 class="value-title">客户至上</h3>
            <p class="value-description">
              倾听客户需求，提供个性化解决方案。查看
              <NuxtLink to="/cases" class="internal-link">客户满意故事</NuxtLink>。
            </p>
          </div>
          
          <div class="value-card">
            <div class="value-icon">
              <i class="icon-global"></i>
            </div>
            <h3 class="value-title">全球视野</h3>
            <p class="value-description">
              立足中国，服务全球，构建国际化物流网络。了解我们的
              <NuxtLink to="/routes" class="internal-link">全球线路覆盖</NuxtLink>。
            </p>
          </div>
        </div>
      </section>

      <!-- 发展历程时间轴 -->
      <section class="timeline-section">
        <div class="section-header">
          <h2 class="section-title">发展历程</h2>
          <p class="section-subtitle">每一步都坚实有力，每一天都在进步</p>
        </div>
        
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-year">2010</div>
            <div class="timeline-content">
              <h3 class="timeline-title">公司创立</h3>
              <p class="timeline-description">
                {{ companyInfo.name }}正式成立，专注于中美跨境物流服务。
                从一个小团队开始，我们坚信专业服务的力量。
              </p>
              <div class="timeline-links">
                <span class="timeline-tag">创业初期</span>
              </div>
            </div>
          </div>
          
          <div class="timeline-item">
            <div class="timeline-year">2013</div>
            <div class="timeline-content">
              <h3 class="timeline-title">欧洲市场拓展</h3>
              <p class="timeline-description">
                成功开拓欧洲市场，新增
                <NuxtLink to="/routes/europe" class="internal-link">欧洲专线</NuxtLink>
                服务，服务网络实现重大突破。
              </p>
              <div class="timeline-links">
                <span class="timeline-tag">国际扩张</span>
              </div>
            </div>
          </div>
          
          <div class="timeline-item">
            <div class="timeline-year">2016</div>
            <div class="timeline-content">
              <h3 class="timeline-title">数字化升级</h3>
              <p class="timeline-description">
                全面升级物流管理系统，推出在线追踪平台，为客户提供实时物流信息。
              </p>
              <div class="timeline-links">
                <span class="timeline-tag">技术革新</span>
              </div>
            </div>
          </div>
          
          <div class="timeline-item">
            <div class="timeline-year">2019</div>
            <div class="timeline-content">
              <h3 class="timeline-title">东南亚战略布局</h3>
              <p class="timeline-description">
                重点布局东南亚市场，建立本地化运营团队，推出
                <NuxtLink to="/routes/sea" class="internal-link">东南亚专线</NuxtLink>
                特色服务。
              </p>
              <div class="timeline-links">
                <span class="timeline-tag">区域深耕</span>
              </div>
            </div>
          </div>
          
          <div class="timeline-item">
            <div class="timeline-year">2022</div>
            <div class="timeline-content">
              <h3 class="timeline-title">绿色物流倡议</h3>
              <p class="timeline-description">
                启动绿色物流项目，优化运输路线减少碳排放，践行企业社会责任。
              </p>
              <div class="timeline-links">
                <span class="timeline-tag">可持续发展</span>
                <NuxtLink to="/articles/industry" class="internal-link">行业新闻</NuxtLink>
              </div>
            </div>
          </div>
          
          <div class="timeline-item">
            <div class="timeline-year">今&nbsp;&nbsp;天</div>
            <div class="timeline-content">
              <h3 class="timeline-title">持续创新前行</h3>
              <p class="timeline-description">
                继续拓展全球服务网络，探索智慧物流解决方案，为客户创造更大价值。
                了解我们最新的
                <NuxtLink to="/articles/company" class="internal-link">公司动态</NuxtLink>。
              </p>
              <div class="timeline-links">
                <span class="timeline-tag active">现在进行时</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 领导团队 -->
      <section class="team-section">
        <div class="section-header">
          <h2 class="section-title">核心团队</h2>
          <p class="section-subtitle">专业、专注、专心的物流专家</p>
        </div>
        
        <div class="team-grid">
          <div class="team-member">
            <div class="member-avatar">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="CEO" />
            </div>
            <h3 class="member-name">张伟</h3>
            <p class="member-title">创始人 & CEO</p>
            <p class="member-description">
              20年国际物流经验，曾任职多家国际物流企业高管，
              对全球物流市场有深刻洞察。
            </p>
          </div>
          
          <div class="team-member">
            <div class="member-avatar">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="COO" />
            </div>
            <h3 class="member-name">李娜</h3>
            <p class="member-title">首席运营官 COO</p>
            <p class="member-description">
              负责全球运营网络管理，精通多国海关政策，
              确保每一票货物的顺畅运输。
            </p>
          </div>
          
          <div class="team-member">
            <div class="member-avatar">
              <img src="https://images.unsplash.com/photo-1556157382-2eda2afc49d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="CTO" />
            </div>
            <h3 class="member-name">王明</h3>
            <p class="member-title">首席技术官 CTO</p>
            <p class="member-description">
              领导技术团队开发智能物流系统，推动公司数字化转型，
              提升服务效率。
            </p>
          </div>
        </div>
      </section>

      <!-- 合作伙伴 -->
      <section class="partners-section">
        <div class="section-header">
          <h2 class="section-title">合作伙伴</h2>
          <p class="section-subtitle">与全球领先企业携手，共创价值</p>
        </div>
        
        <div class="partners-grid">
          <div class="partner-logo">
            <div class="logo-placeholder">DHL</div>
          </div>
          <div class="partner-logo">
            <div class="logo-placeholder">FedEx</div>
          </div>
          <div class="partner-logo">
            <div class="logo-placeholder">UPS</div>
          </div>
          <div class="partner-logo">
            <div class="logo-placeholder">顺丰</div>
          </div>
          <div class="partner-logo">
            <div class="logo-placeholder">马士基</div>
          </div>
          <div class="partner-logo">
            <div class="logo-placeholder">中国邮政</div>
          </div>
        </div>
      </section>

      <!-- 行动号召 -->
      <section class="action-section">
        <div class="action-card">
          <div class="action-content">
            <h2 class="action-title">开启您的全球物流之旅</h2>
            <p class="action-description">
              无论您是第一次尝试跨境物流，还是希望优化现有物流方案，
              我们都将为您提供专业的咨询和定制化服务。
            </p>
            <div class="action-buttons">
              <NuxtLink to="/contact" class="btn btn-primary btn-large">
                <i class="icon-phone"></i>
                立即联系
              </NuxtLink>
              <NuxtLink to="/services" class="btn btn-outline btn-large">
                <i class="icon-services"></i>
                查看服务
              </NuxtLink>
            </div>
          </div>
          <div class="action-image">
            <div class="image-placeholder">
              <i class="icon-global"></i>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { COMPANY_INFO } from '~/composables/constants'

const companyInfo = COMPANY_INFO

const breadcrumbItems = [
  { name: '首页', path: '/' },
  { name: '关于我们', path: '/about' }
]

/* ================= 增强型 JSON-LD ================= */
// 1. 组织机构信息
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LogisticsCenter', // 更具体的类型有利于行业排名
  'name': companyInfo.name,
  'url': companyInfo.domain,
  'logo': companyInfo.domain + companyInfo.logo,
  'description': `${companyInfo.name}提供专业的跨境物流解决方案，包括FBA头程、海运、空运及海外仓服务。`,
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': companyInfo.address,
    'addressCountry': 'CN'
  },
  'telephone': companyInfo.phone,
  'openingHours': 'Mo-Fr 09:00-18:00',
  'sameAs': [
    // 如果有社交媒体链接，放在这里
  ]
}

// 2. 面包屑导航结构化数据 (非常有利于 Google 抓取层级)
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': breadcrumbItems.map((item, index) => ({
    '@type': 'ListItem',
    'position': index + 1,
    'name': item.name,
    'item': companyInfo.domain + item.path
  }))
}

// 合并 JSON-LD
const combinedJsonLd = [organizationJsonLd, breadcrumbJsonLd]
</script>

<style scoped>
.about-page {
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 英雄区域 */
.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 600px;
  background: linear-gradient(135deg, #1a2980 0%, #26d0ce 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

@media (max-width: 992px) {
  .hero-section {
    grid-template-columns: 1fr;
    min-height: auto;
  }
}

.hero-content {
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 2;
}

.hero-text {
  max-width: 600px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.highlight {
  color: #ffd700;
  position: relative;
  display: inline-block;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 8px;
  background: rgba(255, 215, 0, 0.2);
  z-index: -1;
}

.hero-subtitle {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  opacity: 0.95;
  max-width: 90%;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

@media (max-width: 576px) {
  .hero-stats {
    grid-template-columns: 1fr;
  }
}

.stat-item {
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-label {
  font-size: 0.95rem;
  opacity: 0.9;
}

.hero-image {
  position: relative;
  overflow: hidden;
}

.image-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.logistics-animation {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #0a2463, #3e92cc);
  position: relative;
}

.map-overlay {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
}

.route-line {
  position: absolute;
  height: 2px;
  background: linear-gradient(90deg, transparent, #ffd700, transparent);
  animation: moveLine 3s linear infinite;
}

.route-usa {
  top: 30%;
  left: 20%;
  width: 40%;
  animation-delay: 0s;
}

.route-europe {
  top: 50%;
  left: 10%;
  width: 50%;
  animation-delay: 1s;
}

.route-asia {
  top: 70%;
  left: 30%;
  width: 35%;
  animation-delay: 2s;
}

@keyframes moveLine {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  10%, 90% {
    opacity: 1;
  }
  100% {
    transform: translateX(200%);
    opacity: 0;
  }
}

/* 通用部分样式 */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a2980;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #1a2980, #26d0ce);
  border-radius: 2px;
}

.company-name {
  color: #26d0ce;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
}

/* 公司简介 */
.intro-section {
  padding: 5rem 0;
}

.intro-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

@media (max-width: 992px) {
  .intro-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

.intro-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #475569;
}

.intro-text p {
  margin-bottom: 1.5rem;
}

.internal-link {
  color: #1a2980;
  text-decoration: none;
  font-weight: 600;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.internal-link:hover {
  color: #26d0ce;
  border-bottom-color: #26d0ce;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

@media (max-width: 992px) {
  .cta-buttons {
    justify-content: center;
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

.btn-primary {
  background: linear-gradient(135deg, #1a2980, #26d0ce);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(26, 41, 128, 0.2);
}

.btn-outline {
  background: transparent;
  color: #1a2980;
  border-color: #1a2980;
}

.btn-outline:hover {
  background: #1a2980;
  color: white;
  transform: translateY(-2px);
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

.intro-image {
  position: relative;
}

.image-card {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.image-card:hover {
  transform: translateY(-10px) rotate(1deg);
}

.image-card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
}

.image-caption {
  padding: 1rem;
  background: white;
  text-align: center;
  color: #64748b;
  font-size: 0.9rem;
}

/* 核心价值观 */
.values-section {
  padding: 5rem 0;
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.value-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.value-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #1a2980, #26d0ce);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.value-card:hover::before {
  transform: scaleX(1);
}

.value-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, #1a2980, #26d0ce);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
}

.value-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1a2980;
}

.value-description {
  color: #64748b;
  line-height: 1.6;
}

/* 时间轴 */
.timeline-section {
  padding: 5rem 0;
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 4rem auto 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, #1a2980, #26d0ce);
}

@media (max-width: 768px) {
  .timeline::before {
    left: 30px;
  }
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 3rem;
  position: relative;
}

@media (max-width: 768px) {
  .timeline-item {
    flex-direction: column;
  }
}

.timeline-year {
  flex: 0 0 120px;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, #1a2980, #26d0ce);
  padding: 0.5rem 1rem;
  border-radius: 30px;
  text-align: center;
  position: relative;
  z-index: 2;
}

@media (max-width: 768px) {
  .timeline-year {
    margin-bottom: 1rem;
    align-self: flex-start;
  }
}

.timeline-content {
  flex: 1;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  margin-left: 2rem;
  position: relative;
}

@media (max-width: 768px) {
  .timeline-content {
    margin-left: 0;
    width: 100%;
  }
}

.timeline-content::before {
  content: '';
  position: absolute;
  left: -20px;
  top: 30px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 20px 10px 0;
  border-color: transparent white transparent transparent;
}

@media (max-width: 768px) {
  .timeline-content::before {
    display: none;
  }
}

.timeline-title {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #1a2980;
}

.timeline-description {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.timeline-links {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.timeline-tag {
  font-size: 0.8rem;
  padding: 0.25rem 0.75rem;
  background: #e2e8f0;
  color: #64748b;
  border-radius: 15px;
  display: inline-block;
}

.timeline-tag.active {
  background: linear-gradient(135deg, #1a2980, #26d0ce);
  color: white;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(26, 41, 128, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(26, 41, 128, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(26, 41, 128, 0);
  }
}

/* 团队部分 */
.team-section {
  padding: 5rem 0;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 3rem;
}

.team-member {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.team-member:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.member-avatar {
  width: 150px;
  height: 150px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #e2e8f0;
}

.member-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-name {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #1a2980;
}

.member-title {
  font-size: 1rem;
  color: #26d0ce;
  margin-bottom: 1rem;
  font-weight: 600;
}

.member-description {
  color: #64748b;
  line-height: 1.6;
}

/* 合作伙伴 */
.partners-section {
  padding: 5rem 0;
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.partner-logo {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.partner-logo:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.logo-placeholder {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a2980;
  opacity: 0.7;
}

/* 行动号召 */
.action-section {
  padding: 5rem 0;
}

.action-card {
  background: linear-gradient(135deg, #1a2980, #26d0ce);
  border-radius: 24px;
  padding: 4rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  color: white;
  position: relative;
  overflow: hidden;
}

@media (max-width: 992px) {
  .action-card {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 3rem 2rem;
  }
}

.action-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
}

.action-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
}

.action-description {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  line-height: 1.6;
  position: relative;
  z-index: 2;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  position: relative;
  z-index: 2;
}

@media (max-width: 992px) {
  .action-buttons {
    justify-content: center;
  }
}

.action-card .btn-primary {
  background: white;
  color: #1a2980;
}

.action-card .btn-outline {
  background: transparent;
  color: white;
  border-color: white;
}

.action-card .btn-outline:hover {
  background: white;
  color: #1a2980;
}

.action-image {
  position: relative;
  z-index: 2;
}

.image-placeholder {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  color: rgba(255, 255, 255, 0.2);
}

/* 图标样式 */
.icon-consult:before { content: "💬"; }
.icon-tools:before { content: "🛠️"; }
.icon-trust:before { content: "🤝"; }
.icon-innovation:before { content: "💡"; }
.icon-customer:before { content: "👥"; }
.icon-global:before { content: "🌍"; }
.icon-phone:before { content: "📞"; }
.icon-services:before { content: "📦"; }

/* 响应式调整 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .hero-content {
    padding: 40px 20px;
  }
  
  .timeline-item {
    margin-bottom: 2rem;
  }
  
  .action-title {
    font-size: 2rem;
  }
}

@media (max-width: 576px) {
  .hero-stats {
    grid-template-columns: 1fr;
  }
  
  .cta-buttons {
    flex-direction: column;
    gap: 1rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>