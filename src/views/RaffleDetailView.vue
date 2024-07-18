<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { computed, onMounted, type Ref, ref } from 'vue';
import type { Raffle } from '@/models/raffle.model';
import RaffleService from '@/services/raffle.service';
import { formatDistanceToNow } from 'date-fns';
import { LocaleStore } from '@/store/locale.store';
import { storeToRefs } from 'pinia';

const route = useRoute();
const localeStore = LocaleStore();

const { currentLocale } = storeToRefs(localeStore);
const raffleId = ref(route.params.raffleId);
const raffle: Ref<Raffle | undefined> = ref();

onMounted(async () => {
  const { data } = await RaffleService.getRaffle(String(raffleId.value));
  raffle.value = data;
});

const parsedRaffleCreationDate = computed(() => {
  if (raffle.value) {
    const raffleDate = new Date(raffle.value.createdDate);

    return formatDistanceToNow(raffleDate, {
      addSuffix: true,
      locale: currentLocale.value.fns
    });
  }

  return '';
});

const parsedRaffleEventDate = computed(() => {
  if (raffle.value) {
    const raffleDate = new Date(raffle.value.raffleDate);

    return raffleDate.toLocaleDateString(currentLocale.value.js, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  }

  return '';
});

const parsedRafflePrizeValue = computed(() => {
  const currencyFormatter = new Intl.NumberFormat(currentLocale.value.js, {
    style: 'currency',
    currency: currentLocale.value.currency
  });

  if (raffle.value) {
    return currencyFormatter.format(raffle.value.prizeValue);
  }

  return '';
});
</script>

<template>
  <div v-if="raffle" class="grid gap-4">
    <h2 class="text-xl font-bold">{{ raffle.name }}</h2>

    <p>{{ parsedRafflePrizeValue }}</p>

    <p>{{ parsedRaffleEventDate }}</p>

    <p>{{ raffle.description }}</p>

    <p class="text-sm text-gray-400">
      {{ $t('messages.createdDate') }} {{ parsedRaffleCreationDate }}
    </p>
  </div>

  <!--  TODO: Add photos of prize -->
  <!--  TODO: Add user entries to given raffle -->
  <!--  TODO: Add option to buy entries for this raffle -->
</template>

<style scoped></style>
