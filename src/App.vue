<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
</script>

<template>

  <HeaderComponent />

  <main class="w-full mt-24 p-4">
    <RouterView />
  </main>

</template>

<style scoped>
main {
  height: calc(100vh - 6rem);
}
</style>
