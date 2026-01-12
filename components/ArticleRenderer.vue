<template>
  <div class="article-renderer content-container-border">
    <ContentRenderer :value="content">
      <ContentRendererMarkdown :value="content" />
      
      <template #empty>
        <p class="empty-msg">该文章暂无具体内容。</p>
      </template>
    </ContentRenderer>
    
    <slot name="footer"></slot>
  </div>
</template>

<script setup>
defineProps({
  content: { type: Object, required: true }
})
</script>

<style scoped>
/* --- 边框核心样式 --- */
.content-container-border {
  border: 1px solid #e1e4e8; /* 浅灰色边框 */
  border-radius: 8px;       /* 圆角 */
  padding: 40px;            /* 内部留白，非常重要 */
  background-color: #fff;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

/* --- 正文排版样式 --- */
.article-renderer {
  line-height: 1.8;
  color: #444;
  font-size: 1.05rem;
}

.article-renderer :deep(h2) {
  font-size: 1.6rem;
  margin: 0 0 1.5rem; /* 第一标题顶部不留空 */
  padding-bottom: 0.6rem;
  border-bottom: 1px solid #f0f0f0;
  color: #1a1a1a;
}

/* 连续性修正：当 h2 不是第一个元素时增加间距 */
.article-renderer :deep(* + h2) {
  margin-top: 2.5rem;
}

.article-renderer :deep(p) {
  margin-bottom: 1.5rem;
  text-align: justify;
}

.article-renderer :deep(img) {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 2rem auto;
  border-radius: 4px;
}

.empty-msg {
  text-align: center;
  color: #999;
  padding: 2rem;
}

/* 移动端处理 */
@media (max-width: 768px) {
  .content-container-border {
    padding: 20px;
    border-left: none;
    border-right: none;
    border-radius: 0;
  }
}
</style>