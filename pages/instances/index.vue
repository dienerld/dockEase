<script setup lang="ts">
import type { TContainer } from '~/composables/container.types'
definePageMeta({
  layout: 'private'
})
useSeoMeta({
  title: 'Instâncias',
  description: 'Listagem de instâncias'
})

const queries = reactive({
  all: false,
  filters: {
    status: ''
  }

})
const { data: responseContainers, pending, error } = await useFetch<TContainer[]>('/api/instances', {
  query: {
    all: true
  }
})

async function getContainers() {
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
    responseContainers.value = response
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
    <Input
      v-model="queries.filters.status"
      type="text"
    />
    <Button variant="secondary" @click="getContainers">
      Buscar
    </Button>
    <div class="border border-white" />
    <div v-if="pending" class="animate-pulse text-6xl text-primary-foreground">
      <p> Carregando</p>
    </div>
    <div
      v-else-if="!error"
      class="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2"
    >
      <DockerCard
        v-for="container in responseContainers"
        :key="container.id"
        :container="container"
      />
    </div>

    <div v-else>
      <p class="text-3xl text-destructive">
        Error: {{ error }}
      </p>
    </div>
  </div>
</template>
