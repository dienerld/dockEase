<script setup lang="ts">
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'

type Path = {
  label: string
  path: string
  childrens?: Path[]
}
type NavbarProps = {
  paths: Path[]
}

defineProps<NavbarProps>()

</script>

<template>
  <div class="border-b border-foreground/50">
    <div class="container mx-auto flex items-center bg-background py-2 text-foreground ">
      <div class="flex-1">
        <Logo />
      </div>

      <slot name="links">
        <NavigationMenu
          v-for="path in paths"
          :key="path.path"
        >
          <template v-if="path.childrens">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>{{ path.label }}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <!-- lista vertical -->
                  <ul class="flex list-none flex-col space-y-2">
                    <li
                      v-for="child in path.childrens"
                      :key="child.path"
                      :href="child.path"
                      :title="child.label"
                    >
                      <NuxtLink :to="`${path.path}${child.path}`">
                        <NavigationMenuLink :class="navigationMenuTriggerStyle()">
                          {{ child.label }}
                        </NavigationMenuLink>
                      </NuxtLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </template>
          <template v-else>
            <NavigationMenuItem class="list-none">
              <NuxtLink :to="path.path">
                <NavigationMenuLink :class="navigationMenuTriggerStyle()">
                  {{ path.label }}
                </NavigationMenuLink>
              </NuxtLink>
            </NavigationMenuItem>
          </template>
        </NavigationMenu>
      </slot>

      <slot name="actions" />
    </div>
  </div>
</template>
