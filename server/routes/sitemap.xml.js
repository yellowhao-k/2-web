import { serverQueryContent } from '#content/server'
import { COMPANY_INFO, services, routes } from '~/composables/constants'

export default defineEventHandler(async (event) => {
  const siteUrl = COMPANY_INFO.domain
  
  // 格式化日期函数：将日期转为 2025-01-10 格式
  const formatDate = (dateInput) => {
    const d = new Date(dateInput)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // 静态页面的日期（固定的 2025-01-10）
  const staticDate = '2025-01-10'

  // 1. 获取动态内容：文章和案例
  const articles = await serverQueryContent(event, 'articles').find()
  const cases = await serverQueryContent(event, 'cases').find()

  // 2. 初始化 XML 结构
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  // 辅助函数：生成 <url> 标签
  const addUrl = (url, priority = '0.5', lastmod = staticDate) => {
    sitemap += `
  <url>
    <loc>${siteUrl}${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`
  }

  // --- A. 添加核心导航页面 (使用静态日期) ---
  addUrl('/', '1.0')
  addUrl('/services', '0.9')
  addUrl('/cases', '0.8')
  addUrl('/articles', '0.8')
  addUrl('/routes', '0.9')
  addUrl('/about', '0.5')
  addUrl('/contact', '0.5')
  addUrl('/tools', '0.5')

  // --- B. 添加业务服务详情页 (使用静态日期) ---
  services.forEach(s => {
    if (s.path) addUrl(s.path, '0.8')
  })

  // --- C. 添加热门线路及其子页面 (使用静态日期) ---
  routes.forEach(route => {
    if (route.path) {
      addUrl(route.path, '0.9')
      const subPages = ['clearance', 'fba', 'pricing', 'tips']
      subPages.forEach(sub => {
        addUrl(`${route.path}/${sub}`, '0.7')
      })
    }
  })

  // --- D. 添加资讯分类页 ---
  const categories = ['company', 'industry', 'knowledge']
  categories.forEach(cat => {
    addUrl(`/articles/${cat}`, '0.7')
  })

  // --- E. 添加动态文章详情页 (使用文章的 updatedAt) ---
  articles.forEach(article => {
    if (article._path) {
      // 优先使用 updatedAt，如果没有则使用 date 字段，最后兜底用静态日期
      const updateTime = article.updatedAt || article.date || staticDate
      addUrl(article._path, '0.6', formatDate(updateTime))
    }
  })

  // --- F. 添加客户案例详情页 ---
  cases.forEach(item => {
    if (item._path) {
      const updateTime = item.updatedAt || item.date || staticDate
      addUrl(item._path, '0.6', formatDate(updateTime))
    }
  })

  sitemap += `\n</urlset>`

  setHeader(event, 'Content-Type', 'application/xml')
  return sitemap
})