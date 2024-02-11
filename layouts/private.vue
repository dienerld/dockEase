<script setup lang="ts">

</script>

<template>
  <div>
    <PrivateNavbar />
    <div class="container mx-auto">
      <Suspense>
        <slot />
      </Suspense>
    </div>
  </div>
</template>
