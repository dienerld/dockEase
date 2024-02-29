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

watchEffect(() => {
  if (!user.value) {
    router.push('/')
  }
})
</script>

<template>
  <div>
    <MainNavbar class="sticky top-0">
      <template #actions>
        <SetTheme />
        <Button variant="outline" @click="logout">
          Sair
        </Button>
      </template>
    </MainNavbar>
    <div class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <!-- sidebar -->
      <aside class="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
        <div class="relative h-full overflow-hidden py-6 pr-6 lg:py-8">
          <Sidebar :paths="paths" />
        </div>
      </aside>

      <main>
        <slot />
      </main>
    </div>
  </div>
</template>
