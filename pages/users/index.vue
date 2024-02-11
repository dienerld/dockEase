<script setup lang="ts">
definePageMeta({ layout: 'private' })
const { pending, data, error } = useFetch('/api/users')
</script>

<template>
  <div>
    <p v-if="pending">
      Carregando
    </p>
    <p v-else-if="error">
      {{ error }}
    </p>
    <div v-else>
      {{ data }}
    </div>
  </div>
</template>
