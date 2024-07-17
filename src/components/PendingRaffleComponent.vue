<script lang="ts" setup>
import { onBeforeMount, type Ref, ref } from 'vue';
import type { Raffle } from '@/models/raffle.model';
import RaffleCardComponent from '@/components/RaffleCardComponent.vue';
import RaffleService from '@/shared/services/raffle.service';

const pendingRaffles: Ref<Raffle[]> = ref([]);

onBeforeMount(async () => {
  const { data } = await RaffleService.getPendingRaffles();
  pendingRaffles.value = data;
});
</script>
<template>
  <section v-if="pendingRaffles.length" class="grid gap-4">
    <h2 class="text-xl font-bold">{{ $t('messages.pendingRaffles') }}</h2>
    <ul class="cards__container">
      <li v-for="raffle in pendingRaffles" :key="raffle.id">
        <RaffleCardComponent :raffle="raffle" />
      </li>
    </ul>
  </section>
</template>

<style scoped></style>
