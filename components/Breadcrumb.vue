<template>
  <nav class="breadcrumb" aria-label="面包屑导航">
    <ol class="breadcrumb-list">
      <!-- <li class="breadcrumb-item">
        <NuxtLink to="/">首页</NuxtLink>
      </li> -->
      <li 
        v-for="(item, index) in items" 
        :key="index"
        class="breadcrumb-item"
        :class="{ 'active': index === items.length - 1 }"
      >
        <span v-if="index === items.length - 1">{{ item.name }}</span>
        <NuxtLink v-else :to="item.path">{{ item.name }}</NuxtLink>
      </li>
    </ol>
  </nav>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.breadcrumb {
  padding: 1rem 0;
  font-size: 0.875rem;
}

.breadcrumb-list {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-item:not(:last-child)::after {
  content: '/';
  margin: 0 0.5rem;
  color: #999;
}

.breadcrumb-item a {
  color: #666;
}

.breadcrumb-item.active {
  color: #333;
  font-weight: 500;
}

.breadcrumb-item a:hover {
  color: #007bff;
}
</style>

