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

  <main class="w-full flex flex-col mt-16 px-4 py-8">
    <RouterView />
  </main>
</template>

<style scoped>
main {
  min-height: calc(100vh - 4rem);

  background: #f5f5f5;
}

::v-deep(.p-avatar),
::v-deep(.p-button-icon-only) {
  height: 2rem !important;
  width: 2rem !important;
}

::v-deep(.p-avatar-label),
::v-deep(span.p-button-icon.pi.pi-lock) {
  font-size: 0.9rem !important;
}
</style>
