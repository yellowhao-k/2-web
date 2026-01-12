// export const useContents = () => {
//   const articles = useState('articles_all', () => [])
//   const articlesByCategory = useState('articles_by_category', () => ({}))
//   const cases = useState('cases_all', () => [])
//   const loading = useState('content_loading', () => false)

//   const _safeQuery = async (queryFn, fallback = null) => {
//     loading.value = true
//     try {
//       return await queryFn()
//     } catch (error) {
//       console.error('Nuxt Content Query Error:', error)
//       return fallback
//     } finally {
//       loading.value = false
//     }
//   }

// const fetchArticles = async (category = null) => {
//     // 缓存判断
//     if (!category && articles.value.length > 0) return articles.value
//     if (category && articlesByCategory.value[category]) return articlesByCategory.value[category]

//     return await _safeQuery(async () => {
//       let query = queryContent('articles').sort({ date: -1 })
      
//       // 修改点：根据路径匹配子文件夹
//       if (category) {
//         query = query.where({ _path: { $contains: `/articles/${category}` } })
//       }
      
//       const data = await query.find()
      
//       if (category) articlesByCategory.value[category] = data
//       else articles.value = data
//       return data
//     }, [])
//   }


//   const fetchCases = async () => {
//     if (cases.value.length > 0) return cases.value
//     return await _safeQuery(async () => {
//       const data = await queryContent('cases').sort({ date: -1 }).find()
//       cases.value = data
//       return data
//     }, [])
//   }

//   const getCaseBySlug = async (slug) => {
//     const localMatch = cases.value.find(c => c.slug === slug || c._path?.endsWith(slug))
//     if (localMatch) return localMatch
//     return await _safeQuery(() => queryContent('cases').where({ slug: { $eq: slug } }).findOne())
//   }

//   // 修改重点：相关推荐逻辑
//   const getRelatedItems = (currentSlug, category, type = 'articles', limit = 6) => {
//     const source = type === 'cases' ? cases.value : articles.value
//     if (!source || source.length === 0) return []

//     // 识别逻辑：匹配路径中包含相同分类目录的文章
//     const filtered = source.filter(item => {
//       const isNotSelf = !item._path?.endsWith(currentSlug)
//       // 通过 _path 检查，例如 item._path 是否包含 '/articles/industry/'
//       const isSameCategory = category ? item._path?.includes(`/articles/${category}/`) : true
//       return isNotSelf && isSameCategory
//     })

//     // 兜底逻辑：如果该目录下没文章，推荐最新的 6 篇（图片中展示的是 6 篇布局）
//     return filtered.length > 0 
//       ? filtered.slice(0, limit) 
//       : source.filter(i => !i._path?.endsWith(currentSlug)).slice(0, limit)
//   }
//   return {
//     articles, cases, loading,
//     fetchArticles, fetchCases, getCaseBySlug, getRelatedItems
//   }
// }

// composables/useContents.js

export const useContents = () => {
  const LIST_FIELDS = [
  'title',
  'slug',
  '_path',
  'image',
  'date',
  'description',
  'category'
]

const CONTEXT_FIELDS = [
  'title',
  'slug',
  '_path',
  'date'
]

const RELATED_FIELDS = [
  'title',
  'slug',
  '_path',
  'date'
]
  /* ================== 全局缓存 ================== */
  const casesList = useState('cases_list', () => [])
  const casesMap = useState('cases_map', () => ({}))

  const articlesByCategory = useState('articles_by_category', () => ({}))
  const articlesMap = useState('articles_map', () => ({}))

  // 相关文章缓存（按 slug）
  const relatedArticlesCache = useState(
    'related_articles_cache',
    () => ({})
  )

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

  // 字段裁剪（用于内存数据）
  const pickFields = (source, fields) => {
    const result = {}
    fields.forEach(key => {
      result[key] = source[key]
    })
    return result
  }

  // 时间偏置选择（偏新但不完全固定）
  const selectWithTimeBias = (items, limit) => {
    if (!items || items.length === 0) return []

    const sorted = [...items].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )

    // 前 8 篇中做随机（可调）
    const pool = sorted.slice(0, 8)

    const result = []
    while (result.length < limit && pool.length > 0) {
      const index = Math.floor(Math.random() * pool.length)
      result.push(pool.splice(index, 1)[0])
    }

    return result
  }

  /* =====================================================
   * CASES
   * ===================================================== */

  // cases 列表（初渲染）
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

  // cases 整篇文章（先看缓存）
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

  // cases 上下文（prev / next）
  const fetchCaseContext = async (path) => {
    return await safeQuery(() =>
      queryContent('cases')
        .only(CONTEXT_FIELDS)
        .sort({ date: -1 })
        .findSurround(path)
    )
  }

  // cases 相关文章（简单版：最新）
  const fetchRelatedCases = async (slug, limit = 6) => {
    await fetchCasesList()

    return casesList.value
      .filter(item => !item._path?.endsWith(slug))
      .slice(0, limit)
      .map(item => pickFields(item, RELATED_FIELDS))
  }

  /* =====================================================
   * ARTICLES
   * ===================================================== */

  // articles 列表（company / industry / knowledge）
  const fetchArticlesList = async (category) => {
    if (articlesByCategory.value[category])
      return articlesByCategory.value[category]

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

  // articles 整篇文章（先看缓存）
  const fetchArticleDetail = async (slug, category) => {
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
    })
  }

  // articles 上下文（prev / next）
  const fetchArticleContext = async (path) => {
    return await safeQuery(() =>
      queryContent('articles')
        .only(CONTEXT_FIELDS)
        .sort({ date: -1 })
        .findSurround(path)
    )
  }

  // ⭐ articles 相关文章（缓存 + 分类 + slug 排除 + 时间偏置）
  const fetchRelatedArticles = async (
    currentSlug,
    category,
    limit = 6
  ) => {
    // 1. 缓存命中
    if (relatedArticlesCache.value[currentSlug]) {
      return relatedArticlesCache.value[currentSlug]
    }

    let candidates = []

    // 2. 优先使用已加载的分类列表
    if (articlesByCategory.value[category]?.length > 0) {
      candidates = articlesByCategory.value[category].filter(
        item =>
          item.slug !== currentSlug &&
          item._path?.includes(`/articles/${category}/`)
      )
    } else {
      // 3. 兜底查询 content
      candidates = await queryContent('articles')
        .where({
          _path: { $contains: `/articles/${category}/` },
          slug: { $ne: currentSlug }
        })
        .only(RELATED_FIELDS)
        .sort({ date: -1 })
        .limit(6)
        .find()
    }

    // 4. 时间偏置选择
    const selected = selectWithTimeBias(candidates, limit)

    // 5. 写入缓存
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