<script setup lang="ts">
definePageMeta({
  layout: 'private'
})
useSeoMeta({
  title: 'Criação de instâncias'
})

type FormService = {
  name: string
  image: string
  envs: Record<string, string>
}
const service = reactive<FormService>({
  name: '',
  image: 'postgres:13-alpine',
  envs: {
    POSTGRES_PASSWORD: 'example',
    POSTGRES_USER: 'example',
    POSTGRES_DB: 'example'
  }
})

async function handleSubmit() {
  const envs = Object.entries(service.envs).map(([key, value]) => `${key.toUpperCase()}=${value}`)
  const response = await $fetch('api/instances', {
    method: 'POST',
    body: JSON.stringify({
      name: service.name,
      Image: service.image,
      Env: envs

    })
  })

  console.log(response)
}

</script>

<template>
  <div class="flex h-full flex-col items-center justify-center">
    <form class="flex w-1/2 flex-col gap-4" @submit.prevent="handleSubmit">
      <label>
        <span>
          Nome do serviço
        </span>
        <Input
          v-model="service.name"
          type="text"
          placeholder="Nome do Serviço"
        /></label>
      <label>
        <span>
          Nome da Imagem
        </span>
        <Input
          v-model="service.image"
          type="text"
          placeholder="Nome da Imagem"
          disabled
        /></label>
      <Button type="submit">
        Enviar
      </Button>
    </form>
  </div>
</template>
