<template>
  <nav class="pagination" v-if="totalPages > 1" aria-label="分页导航">
    <ul class="pagination-list">
      <li class="pagination-item">
        <button 
          class="pagination-link"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
          aria-label="上一页"
        >
          上一页
        </button>
      </li>
      
      <li 
        v-for="page in visiblePages" 
        :key="page"
        class="pagination-item"
      >
        <button
          v-if="page !== '...'"
          class="pagination-link"
          :class="{ 'active': page === currentPage }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
        <span v-else class="pagination-ellipsis">...</span>
      </li>
      
      <li class="pagination-item">
        <button 
          class="pagination-link"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
          aria-label="下一页"
        >
          下一页
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  maxVisible: {
    type: Number,
    default: 7
  }
})

const emit = defineEmits(['page-change'])

const visiblePages = computed(() => {
  const pages = []
  const { currentPage, totalPages, maxVisible } = props
  
  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    const half = Math.floor(maxVisible / 2)
    let start = Math.max(1, currentPage - half)
    let end = Math.min(totalPages, start + maxVisible - 1)
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1)
    }
    
    if (start > 1) {
      pages.push(1)
      if (start > 2) pages.push('...')
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...')
      pages.push(totalPages)
    }
  }
  
  return pages
})

const goToPage = (page) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('page-change', page)
  }
}
</script>

<style scoped>
.pagination {
  margin: 2rem 0;
  display: flex;
  justify-content: center;
}

.pagination-list {
  display: flex;
  list-style: none;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.pagination-item {
  display: flex;
}

.pagination-link {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: #fff;
  color: #333;
  cursor: pointer;
  border-radius: 0.25rem;
  transition: all 0.3s;
  font-size: 0.875rem;
}

.pagination-link:hover:not(:disabled) {
  background: #f5f5f5;
  border-color: #007bff;
  color: #007bff;
}

.pagination-link.active {
  background: #007bff;
  color: #fff;
  border-color: #007bff;
}

.pagination-link:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-ellipsis {
  padding: 0.5rem;
  color: #999;
}

@media (max-width: 768px) {
  .pagination-link {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
}
</style>

