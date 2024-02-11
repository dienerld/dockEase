<script setup lang="ts">

type EmailProps = {
  name: string,
  email: string
}

defineProps<EmailProps>()
</script>

<template>
  <ETailwind>
    <div class="h-full bg-red-400">
      <div class="flex flex-col">
        <EText class="text-3xl font-bold text-secondary">
          Olá voce se cadastrou no DockEase
        </EText>
        <EText class="text-xl text-primary">
          {{ name }} - {{ email }}
        </EText>
        <EButton class="btn btn-primary">
          Teste
        </EButton>
      </div>
    </div>
  </ETailwind>
</template>
