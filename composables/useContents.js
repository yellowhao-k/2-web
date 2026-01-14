// composables/useContents.js
export const useContents = () => {
  const LIST_FIELDS = ['title','slug','_path','image','date','description','category']
  const CONTEXT_FIELDS = ['title','slug','_path','date']
  const RELATED_FIELDS = ['title','slug','_path','date']

  /* ================== 全局缓存 ================== */
  const casesList = useState('cases_list', () => [])
  const casesMap = useState('cases_map', () => ({}))

  const articlesByCategory = useState('articles_by_category', () => ({}))
  const articlesMap = useState('articles_map', () => ({}))
  const relatedArticlesCache = useState('related_articles_cache', () => ({}))

  const loading = useState('content_loading', () => false)

  /* ================== 安全查询 ================== */
  const safeQuery = async (fn, fallback = null) => {
    loading.value = true
    try {
      return await fn()
    } catch (e) {
      console.error('[Nuxt Content]', e)
      return fallback
    } finally {
      loading.value = false
    }
  }

  /* ================== 工具函数 ================== */
  const pickFields = (source, fields) => {
    const result = {}
    fields.forEach(key => { result[key] = source[key] })
    return result
  }

  const selectWithTimeBias = (items, limit) => {
    if (!items || items.length === 0) return []
    const sorted = [...items].sort((a,b)=>new Date(b.date)-new Date(a.date))
    const pool = sorted.slice(0, 8)
    const result = []
    while (result.length < limit && pool.length > 0) {
      const index = Math.floor(Math.random()*pool.length)
      result.push(pool.splice(index,1)[0])
    }
    return result
  }

  /* =====================================================
   * CASES
   * ===================================================== */
  const fetchCasesList = async () => {
    if (casesList.value.length) return casesList.value
    return await safeQuery(async () => {
      const data = await queryContent('cases')
        .only(LIST_FIELDS)
        .sort({ date: -1 })
        .find()
      casesList.value = data
      return data
    }, [])
  }

  const fetchCaseDetail = async (slug) => {
    if (casesMap.value[slug]) return casesMap.value[slug]
    return await safeQuery(async () => {
      const data = await queryContent('cases')
        .where({ slug: { $eq: slug } })
        .findOne()
      if (data) casesMap.value[slug] = data
      return data
    }, null)
  }

  const fetchCaseContext = async (path) => {
    return await safeQuery(() =>
      queryContent('cases')
        .only(CONTEXT_FIELDS)
        .sort({ date: -1 })
        .findSurround(path)
    )
  }

  const fetchRelatedCases = async (slug, limit = 6) => {
    await fetchCasesList()
    return casesList.value
      .filter(item => item._path?.endsWith(slug) === false)
      .slice(0, limit)
      .map(item => pickFields(item, RELATED_FIELDS))
  }

  /* =====================================================
   * ARTICLES（通用分类逻辑）
   * ===================================================== */

  // 获取文章列表
  const fetchArticlesList = async (category) => {
    if (articlesByCategory.value[category]) return articlesByCategory.value[category]

    return await safeQuery(async () => {
      const data = await queryContent('articles')
        .where({ _path: { $contains: `/articles/${category}/` } })
        .only(LIST_FIELDS)
        .sort({ date: -1 })
        .find()
      articlesByCategory.value[category] = data
      return data
    }, [])
  }

  // 获取文章详情
  const fetchArticleDetail = async (slug, category) => {
    if (!slug) return null
    if (!category) category = 'company' // fallback 默认分类，防止 build 阶段报错
    if (articlesMap.value[slug]) return articlesMap.value[slug]

    return await safeQuery(async () => {
      const data = await queryContent('articles')
        .where({
          _path: { $contains: `/articles/${category}/` },
          slug: { $eq: slug }
        })
        .findOne()
      if (data) articlesMap.value[slug] = data
      return data
    }, null)
  }

  const fetchArticleContext = async (path) => {
    return await safeQuery(() =>
      queryContent('articles')
        .only(CONTEXT_FIELDS)
        .sort({ date: -1 })
        .findSurround(path)
    )
  }

  // 获取相关文章
  const fetchRelatedArticles = async (currentSlug, category, limit = 6) => {
    if (!category) category = 'company' // fallback
    if (relatedArticlesCache.value[currentSlug]) return relatedArticlesCache.value[currentSlug]

    let candidates = []

    // 优先使用已加载列表
    if (articlesByCategory.value[category]?.length > 0) {
      candidates = articlesByCategory.value[category].filter(
        item => item.slug !== currentSlug
      )
    } else {
      candidates = await safeQuery(async () => {
        return await queryContent('articles')
          .where({
            _path: { $contains: `/articles/${category}/` },
            slug: { $ne: currentSlug }
          })
          .only(RELATED_FIELDS)
          .sort({ date: -1 })
          .limit(6)
          .find()
      }, [])
    }

    const selected = selectWithTimeBias(candidates, limit)
    relatedArticlesCache.value[currentSlug] = selected
    return selected
  }

  /* ================== exports ================== */
  return {
    loading,

    // cases
    fetchCasesList,
    fetchCaseDetail,
    fetchCaseContext,
    fetchRelatedCases,

    // articles
    fetchArticlesList,
    fetchArticleDetail,
    fetchArticleContext,
    fetchRelatedArticles
  }
}
