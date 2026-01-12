<template>
  <div class="layout-default">
    <AppHeader />
    <main class="main-content">
      <slot />
    </main>
    <AppFooter />
    <ClientOnly>
      <FloatingButtons />
    </ClientOnly>

  </div>
</template>

<script setup>
</script>

<style scoped>
.layout-default {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 4rem;
}

@media (max-width: 768px) {
  .main-content {
    padding-top: 3.5rem;
  }
}
</style>

