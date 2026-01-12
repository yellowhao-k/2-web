<template>
  <div class="article-navigation">
    <div class="nav-grid">
      <div class="nav-item prev">
        <template v-if="prevArticle">
          <span class="nav-label">上一篇</span>
          <NuxtLink :to="`${baseUrl}/${prevArticle.slug}`" class="nav-link">
            {{ prevArticle.title }}
          </NuxtLink>
        </template>
      </div>
      
      <div class="nav-item next">
        <template v-if="nextArticle">
          <span class="nav-label">下一篇</span>
          <NuxtLink :to="`${baseUrl}/${nextArticle.slug}`" class="nav-link">
            {{ nextArticle.title }}
          </NuxtLink>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  prevArticle: { type: Object, default: null },
  nextArticle: { type: Object, default: null },
  baseUrl: { type: String, default: '/articles' }
})
</script>

<style scoped>
.article-navigation {
  margin: 3rem 0;
  padding-top: 2rem;
}

.nav-grid {
  display: grid;
  /* 关键：使用与 RelatedArticles 相同的两列布局和间距 */
  grid-template-columns: repeat(2, 1fr);
  column-gap: 4rem; 
}

.nav-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* 保持下一篇文字右对齐，与相关文章日期对齐感一致 */
.nav-item.next {
  text-align: right;
}

.nav-label {
  font-size: 0.875rem;
  color: #bbb; /* 使用与相关文章日期接近的浅灰色 */
  text-transform: uppercase;
}

.nav-link {
  color: #333;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5;
  text-decoration: none;
  transition: color 0.2s ease;
  
  /* 防止标题过长撑开宽度，保持与相关文章一致的省略号效果 */
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-link:hover {
  color: #007bff;
}

/* 移动端适配：与 RelatedArticles 同步 */
@media (max-width: 992px) {
  .nav-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .nav-item.next {
    text-align: left;
  }
}
</style>