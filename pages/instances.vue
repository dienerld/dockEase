<script setup lang="ts">
import type { TContainer } from '~/composables/container.types'

const queries = reactive({
  all: false,
  filters: {
    status: ''
  }

})
const { data: containers, pending, error } = await useFetch<TContainer[]>('/api/instances', {
  query: {
    all: true
  }
})

async function getContainers () {
  pending.value = true
  try {
    const response = await $fetch<TContainer[]>('/api/instances', {
      query: {
        all: queries.all,
        filters: (
        Object.keys(queries.filters) as (keyof typeof queries.filters)[])
          .reduce((acc, key) => {
            if (!queries.filters[key]) { return acc }
            return {
              ...acc,
              [key]: [queries.filters[key]]
            }
          }, {})
      }
    })
    containers.value = response
    error.value = null
  } catch (err: any) {
    error.value = { name: err.name, message: err.message }
  } finally {
    pending.value = false
  }
}

</script>

<template>
  <div class="container mx-auto">
    <input
      v-model="queries.filters.status"
      type="text"
      class="input input-info"
    >
    <button class="btn btn-secondary" @click="getContainers">
      Buscar
    </button>
    <div class="border border-white" />
    <div v-if="pending" class="animate-pulse text-6xl text-primary-content">
      <p> Carregando</p>
    </div>
    <div v-else-if="!error">
      <DockerCard v-for="container in containers" :key="container.id" :container />
    </div>

    <div v-else>
      <p class="text-3xl text-error-content">
        Error: {{ error }}
      </p>
    </div>
  </div>
</template>
