<script setup lang="ts">
import { LucideMoon, LucideSun } from 'lucide-vue-next'

const colorMode = useColorMode()
const toggleColorMode = () => {
  colorMode.value = colorMode.value === 'light' ? 'dark' : 'light'
  colorMode.preference = colorMode.value
}

</script>

<template>
  <div class="flex items-center space-x-4">
    <Button
      variant="ghost"
      @click="toggleColorMode"
    >
      <LucideMoon v-if="colorMode.value === 'light'" class="size-6" />
      <LucideSun v-else class="size-6" />
    </Button>
  </div>
</template>
