<script setup lang="ts">
const router = useRouter()
const user = useSupabaseUser()
const client = useSupabaseClient()

const paths = [
  {
    label: 'Usuários',
    path: '/users',
    childrens: [
      {
        label: 'Listar',
        path: '/'
      },
      {
        label: 'Criar',
        path: '/create'
      }
    ]
  },
  {
    label: 'Containers',
    path: '/instances',
    childrens: [
      {
        label: 'Listar',
        path: '/'
      },
      {
        label: 'Criar',
        path: '/create'
      }
    ]
  }
]

function logout() {
  client.auth.signOut()
}

watch(user, () => {
  if (!user.value) {
    router.push('/')
  }
})
</script>

<template>
  <div>
    <MainNavbar :paths="paths">
      <template #actions>
        <SetTheme />
        <Button variant="ghost" @click="logout">
          Sair
        </Button>
      </template>
    </MainNavbar>
    <div class="container mx-auto">
      <slot />
    </div>
  </div>
</template>
