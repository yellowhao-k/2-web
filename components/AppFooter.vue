<template>
  <footer class="app-footer">
    <div class="footer-main container">
      <div class="footer-col brand-col">
        <h2 class="footer-logo">{{ COMPANY_INFO.name }}</h2>
        <p class="brand-desc">
          专业的跨境物流服务商，专注海运、空运、仓配一体化解决方案。通过数字化技术简化全球交付。
        </p>
        <div class="contact-info">
          <p><span>电话：</span>{{ COMPANY_INFO.phone }}</p>
          <p><span>邮箱：</span>{{ COMPANY_INFO.email }}</p>
          <p><span>地址：</span>{{ COMPANY_INFO.address }}</p>
        </div>
      </div>

      <div class="footer-col">
        <h4 class="col-title">快捷导航</h4>
        <ul class="footer-links">
          <li v-for="item in navItems.slice(0, 5)" :key="item.path">
            <NuxtLink :to="item.path">{{ item.name }}</NuxtLink>
          </li>
        </ul>
      </div>

      <div class="footer-col">
        <h4 class="col-title">热门线路</h4>
        <ul class="footer-links">
          <li v-for="route in getRouteChildren" :key="route.path">
            <NuxtLink :to="route.path">{{ route.name }}</NuxtLink>
          </li>
        </ul>
      </div>

      <div class="footer-col">
        <h4 class="col-title">行业动态</h4>
        <ul class="footer-links">
          <li v-for="news in getNewsChildren" :key="news.path">
            <NuxtLink :to="news.path">{{ news.name }}</NuxtLink>
          </li>
        </ul>
      </div>

      <div class="footer-col qrcode-col">
        <h4 class="col-title">关注我们</h4>
        <div class="qr-wrapper">
          <NuxtImg 
            :src="COMPANY_INFO.wechatQR" 
            alt="微信咨询"
            width="100"
            height="100"
            loading="lazy"
            format="webp"
          />
          <div class="qr-text">
            <p class="qr-h">官方微信</p>
            <p>扫码咨询物流专员</p>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container bottom-content">
        <p>© {{ new Date().getFullYear() }} {{ COMPANY_INFO.name }}. All Rights Reserved.</p>
        <!-- <div class="legal-links">
          <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备XXXXXXXX号</a>
        </div> -->
      </div>
    </div>
  </footer>
</template>

<script setup>
import { COMPANY_INFO, navItems } from '~/composables/constants'

// 获取热门线路子项用于展示
const getRouteChildren = computed(() => {
  const routeItem = navItems.find(i => i.name === '热门线路')
  return routeItem ? routeItem.children : []
})

// 获取资讯中心子项
const getNewsChildren = computed(() => {
  const newsItem = navItems.find(i => i.name === '资讯中心')
  return newsItem ? newsItem.children : []
})
</script>

<style scoped>
/* 基础样式重置 */
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.app-footer {
  background-color: #1a202c; /* 深色背景 */
  color: #a0aec0;
  padding-top: 60px;
  font-family: "PingFang SC", sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 主内容布局 */
.footer-main {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 1.2fr;
  gap: 40px;
  padding-bottom: 40px;
}

.footer-logo {
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.brand-desc {
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.contact-info p {
  font-size: 14px;
  margin-bottom: 8px;
}

.contact-info span {
  color: #fff;
}

/* 列标题样式 */
.col-title {
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 25px;
  position: relative;
}

.col-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 30px;
  height: 2px;
  background-color: #0ea5e9; /* 浅蓝装饰线 */
}

/* 链接样式 */
.footer-links li {
  margin-bottom: 12px;
}

.footer-links a {
  color: #a0aec0;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
}

.footer-links a:hover {
  color: #0ea5e9;
  padding-left: 5px; /* 悬停微移效果 */
}

/* 二维码区域 */
.qr-wrapper {
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
}

.qr-wrapper p {
  font-size: 12px;
}

.qr-text p { font-size: 12px; margin: 0; }

/* 底部版权栏 */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 25px 0;
  font-size: 13px;
  text-align: center;
  width: 100%;
}

/* .bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
} */

.legal-links {
  display: flex;
  gap: 20px;
}

.legal-links a {
  color: #718096;
  text-decoration: none;
}

.legal-links a:hover {
  color: #0ea5e9;
}

/* --- 移动端兼容性 --- */
@media (max-width: 1024px) {
  .footer-main {
    grid-template-columns: 1fr 1fr; /* 中型屏幕两列 */
  }
}

@media (max-width: 768px) {
  .footer-main {
    grid-template-columns: 1fr; /* 手机端单列 */
    gap: 30px;
    text-align: center;
  }
.footer-main {
    /* 核心修改：改为两列布局 */
    display: grid;
    grid-template-columns: 1fr 1fr; 
    gap: 30px 20px; /* 增加行间距，保持列间距 */
    text-align: left; /* 靠左对齐比居中更显专业 */
  }

  /* 让第一列（品牌简介）独占一行，解决挤在一起的问题 */
  .brand-col {
    grid-column: span 3;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    padding-bottom: 20px;
  }

  /* 快捷导航、热门线路、行业动态 现在会两个两个并排 */
  .footer-col {
    margin-bottom: 0;
  }

  /* 二维码列如果也想并排，可以保持原样；如果想独占一行可以如下设置 */
  .qrcode-col {
    grid-column: span 2;
    display: flex;
    align-items: center;
    gap: 20px;
    background: rgba(255, 255, 255, 0.03);
    padding: 15px;
    text-align: left;
  }

  .qr-wrapper {
    display: flex;
    align-items: center;
    gap: 15px;
    background: none;
    padding: 0;
  }

  /* 装饰线对齐 */
  .col-title::after {
    left: 0;
    transform: none;
  }
}
</style>