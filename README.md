# Nuxt3 跨境物流网站

一个基于 Nuxt 3 的纯前端跨境物流网站，专注于 SEO 优化和用户体验。

## 技术栈

- **Nuxt 3.8.0** - Vue 3 全栈框架
- **Vue 3.4.21** - 渐进式 JavaScript 框架
- **@nuxt/content 2.9.1** - 内容管理模块
- **@nuxt/image 2.0.0** - 图片优化模块
- **@nuxtjs/robots 5.6.0** - Robots.txt 生成
- **rehype-katex** - 数学公式支持
- **remark-math** - Markdown 数学公式支持

## 功能特性

### SEO 优化
- ✅ 自动生成 sitemap.xml
- ✅ Robots.txt 配置
- ✅ 使用 useHead 进行 SEO 优化
- ✅ 面包屑导航
- ✅ 内链优化
- ✅ 图片懒加载
- ✅ 语义化 HTML

### 页面功能
- ✅ 首页 - 展示服务、最新资讯、热门线路
- ✅ 业务范围 - 详细介绍各项服务
- ✅ 客户案例 - 展示成功案例（支持分页）
- ✅ 资讯中心 - 文章列表（支持分类和分页）
  - 公司动态
  - 行业新闻
  - 知识百科
- ✅ 热门线路 - 展示各专线服务
  - 美国专线
  - 澳洲专线
  - 东南亚专线
  - 每个线路包含：FBA头程、避坑篇、双清包税篇、价格与时效篇
- ✅ 关于我们 - 公司介绍
- ✅ 联系我们 - 联系方式和在线咨询表单
- ✅ 热门工具 - 实用工具集合

### 组件功能
- ✅ 响应式导航栏（支持移动端）
- ✅ 面包屑组件
- ✅ 分页器组件
- ✅ 文章导航组件（上下页）
- ✅ 相关文章组件
- ✅ 右侧悬浮按钮（电话、邮箱、微信二维码）
- ✅ 页脚组件

### 性能优化
- ✅ 全局状态管理（文章数据缓存）
- ✅ 图片懒加载
- ✅ 响应式设计（rem 字体）
- ✅ 代码分割和懒加载

## 项目结构

```
.
├── assets/              # 静态资源
│   └── css/            # 样式文件
├── components/          # Vue 组件
│   ├── AppHeader.vue   # 导航栏
│   ├── AppFooter.vue   # 页脚
│   ├── Breadcrumb.vue  # 面包屑
│   ├── Pagination.vue  # 分页器
│   ├── FloatingButtons.vue # 悬浮按钮
│   ├── ArticleNavigation.vue # 文章导航
│   └── RelatedArticles.vue # 相关文章
├── composables/        # 组合式函数
│   ├── constants.js    # 公共常量
│   └── useArticles.js # 文章管理
├── content/            # Markdown 内容
│   ├── articles/      # 文章
│   └── cases/         # 案例
├── layouts/            # 布局
│   └── default.vue    # 默认布局
├── pages/              # 页面
│   ├── index.vue      # 首页
│   ├── services.vue   # 业务范围
│   ├── cases/         # 客户案例
│   ├── news/          # 资讯中心
│   ├── articles/      # 文章详情
│   ├── routes/        # 热门线路
│   ├── about.vue      # 关于我们
│   ├── contact.vue    # 联系我们
│   └── tools.vue      # 热门工具
├── server/             # 服务端
│   └── api/           # API 路由
│       └── sitemap.xml.js # Sitemap 生成
├── nuxt.config.js      # Nuxt 配置
└── package.json        # 项目依赖

```

## 安装和运行

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 配置说明

### 公司信息配置

编辑 `composables/constants.js` 文件，修改公司信息：

```javascript
export const COMPANY_INFO = {
  name: '跨境物流公司',
  phone: '400-123-4567',
  email: 'service@logistics.com',
  address: '中国广东省深圳市南山区科技园',
  wechat: 'logistics_service',
  wechatQR: '/images/wechat-qr.png',
  domain: 'https://yourdomain.com'
}
```

### 网站域名配置

在 `nuxt.config.js` 中配置网站域名，或设置环境变量 `SITE_URL`：

```javascript
runtimeConfig: {
  public: {
    siteUrl: process.env.SITE_URL || 'https://yourdomain.com'
  }
}
```

## 内容管理

### 添加文章

在 `content/articles/` 目录下创建 Markdown 文件，格式如下：

```markdown
---
title: "文章标题"
description: "文章描述"
date: 2025-01-15
category: "知识百科"  # 公司动态、行业新闻、知识百科
slug: "article-slug"
image: "/images/article.jpg"
tags: ["标签1", "标签2"]
---

# 文章内容
```

### 添加案例

在 `content/cases/` 目录下创建 Markdown 文件，格式如下：

```markdown
---
title: "案例标题"
description: "案例描述"
date: 2025-01-10
slug: "case-slug"
image: "/images/case.jpg"
---

# 案例内容
```

## SEO 优化建议

1. **定期更新内容** - 保持网站内容的新鲜度
2. **优化图片** - 使用合适的图片格式和尺寸
3. **内链建设** - 在文章中添加相关内链
4. **外链建设** - 获取高质量的外部链接
5. **社交媒体** - 在社交媒体上分享内容
6. **网站速度** - 优化网站加载速度
7. **移动端优化** - 确保移动端体验良好

## 注意事项

1. 确保微信二维码图片路径正确
2. 根据实际需求调整分页数量
3. 定期更新 sitemap.xml
4. 监控网站性能和 SEO 指标

## 许可证

MIT

