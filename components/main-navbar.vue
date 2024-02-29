<script setup lang="ts">
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'

type Path = {
  label: string
  path: string
}
type NavbarProps = {
  paths?: Path[]
}

defineProps<NavbarProps>()

</script>

<template>
  <div class="border-b border-foreground/50" v-bind="$attrs">
    <div class="container mx-auto flex items-center bg-background py-2 text-foreground ">
      <div class="flex-1">
        <Logo />
      </div>

      <slot name="links">
        <NavigationMenu
          v-for="path in paths"
          :key="path.path"
        >
          <NavigationMenuItem class="list-none">
            <NuxtLink :to="path.path">
              <NavigationMenuLink :class="navigationMenuTriggerStyle()">
                {{ path.label }}
              </NavigationMenuLink>
            </NuxtLink>
          </NavigationMenuItem>
        </NavigationMenu>
      </slot>

      <slot name="actions" />
    </div>
  </div>
</template>
