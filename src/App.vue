<script lang="ts" setup>
import { RouterView } from 'vue-router';
import HeaderComponent from '@/components/HeaderComponent.vue';

import { PageState, useBaseService } from '@/services/base.service';
import { storeToRefs } from 'pinia';

const { pageState } = storeToRefs(useBaseService());
</script>

<template>
  <Toast />

  <HeaderComponent />

  <ProgressBar v-if="pageState == PageState.LOADING" mode="indeterminate" />

  <main class="w-full mt-24 px-4 py-8">
    <RouterView />
  </main>
</template>

<style scoped></style>
