<script setup>
/**
 * SEO 管理组件
 * 接收 Props：title, description, image, type, jsonLd
 */
import { COMPANY_INFO } from '~/composables/constants'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },

  type: {
    type: String,
    default: 'website' // website | article
  },

  image: {
    type: String,
    default: ''
  },

  jsonLd: {
    type: Object,
    default: null
  }
})

const route = useRoute()

const siteUrl = COMPANY_INFO.domain

const canonical = computed(() => {
  return siteUrl + route.path
})

/* ================= 基础 Head ================= */
useHead({
  title: props.title,
  link: [
    { rel: 'canonical', href: canonical.value }
  ]
})

/* ================= SEO Meta ================= */
useSeoMeta({
  title: props.title,
  ogTitle: props.title,

  description: props.description,
  ogDescription: props.description,

  ogType: props.type,
  ogUrl: canonical.value,

  // ⚠️ 关键：只有有图片时才输出
  ...(props.image
    ? { ogImage: props.image }
    : {}),

  twitterCard: 'summary_large_image',

  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
})

/* ================= JSON-LD ================= */
if (props.jsonLd) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(props.jsonLd)
      }
    ]
  })
}
</script>

<template>
  <slot v-if="false" />
</template>