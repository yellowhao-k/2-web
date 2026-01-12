export const useArticles = () => {
  const articles = useState('articles_all', () => [])
  const articlesByCategory = useState('articles_by_category', () => ({}))
  const cases = useState('cases_all', () => [])
  const loading = useState('content_loading', () => false)

  const _safeQuery = async (queryFn, fallback = null) => {
    loading.value = true
    try {
      return await queryFn()
    } catch (error) {
      console.error('Nuxt Content Query Error:', error)
      return fallback
    } finally {
      loading.value = false
    }
  }

const fetchArticles = async (category = null) => {
    // 缓存判断
    if (!category && articles.value.length > 0) return articles.value
    if (category && articlesByCategory.value[category]) return articlesByCategory.value[category]

    return await _safeQuery(async () => {
      let query = queryContent('articles').sort({ date: -1 })
      
      // 修改点：根据路径匹配子文件夹
      if (category) {
        query = query.where({ _path: { $contains: `/articles/${category}` } })
      }
      
      const data = await query.find()
      
      if (category) articlesByCategory.value[category] = data
      else articles.value = data
      return data
    }, [])
  }


  const fetchCases = async () => {
    if (cases.value.length > 0) return cases.value
    return await _safeQuery(async () => {
      const data = await queryContent('cases').sort({ date: -1 }).find()
      cases.value = data
      return data
    }, [])
  }

  const getCaseBySlug = async (slug) => {
    const localMatch = cases.value.find(c => c.slug === slug || c._path?.endsWith(slug))
    if (localMatch) return localMatch
    return await _safeQuery(() => queryContent('cases').where({ slug: { $eq: slug } }).findOne())
  }

  // 修改重点：相关推荐逻辑
  const getRelatedItems = (currentSlug, category, type = 'articles', limit = 6) => {
    const source = type === 'cases' ? cases.value : articles.value
    if (!source || source.length === 0) return []

    // 识别逻辑：匹配路径中包含相同分类目录的文章
    const filtered = source.filter(item => {
      const isNotSelf = !item._path?.endsWith(currentSlug)
      // 通过 _path 检查，例如 item._path 是否包含 '/articles/industry/'
      const isSameCategory = category ? item._path?.includes(`/articles/${category}/`) : true
      return isNotSelf && isSameCategory
    })

    // 兜底逻辑：如果该目录下没文章，推荐最新的 6 篇（图片中展示的是 6 篇布局）
    return filtered.length > 0 
      ? filtered.slice(0, limit) 
      : source.filter(i => !i._path?.endsWith(currentSlug)).slice(0, limit)
  }
  return {
    articles, cases, loading,
    fetchArticles, fetchCases, getCaseBySlug, getRelatedItems
  }
}