export default defineNuxtConfig({
  /* ===========================
   * 基础 & 环境
   * =========================== */

  // 仅在开发环境开启 DevTools，避免生产性能 & 安全隐患
  devtools: {
    enabled: process.env.NODE_ENV === 'development'
  },

  // 明确启用 SSR（内容站 / SEO 必须）
  ssr: true,

  /* ===========================
   * 模块
   * =========================== */
  modules: [
    '@nuxt/content',   // 内容驱动（Markdown / SEO 核心）
    '@nuxt/image',     // 图片优化（LCP / CLS）
    '@nuxtjs/robots'   // robots.txt 管理
  ],

  /* ===========================
   * @nuxt/content（重点）
   * =========================== */
  content: {
    // 启用 document-driven（文章 / 案例 / 知识型站点非常合适）
    documentDriven: true,

    markdown: {
      // 不自动生成标题锚点，避免 SEO 中出现大量 #hash URL
      anchorLinks: false,

      // 数学公式支持（你已经用得很对）
      remarkPlugins: ['remark-math'],
      rehypePlugins: ['rehype-katex']
    },

    // 服务端缓存解析后的 Markdown
    cache: true,

    // 客户端 IndexedDB 缓存（内容站回访体验非常好）
    experimental: {
      clientDB: true
    },

    // 代码高亮主题（对技术 / 知识文章友好）
    highlight: {
      theme: 'github-dark'
    }
  },

  /* ===========================
   * 图片优化
   * =========================== */
  image: {
    // 使用内置 ipx，适合自建服务器 / Docker / VPS
    provider: 'ipx',

    // 新一代图片格式（SEO + 性能）
    format: ['avif', 'webp'],

    // 图片质量，65 是 SEO 与清晰度的平衡点
    quality: 65,

    // 图片统一放 public/ 目录
    dir: 'public'
  },

  /* ===========================
   * Robots.txt
   * =========================== */
  robots: {
    // 非生产环境自动 noindex（防止测试站被收录）
    production: true,

    rules: [
      {
        userAgent: '*',
        allow: '/',
        // 明确禁止后台 / API
        disallow: ['/admin']
      }
    ],

    // sitemap 建议写绝对路径
    sitemap: 'https://www.speedexp.top/sitemap.xml',

    // Host 声明（对部分搜索引擎仍有用）
    host: 'https://www.speedexp.top'
  },

  /* ===========================
   * Nitro（非 Vercel）
   * =========================== */
  nitro: {
    // 默认 Node Server，最通用（宝塔 / PM2 / Docker）
    preset: 'node-server',
    compatibilityDate: '2025-01-01',
    // 压缩 public 静态资源（gzip / brotli）
    compressPublicAssets: {
      gzip: true,
      brotli: true
    },

    // 自动爬所有 <NuxtLink> 进行预渲染（内容站核心）
    prerender: {
      crawlLinks: true
    }
  },

  /* ===========================
   * HTML Head
   * =========================== */
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-CN'
      },
      charset: 'utf-8',

      // 不要禁用 user zoom（SEO / 无障碍）
      viewport: 'width=device-width, initial-scale=1, maximum-scale=5',

      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  /* ===========================
   * 全局样式
   * =========================== */
  css: [
    '~/assets/css/main.css',
    // 数学公式样式，remark-math 必须
    'katex/dist/katex.min.css'
  ],

  /* ===========================
   * 自动组件注册
   * =========================== */
  components: true,

  /* ===========================
   * Runtime Config
   * =========================== */
  runtimeConfig: {
    public: {
      // 用于 sitemap / canonical / SEO 组件
      siteUrl:  'https://www.speedexp.top'
    }
  },

  build: {
    transpile: [],
    extractCSS: true
  },

  vite: {
    build: {
      rollupOptions: {
        output: {
          // 手动拆分 JS
          manualChunks(id) {
            if (id.includes('node_modules')) return 'vendor'
            if (id.endsWith('.css')) return 'styles'
          },
          // 设置文件名结构，方便缓存和 CDN
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            if (/\.css$/.test(assetInfo.name ?? '')) return 'css/[name]-[hash][extname]'
            if (/\.(png|jpe?g|svg|gif|webp|avif)$/.test(assetInfo.name ?? '')) return 'images/[name]-[hash][extname]'
            return 'assets/[name]-[hash][extname]'
          }
        }
      },
      // CSS 预处理优化
      cssCodeSplit: true
    }
  }
})