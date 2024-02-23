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
  image: '',
  envs: {}
})

async function handleSubmit() {
  const response = await $fetch('api/create-instance', {
    method: 'POST',
    body: JSON.stringify(service)
  })
  console.log({ data: response })
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
        /></label>
      <Button>
        Enviar
      </Button>
    </form>
  </div>
</template>
