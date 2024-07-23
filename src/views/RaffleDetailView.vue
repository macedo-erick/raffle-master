<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { computed, onMounted, type Ref, ref } from 'vue';
import type { Raffle } from '@/models/raffle.model';
import { formatDistanceToNow } from 'date-fns';
import { useLocaleStore } from '@/store/useLocaleStore';
import { storeToRefs } from 'pinia';
import type { EntriesResponseDto } from '@/models/entry.model';
import { useAuthService } from '@/services/auth.service';
import { useRaffleService } from '@/services/raffle.service';
import { useEntryService } from '@/services/entry.service';

const route = useRoute();
const localeStore = useLocaleStore();

const authService = useAuthService();
const raffleService = useRaffleService();
const entryService = useEntryService();

const { currentLocale } = storeToRefs(localeStore);
const { isUserAuthenticated } = storeToRefs(authService);

const raffleId = ref(route.params.raffleId);

const raffle: Ref<Raffle | undefined> = ref();
const entries: Ref<EntriesResponseDto> = ref({ numbers: [], count: 0 });

const page: Ref<number> = ref(1);

const buyRaffleEntriesButtons = ref([1, 5, 10, 100, 500]);
const entriesCount = ref(1);
const buyButtonDisabled = ref(false);

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

const parsedRafflePrizeImage = computed(() => {
  return [
    {
      url: 'https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg',
      alt: 'Description for Image 1'
    },
    {
      url: 'https://primefaces.org/cdn/primevue/images/galleria/galleria2.jpg',
      alt: 'Description for Image 2'
    },
    {
      url: 'https://primefaces.org/cdn/primevue/images/galleria/galleria3.jpg',
      alt: 'Description for Image 3'
    },
    {
      url: 'https://primefaces.org/cdn/primevue/images/galleria/galleria4.jpg',
      alt: 'Description for Image 4'
    },
    {
      url: 'https://primefaces.org/cdn/primevue/images/galleria/galleria5.jpg',
      alt: 'Description for Image 5'
    },
    {
      url: 'https://primefaces.org/cdn/primevue/images/galleria/galleria6.jpg',
      alt: 'Description for Image 6'
    }
  ];
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
  await Promise.all([getRaffle(), getEntries()]);
});

const getRaffle = async () => {
  const { data } = await raffleService.getRaffle(String(raffleId.value));
  raffle.value = data;
};

const getEntries = async () => {
  const { data } = await entryService.getRaffleEntries(String(raffleId.value));
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
  buyButtonDisabled.value = true;

  await entryService.createEntries({
    quantity: entriesCount.value,
    raffleId: String(raffleId.value)
  });

  await getEntries();

  buyButtonDisabled.value = false;
};
</script>

<template>
  <div v-if="raffle" class="grid gap-10">
    <h2 class="font-bold text-2xl text-center">{{ raffle.name }}</h2>

    <div class="grid justify-center content-center gap-4">
      <!-- TODO: Add photos of prize -->

      <Galleria
        :autoPlay="true"
        :circular="true"
        :showItemNavigators="true"
        :showThumbnails="false"
        :transitionInterval="2000"
        :value="parsedRafflePrizeImage"
        containerStyle="max-width: 640px"
      >
        <template #item="slotProps">
          <img
            :alt="slotProps.item.alt"
            :src="slotProps.item.url"
            class="z-10"
          />
        </template>
      </Galleria>
    </div>

    <p class="font-bold text-center text-green-500">
      {{ parsedRafflePrizeValue }}
    </p>

    <p class="text-center">
      {{ $t('messages.raffleDate') }}: {{ parsedRaffleEventDate }}
    </p>

    <p class="text-center">{{ raffle.description }}</p>

    <template v-if="isUserAuthenticated">
      <div class="grid gap-6">
        <h2 class="font-bold text-center text-2xl">
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
      </div>

      <div class="grid gap-6">
        <h2 class="font-bold text-center text-2xl">
          {{ $t('messages.buyRaffleEntries') }}
        </h2>

        <div class="w-auto flex flex-wrap items-center justify-center gap-3">
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

          <span class="w-14 font-bold text-center text-green-500">{{
            parsedTotalEntriesValue
          }}</span>
        </div>

        <Button
          :disabled="buyButtonDisabled"
          class="w-20 justify-self-center"
          label="Buy"
          @click="buyEntries"
        />
      </div>
    </template>

    <p class="text-sm text-center text-gray-400">
      {{ $t('messages.createdDate') }} {{ parsedRaffleCreationDate }}
    </p>
  </div>
</template>

<style scoped>
Button {
  border-radius: 16px !important;
}

.entries__container {
  grid-template-columns: repeat(auto-fit, 6rem);
}
</style>
