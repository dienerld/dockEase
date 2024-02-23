<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
const color = useColorMode()
defineProps<{
  class?: HTMLAttributes['class']
}>()

const defineUrl = (color: string) => {
  return color === 'light'
    ? '/logo/logo-black.svg'
    : '/logo/logo-white.svg'
}

const imageUrl = ref(defineUrl(color.value))

watch(color, ({ value }) => {
  imageUrl.value = defineUrl(value)
})
</script>

<template>
  <div :class="cn('flex h-10', $props.class)">
    <NuxtImg
      :src="imageUrl"
      placeholder
      alt="Acme Inc"
    />
  </div>
</template>
