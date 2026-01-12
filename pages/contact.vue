<template>
  <div class="contact-page">
    <div class="container">
      <BaseSeo
        :title="`联系我们_获取物流报价_${companyInfo.name}_15年跨境货运代理`"
        :description="`想了解${companyInfo.services[0]}报价？欢迎联系${companyInfo.name}。提供深圳总部地址、咨询电话及在线报价单，我们将为您量身定制国际海运、空运及海外仓方案。`"
        :jsonLd="contactJsonLd"
      />
      <Breadcrumb :items="breadcrumbItems" />
      
      <!-- 页面标题和介绍 -->
      <section class="page-header">
        <h1 class="page-title">联系我们</h1>
        <p class="page-description">
          我们随时为您提供专业的跨境物流咨询服务，如果您有任何问题或需求，请随时与我们联系。
          您也可以访问我们的
          <NuxtLink to="/services" class="internal-link">业务范围</NuxtLink>
          或
          <NuxtLink to="/tools" class="internal-link">热门工具</NuxtLink>
          页面了解更多服务。
        </p>
      </section>
      
      <div class="contact-content">
        <!-- 联系信息卡片 -->
        <section class="contact-info-section">
          <div class="section-header">
            <h2 class="section-title">联系方式</h2>
            <p class="section-subtitle">选择最适合您的方式与我们沟通</p>
          </div>
          
          <div class="contact-cards">
            <div class="contact-card">
              <div class="contact-icon">
                <i class="icon-phone"></i>
              </div>
              <h3 class="contact-card-title">电话咨询</h3>
              <p class="contact-card-content">工作日 9:00-18:00</p>
              <a :href="`tel:${companyInfo.phone}`" class="contact-link">{{ companyInfo.phone }}</a>
              <p class="contact-tip">如需查询
                <NuxtLink to="/routes/usa" class="internal-link">美国专线</NuxtLink>
                或
                <NuxtLink to="/routes/australia" class="internal-link">澳洲专线</NuxtLink>
                价格，请直接来电咨询。
              </p>
            </div>
            
            <div class="contact-card">
              <div class="contact-icon">
                <i class="icon-email"></i>
              </div>
              <h3 class="contact-card-title">邮件联系</h3>
              <p class="contact-card-content">24小时内回复</p>
              <a :href="`mailto:${companyInfo.email}`" class="contact-link">{{ companyInfo.email }}</a>
              <p class="contact-tip">发送邮件时，请注明您的需求，或参考我们的
                <NuxtLink to="/cases" class="internal-link">客户案例</NuxtLink>
                以便我们更好地理解您的需求。
              </p>
            </div>
            
            <div class="contact-card">
              <div class="contact-icon">
                <i class="icon-location"></i>
              </div>
              <h3 class="contact-card-title">公司地址</h3>
              <p class="contact-card-content">欢迎来访洽谈合作</p>
              <p class="contact-address">{{ companyInfo.address }}</p>
              <p class="contact-tip">来访前建议先预约，或了解我们的
                <NuxtLink to="/about" class="internal-link">公司介绍</NuxtLink>
                及发展历程。
              </p>
            </div>
            
            <div class="contact-card">
              <div class="contact-icon">
                <i class="icon-wechat"></i>
              </div>
              <h3 class="contact-card-title">微信咨询</h3>
              <p class="contact-card-content">添加客服微信沟通</p>
              <div class="wechat-info">
                <p class="wechat-id">微信号：{{ companyInfo.wechat }}</p>
                <div class="wechat-qr" v-if="companyInfo.wechatQR">
                  <img :src="companyInfo.wechatQR" alt="微信二维码" />
                </div>
              </div>
              <p class="contact-tip">关注公众号可获取最新
                <NuxtLink to="/articles/industry" class="internal-link">行业新闻</NuxtLink>
                和优惠信息。
              </p>
            </div>
          </div>
        </section>
        
        <!-- 联系表单和地图区域 -->
        <div class="form-map-section">
          <section class="contact-form-section">
            <div class="section-header">
              <h2 class="section-title">在线咨询</h2>
              <p class="section-subtitle">填写表单，我们会尽快与您联系</p>
            </div>
            
            <form @submit.prevent="handleSubmit" class="contact-form">
              <div class="form-group">
                <label for="name" class="form-label">姓名 <span class="required">*</span></label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name" 
                  class="form-input" 
                  placeholder="请输入您的姓名" 
                  required
                />
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="phone" class="form-label">电话 <span class="required">*</span></label>
                  <input 
                    type="tel" 
                    id="phone" 
                    v-model="form.phone" 
                    class="form-input" 
                    placeholder="请输入您的联系电话" 
                    required
                  />
                </div>
                
                <div class="form-group">
                  <label for="email" class="form-label">邮箱</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="form.email" 
                    class="form-input" 
                    placeholder="请输入您的邮箱地址" 
                  />
                </div>
              </div>
              
              <div class="form-group">
                <label for="message" class="form-label">咨询内容 <span class="required">*</span></label>
                <textarea 
                  id="message" 
                  v-model="form.message" 
                  class="form-textarea" 
                  rows="5" 
                  placeholder="请详细描述您的需求，例如：需要运输的货物类型、目的地国家、重量体积等信息。您也可以提及您感兴趣的线路，如东南亚专线等。" 
                  required
                ></textarea>
                <p class="form-tip">
                  了解更多关于
                  <NuxtLink to="/articles/knowledge" class="internal-link">跨境物流知识</NuxtLink>
                  可以帮助您更准确地描述需求。
                </p>
              </div>
              
              <div class="form-actions">
                <button type="submit" class="submit-btn">提交咨询</button>
              </div>
            </form>
          </section>
          
          <section class="map-section">
            <div class="section-header">
              <h2 class="section-title">公司位置</h2>
              <p class="section-subtitle">欢迎前来参观洽谈</p>
            </div>
            
            <div class="map-container">
              <!-- 这里可以嵌入实际的地图组件，如百度地图、Google地图 -->
              <div class="map-placeholder">
                <div class="map-placeholder-content">
                  <i class="icon-map"></i>
                  <p>深圳市宝安区</p>
                  
                </div>
              </div>
            </div>
            
            <div class="location-tips">
              <h3 class="tips-title">交通指南</h3>
              <ul class="tips-list">
                <li>地铁：12号线福围站A出口，步行约10分钟</li>
                <li>公交：咸田站，北站等</li>
                <li>停车：园区内有充足停车位</li>
              </ul>
              <p class="tips-note">
                如果您需要了解具体物流操作流程，可以查看我们的
                <NuxtLink to="/services" class="internal-link">服务流程</NuxtLink>
                页面。
              </p>
            </div>
          </section>
        </div>
        
        <!-- 常见问题链接 -->
        <section class="faq-section">
          <div class="section-header">
            <h2 class="section-title">常见问题</h2>
            <p class="section-subtitle">您可能关心的其他信息</p>
          </div>
          
          <div class="faq-links">
            <NuxtLink to="/articles/company" class="faq-link">
              <i class="icon-faq"></i>
              <span>公司最新动态</span>
            </NuxtLink>
            
            <NuxtLink to="/routes/sea" class="faq-link">
              <i class="icon-faq"></i>
              <span>东南亚专线服务详情</span>
            </NuxtLink>
            
            <NuxtLink to="/tools" class="faq-link">
              <i class="icon-faq"></i>
              <span>运费计算工具</span>
            </NuxtLink>
            
            <NuxtLink to="/articles/knowledge" class="faq-link">
              <i class="icon-faq"></i>
              <span>跨境物流常见问题</span>
            </NuxtLink>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { COMPANY_INFO } from '~/composables/constants'

const companyInfo = COMPANY_INFO

const breadcrumbItems = [
  { name: '首页', path: '/' },
  { name: '联系我们', path: '/contact' }
]
/* ================= 联系页专用 JSON-LD ================= */
const contactJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'name': `联系${companyInfo.name}`,
    'description': `咨询${companyInfo.services.join('、')}报价及服务。`,
    'url': `${companyInfo.domain}/contact`
  },
  {
    '@context': 'https://schema.org',
    '@type': 'LogisticsCenter',
    'name': companyInfo.name,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': companyInfo.address,
      // 'addressLocality': '深圳',
      // 'addressRegion': '广东',
      // 'addressCountry': 'CN'
    },
    // 'geo': {
    //   '@type': 'GeoCoordinates',
    //   'latitude': '22.547', // 建议填写精确经纬度，有利于地图搜索收录
    //   'longitude': '113.945'
    // },
    'telephone': companyInfo.phone,
    'email': companyInfo.email,
    'contactPoint': [
      {
        '@type': 'ContactPoint',
        'telephone': companyInfo.phone,
        'contactType': 'customer service',
        'areaServed': 'Worldwide'
      }
    ]
  }
]


const form = ref({
  name: '',
  phone: '',
  email: '',
  message: ''
})

const handleSubmit = () => {
  // 这里可以添加表单提交逻辑
  alert('感谢您的咨询，我们会尽快与您联系！')
  form.value = {
    name: '',
    phone: '',
    email: '',
    message: ''
  }
}
</script>

<style scoped>
.contact-page {
  padding: 1rem 0;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 页面标题样式 */
.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 15px;
  font-weight: 700;
}

.page-description {
  font-size: 1.1rem;
  color: #5d7186;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

/* 内部链接样式 */
.internal-link {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.internal-link:hover {
  color: #2980b9;
  text-decoration: underline;
}

/* 区域标题样式 */
.section-header {
  margin-bottom: 30px;
}

.section-title {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 10px;
  font-weight: 600;
}

.section-subtitle {
  font-size: 1rem;
  color: #7f8c8d;
}

/* 联系卡片样式 */
.contact-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
  margin-bottom: 50px;
}

.contact-card {
  background: white;
  border-radius: 12px;
  padding: 30px 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.contact-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #a4becf, #c6cfd7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
  font-size: 1.8rem;
}

.contact-card-title {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.contact-card-content {
  font-size: 0.95rem;
  color: #7f8c8d;
  margin-bottom: 10px;
}

.contact-link {
  display: block;
  font-size: 1.1rem;
  color: #3498db;
  text-decoration: none;
  font-weight: 600;
  margin: 10px 0;
  transition: color 0.3s;
}

.contact-link:hover {
  color: #2980b9;
}

.contact-address {
  font-size: 1rem;
  color: #2c3e50;
  margin: 10px 0;
  line-height: 1.5;
}

.contact-tip {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-top: 15px;
  line-height: 1.5;
}

.wechat-info {
  margin: 15px 0;
}

.wechat-id {
  font-size: 0.95rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.wechat-qr img {
  max-width: 150px;
  height: auto;
  border-radius: 8px;
}

/* 表单和地图区域 */
.form-map-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 50px;
}

@media (max-width: 992px) {
  .form-map-section {
    grid-template-columns: 1fr;
  }
}

/* 联系表单样式 */
.contact-form-section,
.map-section {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.contact-form {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 25px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

.form-label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #2c3e50;
}

.required {
  color: #e74c3c;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-tip {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-top: 8px;
}

.form-actions {
  text-align: center;
}

.submit-btn {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
  padding: 14px 40px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn:hover {
  background: linear-gradient(135deg, #2980b9, #1c5a7a);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(41, 128, 185, 0.3);
}

/* 地图样式 */
.map-container {
  margin: 20px 0;
  border-radius: 8px;
  overflow: hidden;
  height: 300px;
}

.map-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-placeholder-content {
  text-align: center;
  color: #7f8c8d;
}

.map-placeholder-content i {
  font-size: 3rem;
  color: #3498db;
  margin-bottom: 15px;
}

.location-tips {
  margin-top: 25px;
}

.tips-title {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 15px;
}

.tips-list {
  list-style-type: none;
  padding-left: 0;
}

.tips-list li {
  padding: 8px 0;
  color: #5d7186;
  position: relative;
  padding-left: 25px;
}

.tips-list li:before {
  content: "•";
  color: #3498db;
  font-size: 1.5rem;
  position: absolute;
  left: 0;
  top: 5px;
}

.tips-note {
  margin-top: 15px;
  font-size: 0.95rem;
  color: #7f8c8d;
}

/* 常见问题样式 */
.faq-section {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.faq-links {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.faq-link {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background: #f8f9fa;
  border-radius: 8px;
  text-decoration: none;
  color: #2c3e50;
  transition: all 0.3s;
}

.faq-link:hover {
  background: #e9ecef;
  transform: translateX(5px);
  color: #3498db;
}

.faq-link i {
  margin-right: 12px;
  color: #3498db;
  font-size: 1.2rem;
}

/* 图标样式（使用伪元素模拟） */
.icon-phone:before { content: "📞"; }
.icon-email:before { content: "✉️"; }
.icon-location:before { content: "📍"; }
.icon-wechat:before { content: "💬"; }
.icon-map:before { content: "🗺️"; }
.icon-faq:before { content: "❓"; }

/* 移动端优化 */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .contact-cards {
    grid-template-columns: 1fr;
  }
  
  .contact-form-section,
  .map-section,
  .faq-section {
    padding: 20px;
  }
  
  .faq-links {
    grid-template-columns: 1fr;
  }
  
  .container {
    padding: 0 15px;
  }
}

/* 打印样式优化 */
@media print {
  .contact-page {
    background: white;
    padding: 0;
  }
  
  .contact-card,
  .contact-form-section,
  .map-section,
  .faq-section {
    box-shadow: none;
    border: 1px solid #ddd;
    break-inside: avoid;
  }
  
  .submit-btn {
    display: none;
  }
}
</style>