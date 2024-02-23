<script setup lang="ts">
const paths = [
  {
    label: 'Todos Cursos',
    path: '/'
  },
  {
    label: 'Novos Cursos',
    path: '/'
  },
  {
    label: 'Cursos Gratuito',
    path: '/'
  }
]

const user = useSupabaseUser()
const router = useRouter()
watchEffect(() => {
  if (user.value) {
    router.push('/instances')
  }
})

</script>
<template>
  <div class="h-full">
    <MainNavbar :paths="paths">
      <template #actions>
        <SetTheme />
      </template>
    </MainNavbar>
    <slot />
  </div>
</template>
