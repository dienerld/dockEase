<script setup lang="ts">
const themes = ['nord', 'night', 'dracula']
const indexTheme = ref(0)
const router = useRouter()

watch(indexTheme, () => {
  const [html] = window.document.getElementsByTagName('html')
  html.setAttribute('data-theme', themes[indexTheme.value])
})
const changeTheme = () => {
  indexTheme.value = ++indexTheme.value % themes.length
  router.push('create-instance')
}
</script>

<template>
  <div>
    <button class="btn btn-primary" @click="changeTheme">
      Click
    </button>
  </div>
</template>
