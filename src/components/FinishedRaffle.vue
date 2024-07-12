<script lang="ts" setup>
import RaffleCard from '@/components/RaffleCard.vue';
import type { Raffle } from '@/models/raffle.model';
import { onMounted, type Ref, ref } from 'vue';
import RaffleService from '@/shared/services/raffle.service';

let finishedRaffles: Ref<Raffle[]> = ref([]);

onMounted(async () => {
  const { data } = await RaffleService.getFinishedRaffles();
  finishedRaffles.value = data;
});
</script>

<template>
  <section v-if="finishedRaffles.length" class="grid gap-4">
    <h2 class="text-xl font-bold">Finished Raffle</h2>
    <ul class="cards__container">
      <RaffleCard
        v-for="raffle in finishedRaffles"
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
