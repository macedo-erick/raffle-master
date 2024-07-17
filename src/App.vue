<script lang="ts" setup>
import { RouterView } from 'vue-router';
import HeaderComponent from '@/components/HeaderComponent.vue';
</script>

<template>
  <Toast />

  <HeaderComponent />

  <main class="w-full mt-24 px-4 py-8">
    <RouterView />
  </main>
</template>

<style scoped></style>
