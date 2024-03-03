<script setup lang="ts">
import type { ContainerDetail } from '~/server/types'

definePageMeta({
  layout: 'private'
})

const route = useRoute()
const { slug } = route.params

const { data, error, pending } = await useFetch<ContainerDetail>(`/api/instances/${slug}`)

useSeoMeta({
  title: data.value?.name ? `Instância - ${data.value.name}` : 'Instância',
  description: 'Detalhes da instância'
})

</script>

<template>
  <div v-if="pending">
    Loading...
  </div>
  <div v-else-if="!error && data">
    <h1>{{ data.name }}</h1>
    <p>{{ data.image }}</p>
    <p>{{ data.status }}</p>
    <p>{{ data.created }}</p>
    <ul>
      <li v-for="port in data.ports" :key="port">
        {{ port }}
      </li>
    </ul>
    <ul>
      <li v-for="envs in data.envs" :key="envs">
        {{ envs }}
      </li>
    </ul>
  </div>
  <div v-else>
    <p>Error: {{ error?.message || 'error' }}</p>
  </div>
</template>
