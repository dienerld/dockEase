<script setup lang="ts">
definePageMeta({ layout: 'private' })

const user = reactive({
  name: '',
  email: ''
})

async function sendMail () {
  const response = await $fetch('/api/email', {
    method: 'POST',
    body: JSON.stringify(user)
  })

  console.log(response)
}
</script>

<template>
  <div class="flex h-full flex-col gap-2">
    <h2>Cadastro de Usuário</h2>

    <form class="mx-auto flex w-1/2 flex-col gap-2 bg-secondary p-4" @submit.prevent="sendMail">
      <input
        v-model="user.name"
        type="text"
        class="input input-sm input-bordered"
        placeholder="Nome"
      >
      <input
        v-model="user.email"
        type="text"
        class="input input-sm input-bordered"
        placeholder="Email"
      >

      <button type="submit" class="btn btn-primary">
        Enviar
      </button>
    </form>
  </div>
</template>
