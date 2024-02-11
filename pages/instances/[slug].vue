<script setup lang="ts">
definePageMeta({
  layout: 'private'
})

const route = useRoute()

</script>

<template>
  <div>
    {{ route.params }}
  </div>
</template>
