<template>
  <div class="floating-wrapper">
    <div class="floating-buttons">
      <div class="btn-item">
        <div class="hover-label phone-label">{{ companyInfo.phone }}</div>
        <a 
          :href="`tel:${companyInfo.phone}`" 
          class="floating-btn phone-btn"
          aria-label="联系电话"
        >
          <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/></svg>
        </a>
      </div>
      
      <div class="btn-item">
        <div class="hover-label email-label">{{ companyInfo.email }}</div>
        <a
          :href="`mailtop:${companyInfo.email}`" 
          class="floating-btn email-btn"
          aria-label="联系邮箱"
        >
          <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/></svg>
        </a>
      </div>

      <div class="btn-item">
        <div class="hover-label wechat-btn">
          <div class="wechat-qr-popup">
            <NuxtImg 
              :src="companyInfo.wechatQR" 
              :alt="`${companyInfo.name}微信二维码`"
              width="140"
              height="140"
            />
            <p>扫码添加微信</p>
          </div>
        </div>
        <div class="floating-btn wechat-btn">
          <svg viewBox="0 0 24 24"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.597-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.996-.136-4.156.443-5.84 1.838-1.684 1.394-2.698 3.392-2.698 5.53 0 .414.336.75.75.75a.75.75 0 0 0 .75-.75c0-1.71.85-3.304 2.28-4.258 1.42-.954 3.228-1.28 4.848-.967.414.08.812-.189.892-.604.08-.414-.189-.812-.604-.892-.253-.049-.515-.072-.778-.148zm.592 1.225a.75.75 0 0 0-.75.75c0 .414.336.75.75.75.414 0 .75-.336.75-.75a.75.75 0 0 0-.75-.75zm-4.28 0a.75.75 0 0 0-.75.75c0 .414.336.75.75.75.414 0 .75-.336.75-.75a.75.75 0 0 0-.75-.75z" fill="currentColor"/></svg>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { COMPANY_INFO } from '~/composables/constants'
const companyInfo = COMPANY_INFO

</script>

<style scoped>
.floating-wrapper {
  position: fixed;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2000;
}

.floating-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn-item {
  position: relative;
  display: flex;
  align-items: center;
}

/* 统一按钮为白色背景 */
.floating-btn {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #f0f4f8;
}

/* 颜色分配 */
.phone-btn { color: #1a1a1a; } /* 电话图标黑色 */
.email-btn { color: #0ea5e9; } /* 邮箱图标主题蓝 */
.wechat-btn { color: #07c160; } /* 微信图标绿色 */

.floating-btn svg {
  width: 1.6rem;
  height: 1.6rem;
}

/* 鼠标悬停显示文字（PC端） */
.hover-label {
  position: absolute;
  right: 125%;
  background: #fff;
  color: #000;
  padding: 0.6rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  pointer-events: none;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.hover-label::after {
  content: '';
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  border: 6px solid transparent;
  border-left-color: #fff;
}

.btn-item:hover .hover-label {
  opacity: 1;
  visibility: visible;
}

.floating-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

/* ===== PC 端：微信二维码 hover 显示 ===== */
.wechat-qr-popup {
  width: 160px;
  text-align: center;
}



.wechat-qr-popup p {
  margin-top: 8px;
  font-size: 13px;
  color: #666;
}

/* --- 移动端适配：位置与PC保持一致 --- */
@media (max-width: 768px) {
  .floating-wrapper {
    right: 1rem; /* 稍微靠边缘一点 */
    top: 50%;
    transform: translateY(-50%);
  }

  .floating-buttons {
    gap: 0.8rem; /* 间距稍微缩小 */
  }

  .floating-btn {
    width: 3.2rem;
    height: 3.2rem;
  }

  .wechat-qr-popup {
    right: 3.8rem;
    width: 140px;
  }
}
</style>