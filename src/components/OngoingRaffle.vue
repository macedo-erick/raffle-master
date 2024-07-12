<script lang="ts" setup>
import { onBeforeMount, type Ref, ref } from 'vue';

import type { Raffle } from '@/models/raffle.model';

import RaffleCard from '@/components/RaffleCard.vue';
import RaffleService from '@/shared/services/raffle.service';

let pendingRaffles: Ref<Raffle[]> = ref([]);

onBeforeMount(async () => {
  const { data } = await RaffleService.getPendingRaffles();
  pendingRaffles.value = data;
});
</script>
<template>
  <section v-if="pendingRaffles.length" class="grid gap-4">
    <h2 class="text-xl font-bold">Ongoing Raffle</h2>
    <ul class="cards__container">
      <RaffleCard
        v-for="raffle in pendingRaffles"
        :key="raffle.id"
        :created-by="raffle.createdBy"
        :description="raffle.description"
        :raffle-date="raffle.raffleDate"
        :title="raffle.name"
      />
    </ul>
  </section>
</template>

<style scoped></style>
