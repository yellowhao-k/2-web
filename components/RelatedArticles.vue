<template>
  <div class="related-articles" v-if="articles.length > 0">
    <div class="related-header">
      <h3 class="related-title">{{ title }}</h3>
    </div>
    
    <div class="related-grid">
      <div v-for="article in articles" :key="article.slug" class="related-item">
        <NuxtLink :to="`${baseUrl}/${article.slug}`" class="related-link">
          <span class="article-title-text">{{ article.title }}</span>
          <span class="article-date">{{ formatDate(article.date) }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  articles: { type: Array, default: () => [] },
  baseUrl: { type: String, default: '/articles' },
  title: { type: String, default: '相关文章' }
})

const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  // 按照图片中的格式 YYYY/M/D
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
}
</script>

<style scoped>
.related-articles {
  margin: 3rem 0;
  padding: 0;
  background: transparent;
}

.related-header {
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee; /* 底部基准线 */
  position: relative;
}

.related-title {
  font-size: 1.25rem;
  margin: 0;
  padding-bottom: 0.75rem;
  color: #333;
  display: inline-block;
  position: relative;
}

/* 标题下方的蓝色小装饰线 */
.related-title::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 40px;
  height: 2px;
  background-color: #5bc0de; /* 蓝色装饰线 */
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 两列布局 */
  column-gap: 4rem; /* 两列之间的间距 */
}

.related-item {
  border-bottom: 1px dashed #e5e5e5; /* 灰色虚线 */
}

.related-link {
  display: flex;
  justify-content: space-between; /* 标题左对齐，日期右对齐 */
  align-items: center;
  padding: 1rem 0;
  text-decoration: none;
  color: #333;
  transition: all 0.2s ease;
  gap: 1rem;
}

.article-title-text {
  font-size: 1rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 文字过长显示省略号 */
  flex: 1;
}

.article-date {
  font-size: 0.875rem;
  color: #bbb; /* 浅灰色日期 */
  white-space: nowrap;
}

.related-link:hover .article-title-text {
  color: #007bff; /* 悬停颜色 */
}

/* 移动端适配：改为单列 */
@media (max-width: 992px) {
  .related-grid {
    grid-template-columns: 1fr;
    column-gap: 0;
  }
}
</style>