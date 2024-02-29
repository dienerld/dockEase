<script setup lang="ts">

type Path = {
  label: string
  path: string
  childrens?: Path[]
}
type SideBarProps = {
  paths?: Path[]
}

defineProps<SideBarProps>()
</script>

<template>
  <div class="size-full rounded-[inherit]">
    <NuxtLink
      v-for="path in paths"
      :key="path.path"
      :to="path.path"
      class="block p-2"
    >
      {{ path.label }}
    </NuxtLink>
  </div>
</template>
