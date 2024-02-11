<script setup lang="ts">
definePageMeta({
  layout: 'private'
})
useSeoMeta({
  title: 'Criação de intâncias'
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

async function handleSubmit () {
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
      <label class="form-control w-full">
        <span>
          Nome do serviço
        </span>
        <input
          v-model="service.name"
          class="input input-bordered w-full "
          type="text"
          placeholder="Nome do Serviço"
        >
      </label>
      <label class="form-control w-full ">
        <span>
          Nome da Imagem
        </span>
        <input
          v-model="service.image"
          class="input input-bordered w-full"
          type="text"
          placeholder="Nome da Imagem"
        >
      </label>
      <button class="btn btn-primary">
        Enviar
      </button>
    </form>
  </div>
</template>
