<script lang="ts" setup>
import type { Raffle } from '@/models/raffle.model';
import { onMounted, type Ref, ref } from 'vue';
import RaffleCardComponent from '@/components/RaffleCardComponent.vue';
import { useRaffleService } from '@/services/raffle.service';

const finishedRaffles: Ref<Raffle[]> = ref([]);

const { getFinishedRaffles } = useRaffleService();

onMounted(async () => {
  const { data } = await getFinishedRaffles();
  finishedRaffles.value = data;
});
</script>

<template>
  <section v-if="finishedRaffles.length" class="grid gap-4">
    <h2 class="text-xl font-bold">{{ $t('messages.finishedRaffles') }}</h2>
    <ul class="cards__container">
      <li v-for="raffle in finishedRaffles" :key="raffle.id">
        <RaffleCardComponent :raffle="raffle" />
      </li>
    </ul>
  </section>
</template>

<style scoped></style>
