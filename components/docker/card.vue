<script setup lang="ts">
type CardProps = {
  container: TContainer
}

defineProps<CardProps>()
</script>

<template>
  <div class="text-foreground">
    <p><span class="font-bold">Nome:</span> {{ $props.container.name }}</p>
    <p><span class="font-bold">image:</span> {{ $props.container.image }}</p>
  </div>
</template>
