<script setup lang="ts">
const isOpen = ref(false)

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

</script>

<template>
  <div class="mx-auto w-full border-b bg-primary 2xl:max-w-7xl">
    <div class="relative mx-auto flex w-full flex-col bg-primary p-4 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
      <div class="flex flex-row items-center justify-between lg:justify-start">
        <NuxtLink class="text-lg uppercase tracking-tight text-primary-content focus:outline-none focus:ring lg:text-2xl" href="/">
          <span class="uppercase focus:ring-0 lg:text-lg">
            windstatic
          </span>
        </NuxtLink>
        <button
          class="inline-flex items-center justify-center p-2 text-primary-content hover:text-secondary-content focus:text-secondary-content focus:outline-none md:hidden"
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
      <nav
        :class="{'flex': isOpen, 'hidden':!isOpen}"
        class="grow flex-col items-center py-2 text-center md:flex md:flex-row md:justify-end lg:py-0"
      >
        <ul class="list-none space-y-2 md:inline-flex md:items-center md:space-y-0">
          <li>
            <NuxtLink
              to="/create-instance"
              class="border-b-2 border-transparent px-2 py-4 text-sm text-primary-content hover:border-secondary-content hover:text-secondary-content md:px-2
            lg:px-6"
            >
              Criar instâncias
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/instances"
              class="border-b-2 border-transparent px-2 py-4 text-sm text-primary-content hover:border-secondary-content hover:text-secondary-content md:px-2
            lg:px-6"
            >
              Listar Instâncias
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
