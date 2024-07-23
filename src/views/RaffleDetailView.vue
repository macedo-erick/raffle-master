<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { computed, onMounted, type Ref, ref } from 'vue';
import type { Raffle } from '@/models/raffle.model';
import RaffleService from '@/services/raffle.service';
import { formatDistanceToNow } from 'date-fns';
import { LocaleStore } from '@/store/locale.store';
import { storeToRefs } from 'pinia';
import { AuthStore } from '@/store/auth.store';
import type { EntriesResponseDto } from '@/models/entry.model';
import EntryService from '@/services/entry.service';

const route = useRoute();
const localeStore = LocaleStore();
const authStore = AuthStore();

const { currentLocale } = storeToRefs(localeStore);
const { isUserAuthenticated } = storeToRefs(authStore);

const raffleId = ref(route.params.raffleId);

const raffle: Ref<Raffle | undefined> = ref();
const entries: Ref<EntriesResponseDto> = ref({ numbers: [], count: 0 });

const page: Ref<number> = ref(1);

const buyRaffleEntriesButtons = ref([1, 5, 10, 100, 500]);

const entriesCount = ref(1);

const parsedTotalEntriesValue = computed(() => {
  if (raffle.value) {
    const currencyFormatter = new Intl.NumberFormat(currentLocale.value.js, {
      style: 'currency',
      currency: currentLocale.value.currency
    });

    return currencyFormatter.format(
      entriesCount.value * raffle.value.entryValue
    );
  }

  return '-';
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

const truncatedRaffleEntries = computed(() => {
  return entries.value.numbers.slice(0, page.value * 50);
});

const imageUrl = ref(
  'https://imgv3.fotor.com/images/side/astronaut-in-space-looking-up-at-the-stars-generated-by-Fotor-AI.jpg'
);

const parsedRafflePrizeImage = computed(() => {
  return Array.from({ length: 10 }).map(() => ({ href: imageUrl }));
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

onMounted(async () => {
  await getRaffle();
  await getEntries();
});

const getRaffle = async () => {
  const { data } = await RaffleService.getRaffle(String(raffleId.value));
  raffle.value = data;
};

const getEntries = async () => {
  const { data } = await EntryService.getRaffleEntries(String(raffleId.value));
  entries.value = data;
};

const incrementEntriesCount = (entries: number) => {
  const MAX_ENTRIES = 500;

  if (entriesCount.value + entries >= MAX_ENTRIES) {
    entriesCount.value = MAX_ENTRIES;
  } else {
    return (entriesCount.value += entries);
  }
};

const buyEntries = async () => {
  await EntryService.createEntries({
    quantity: entriesCount.value,
    raffleId: String(raffleId.value)
  });

  await getEntries();
};
</script>

<template>
  <div v-if="raffle" class="grid gap-8">
    <h2 class="text-2xl text-center font-bold">{{ raffle.name }}</h2>

    <div class="image__container grid justify-center content-center gap-4">
      <!--      TODO change images to prime galleria -->

      <img
        v-for="(image, index) of parsedRafflePrizeImage"
        :key="index"
        :src="image.href.value"
        alt="None"
        class="rounded"
      />
    </div>

    <p class="text-center font-bold text-green-500">
      {{ parsedRafflePrizeValue }}
    </p>

    <p class="text-center">
      {{ $t('messages.raffleDate') }}: {{ parsedRaffleEventDate }}
    </p>

    <p class="text-center">{{ raffle.description }}</p>

    <div v-if="isUserAuthenticated" class="grid gap-4">
      <h2 class="text-center text-2xl font-bold">
        {{ $t('messages.raffleEntries') }} ({{ entries.count }})
      </h2>

      <div
        v-if="entries.numbers.length"
        class="entries__container grid justify-center content-center gap-1"
      >
        <Chip
          v-for="number in truncatedRaffleEntries"
          :key="number"
          :label="String(number)"
          class="d-flex"
        />

        <Button
          v-if="truncatedRaffleEntries.length != entries.numbers.length"
          label="More"
          severity="secondary"
          @click="page++"
        />
      </div>

      <div class="grid gap-4">
        <h2 class="text-center text-2xl font-bold">
          {{ $t('messages.buyRaffleEntries') }}
        </h2>

        <div class="flex flex-wrap items-center justify-center gap-4 w-auto">
          <Button
            v-for="button in buyRaffleEntriesButtons"
            :key="button"
            :label="`+${button}`"
            class="h-10 grow-0 shrink-0 basis-14"
            @click="incrementEntriesCount(button)"
          />

          <InputNumber
            v-model="entriesCount"
            :max="500"
            :min="1"
            buttonLayout="vertical"
            class="w-14"
            showButtons
          />

          <span class="text-center font-bold text-green-500 w-14">{{
            parsedTotalEntriesValue
          }}</span>
        </div>

        <Button
          class="w-20 justify-self-center"
          label="Buy"
          @click="buyEntries"
        />
      </div>
    </div>

    <p class="text-sm text-center text-gray-400">
      {{ $t('messages.createdDate') }} {{ parsedRaffleCreationDate }}
    </p>
  </div>

  <!--  TODO: Add photos of prize -->
</template>

<style scoped>
.image__container {
  grid-template-columns: repeat(auto-fit, 20rem);
}

Button {
  border-radius: 16px !important;
}

.entries__container {
  grid-template-columns: repeat(auto-fit, 5rem);
}
</style>
