<template>
  <header class="app-header">
    <div class="container">
      <div class="header-content">
        <button 
          class="mobile-menu-toggle" 
          @click="toggleMobileMenu"
          aria-label="Toggle Menu"
        >
          <span :class="{ 'line-1': mobileMenuOpen }"></span>
          <span :class="{ 'line-2': mobileMenuOpen }"></span>
          <span :class="{ 'line-3': mobileMenuOpen }"></span>
        </button>

        <NuxtLink to="/" class="logo" @click="closeMobileMenu">
          <h1>{{ companyInfo.name }}</h1>
        </NuxtLink>
        
        <div v-if="mobileMenuOpen" class="nav-overlay" @click="closeMobileMenu"></div>

        <nav class="nav" :class="{ 'nav-open': mobileMenuOpen }">
          <div class="mobile-nav-top">
            <span class="menu-title">导航菜单</span>
            <button class="close-drawer" @click="closeMobileMenu">×</button>
          </div>

          <div 
            v-for="item in navItems" 
            :key="item.path"
            class="nav-item-container"
          >
            <div class="nav-link-row">
              <NuxtLink 
                :to="item.path" 
                class="nav-link"
                @click="closeMobileMenu"
              >
                {{ item.name }}
              </NuxtLink>

              <div 
                v-if="item.children" 
                class="dropdown-trigger" 
                @click.stop="toggleDropdown(item.path)"
              >
                <svg 
                  class="dropdown-icon" 
                  :class="{ 'rotate': activeDropdown === item.path }" 
                  viewBox="0 0 24 24"
                >
                  <path d="M7 10l5 5 5-5z" fill="currentColor"/>
                </svg>
              </div>
            </div>
            
            <ul 
              v-if="item.children" 
              class="dropdown-menu"
              :class="{ 'show': activeDropdown === item.path }"
            >
              <li v-for="child in item.children" :key="child.path">
                <NuxtLink 
                  :to="child.path" 
                  class="dropdown-item" 
                  @click="closeMobileMenu"
                >
                  {{ child.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </nav>
        
        <!-- <div class="desktop-only">
          <NuxtLink to="/contact" class="contact-btn">联系我们</NuxtLink>
        </div> -->
      </div>
    </div>
  </header>
</template>

<script setup>
// 假设你的常量配置文件在这个路径
import { COMPANY_INFO, navItems } from '~/composables/constants'

const companyInfo = COMPANY_INFO
const mobileMenuOpen = ref(false)
const activeDropdown = ref(null)

// 切换移动端侧边栏
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// 关闭所有菜单状态
const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  activeDropdown.value = null
}

// 专门用于展开/收起下拉子项
const toggleDropdown = (path) => {
  activeDropdown.value = activeDropdown.value === path ? null : path
}
</script>

<style scoped>
/* 1. 基础重置：彻底去掉黑点和默认边距 */
ul, li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.app-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  background: #ffffff;
  border-bottom: 1px solid #f0f4f8;
  z-index: 1000;
  height: 75px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.logo h1 {
  font-size: 1.25rem;
  color: #1f2937;
  font-weight: 800;
  margin: 0;
}

.nav-link-row .nav-link{
  font-size: 1.1rem;
}
/* --- 桌面端样式 (min-width: 769px) --- */
@media (min-width: 769px) {
  .mobile-menu-toggle, .mobile-nav-top {
    display: none;
  }

  .nav {
    display: flex;
    gap: 1.2rem;
  }

  .nav-item-container {
    position: relative;
  }

  .nav-link-row {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .nav-link {
    color: #4b5563;
    font-weight: 500;
    font-size: 15px;
    text-decoration: none;
    padding: 20px 0;
    transition: color 0.2s;
  }

  /* 浅蓝色高亮 */
  .nav-link:hover, .router-link-active {
    color: #0ea5e9;
  }

  /* 桌面端 Hover 自动展开 */
  .nav-item-container:hover .dropdown-menu {
    display: block;
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background: #ffffff;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 10px 0;
    min-width: 160px;
    border: 1px solid #f1f5f9;
    display: none; /* 默认隐藏 */
    z-index: 100;
  }

  .dropdown-item {
    display: block;
    padding: 10px 20px;
    color: #4b5563;
    font-size: 14px;
    text-decoration: none;
    transition: all 0.2s;
  }

  .dropdown-item:hover {
    background-color: #f0f9ff;
    color: #0ea5e9;
  }

  .contact-btn {
    background: #0ea5e9;
    color: #fff;
    padding: 12px 20px;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
  }
}

/* --- 移动端样式 (max-width: 768px) --- */
@media (max-width: 768px) {
  .desktop-only {
    display: none;
  }
  .header-content {
    justify-content: flex-start; /* 不再两端对齐 */
    gap: 12px; /* 按钮和 Logo 之间的间距 */
  }

  /* 汉堡按钮 */
  .mobile-menu-toggle {
    display: flex;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    padding: 5px;
    cursor: pointer;
    z-index: 1002;
  }

  .mobile-menu-toggle span {
    width: 22px;
    height: 2px;
    background: #374151;
    transition: 0.3s ease;
  }

  /* 汉堡按钮动画 */
  .line-1 { transform: translateY(7px) rotate(45deg); }
  .line-2 { opacity: 0; }
  .line-3 { transform: translateY(-7px) rotate(-45deg); }

  /* 侧边栏遮罩 */
  .nav-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(2px);
    z-index: 1001;
  }

  /* 导航栏：固定在左侧 */
  .nav {
    position: fixed;
    top: 0;
    left: 0; /* 靠左 */
    width: 280px;
    height: 100vh;
    background: #ffffff;
    flex-direction: column;
    transform: translateX(-100%); /* 从左侧移出屏幕 */
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow-y: auto;
    z-index: 1002;
  }

  .nav-open {
    transform: translateX(0);
  }

  /* 侧边栏头部 */
  .mobile-nav-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: #f8fafc;
    border-bottom: 1px solid #f1f5f9;
  }

  .menu-title {
    font-weight: 700;
    color: #1f2937;
  }

  .close-drawer {
    background: none;
    border: none;
    font-size: 24px;
    color: #94a3b8;
  }

  /* 移动端菜单行 */
  .nav-link-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f8fafc;
  }

  .nav-link {
    flex: 1;
    padding: 16px 20px;
    color: #374151;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
  }

  /* 移动端高亮 */
  .router-link-active {
    color: #0ea5e9;
    background: #f0f9ff;
  }

  /* 下拉触发图标区域 */
  .dropdown-trigger {
    padding: 16px 20px;
    cursor: pointer;
    color: #94a3b8;
  }

  /* 下拉菜单本体 */
  .dropdown-menu {
    background: #f9fafb;
    display: none; /* 默认隐藏 */
    border-bottom: 1px solid #f1f5f9;
  }

  .dropdown-menu.show {
    display: block;
  }

  .dropdown-item {
    display: block;
    padding: 12px 40px; /* 二级菜单缩进 */
    color: #64748b;
    font-size: 14px;
    text-decoration: none;
  }

  .dropdown-icon {
    width: 20px;
    height: 20px;
    transition: transform 0.3s;
  }

  .rotate {
    transform: rotate(180deg);
    color: #0ea5e9;
  }
}
</style>