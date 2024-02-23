<script setup lang="ts">
import type { AlertVariants } from '@/components/ui/alert'

type AlertProps = {
  title: string
  description: string
  variant: AlertVariants['variant']
}

defineProps<AlertProps>()

</script>
<template>
  <div
    class="fixed inset-x-0 top-0 z-50  mx-auto w-1/2 rounded-lg  bg-background text-foreground shadow-md"
  >
    <Alert :variant="$props.variant">
      <AlertTitle>
        {{ $props.title }}
      </AlertTitle>
      <AlertDescription>
        {{ $props.description }}
      </AlertDescription>
    </Alert>
  </div>
</template>

<style scoped>

</style>
