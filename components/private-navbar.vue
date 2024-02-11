<script setup lang="ts">
const isOpen = ref(false)

const routes = [
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
const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

</script>

<template>
  <div class="mx-auto w-full border-b bg-base-300 2xl:max-w-7xl">
    <div class="relative mx-auto flex w-full flex-col p-4 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
      <div class="flex flex-row items-center justify-between lg:justify-start">
        <NuxtLink class="text-lg uppercase tracking-tight text-base-content focus:outline-none focus:ring lg:text-2xl" href="/">
          <span class="uppercase focus:ring-0 lg:text-lg">
            windstatic
          </span>
        </NuxtLink>
        <button
          class="inline-flex items-center justify-center p-2 text-base-content hover:text-secondary-content focus:text-secondary-content focus:outline-none md:hidden"
          @click="toggleOpen"
        >
          <svg class="size-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path
              :class="{'hidden': isOpen, 'inline-flex': !isOpen }"
              class="inline-flex"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              :class="{'hidden': !isOpen, 'inline-flex': isOpen }"
              class="text-primary-content"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li v-for="route in routes" :key="route.path">
            <details>
              <summary>
                {{ route.label }}
              </summary>
              <ul class="rounded-t-none bg-base-300 p-2">
                <li v-for="children in route.childrens" :key="children.path">
                  <NuxtLink :to="route.path+children.path">
                    {{ children.label }}
                  </NuxtLink>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
