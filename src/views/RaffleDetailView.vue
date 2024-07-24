<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { computed, onMounted, type Ref, ref, watch, watchEffect } from 'vue';
import type { Raffle } from '@/models/raffle.model';
import { formatDistanceToNow } from 'date-fns';
import { useLocaleStore } from '@/store/useLocaleStore';
import { storeToRefs } from 'pinia';
import { useAuthService } from '@/services/auth.service';
import { useRaffleService } from '@/services/raffle.service';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';
import { useTicketService } from '@/services/ticket.service';
import type { TicketsResponseDto } from '@/models/ticket.model';
import type { AxiosError } from 'axios';
import type { ErrorResponse } from '@/models/error.model';
import PaymentComponent from '@/components/PaymentComponent.vue';
import { usePaymentService } from '@/services/payment.service';
import { ChargeStatusEnum } from '@/models/charge.model';

const route = useRoute();
const localeStore = useLocaleStore();

const authService = useAuthService();
const raffleService = useRaffleService();
const ticketService = useTicketService();
const paymentService = usePaymentService();
const toastService = useToast();

const { t } = useI18n();
const { currentLocale } = storeToRefs(localeStore);
const { isUserAuthenticated } = storeToRefs(authService);

const raffleId = ref(route.params.raffleId);

const raffle: Ref<Raffle | undefined> = ref();
const tickets: Ref<TicketsResponseDto> = ref({ numbers: [], count: 0 });

const page: Ref<number> = ref(1);

const buyRaffleTicketsButtons = ref([1, 5, 10, 100, 500]);
const ticketsCount = ref(1);
const buyTicketsButtonDisabled = ref(false);

const dialogVisible = ref(false);
const correlationId: Ref<string> = ref('');
const chargeStatus: Ref<string> = ref('');

const parsedTotalTicketsValue = computed(() => {
  if (raffle.value) {
    const currencyFormatter = new Intl.NumberFormat(currentLocale.value.js, {
      style: 'currency',
      currency: currentLocale.value.currency
    });

    return currencyFormatter.format(
      ticketsCount.value * raffle.value.ticketPrice
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

const truncatedRaffleTickets = computed(() => {
  return tickets.value.numbers.slice(0, page.value * 50);
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

const getRaffle = async () => {
  const { data } = await raffleService.getRaffle(String(raffleId.value));
  raffle.value = data;
};

const getTickets = async () => {
  const { data } = await ticketService.getRaffleTickets(String(raffleId.value));
  tickets.value = data;
};

const incrementTicketsCount = (tickets: number) => {
  const MAX_ENTRIES = 500;

  if (ticketsCount.value + tickets > MAX_ENTRIES) {
    ticketsCount.value = MAX_ENTRIES;

    toastService.add({
      summary: 'Error',
      severity: 'error',
      detail: t('messages.maxTicketsError'),
      life: 3000
    });
  } else {
    return (ticketsCount.value += tickets);
  }
};

const createCharge = async () => {
  try {
    if (raffle.value) {
      const total = ticketsCount.value * raffle.value.ticketPrice;

      const { data } = await paymentService.createCharge(total);

      correlationId.value = data.charge.correlationID;
      chargeStatus.value = data.charge.status;

      dialogVisible.value = true;
    }
  } catch (err) {
    console.error(err);
  }
};

const buyTickets = async () => {
  try {
    buyTicketsButtonDisabled.value = true;

    await ticketService.createTickets({
      quantity: ticketsCount.value,
      raffleId: String(raffleId.value)
    });

    await getTickets();

    toastService.add({
      summary: 'Success',
      severity: 'success',
      detail: t('messages.ticketsPurchasedSuccess'),
      life: 3000
    });

    buyTicketsButtonDisabled.value = false;
    dialogVisible.value = false;
  } catch (err) {
    const errorData = (err as AxiosError).response?.data as ErrorResponse;

    toastService.add({
      summary: 'Error',
      severity: 'error',
      detail: `${errorData.status} - ${errorData.error}`,
      life: 3000
    });
  }
};

onMounted(async () => {
  await getRaffle();
});

watchEffect(() => {
  if (isUserAuthenticated.value) {
    getTickets();
  }
});

watch(chargeStatus, (chargeStatus) => {
  if (chargeStatus == ChargeStatusEnum.COMPLETED) {
    buyTickets();
  }
});
</script>

<template>
  <div v-if="raffle" class="grid gap-10">
    <h2 class="font-bold text-2xl text-center">{{ raffle.name }}</h2>

    <div class="grid justify-center content-center gap-4">
      <Galleria
        :autoPlay="true"
        :circular="true"
        :showItemNavigators="true"
        :showThumbnails="false"
        :transitionInterval="2000"
        :value="raffle.images"
        containerStyle="max-width: 640px"
      >
        <template #item="slotProps">
          <img
            :alt="slotProps.item.alternateText"
            :src="slotProps.item.url"
            class="z-10 h-[30rem]"
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
      <div v-if="tickets.count" class="grid gap-6">
        <h2 class="font-bold text-center text-2xl">
          {{ $t('messages.raffleTickets') }} ({{ tickets.count }})
        </h2>

        <div
          class="tickets__container grid justify-center content-center gap-1"
        >
          <Chip
            v-for="number in truncatedRaffleTickets"
            :key="number"
            :label="String(number)"
            class="d-flex"
          />

          <Button
            v-if="truncatedRaffleTickets.length != tickets.count"
            label="More"
            severity="secondary"
            @click="page++"
          />
        </div>
      </div>

      <div class="grid gap-6">
        <h2 class="font-bold text-center text-2xl">
          {{ $t('messages.buyRaffleTickets') }}
        </h2>

        <div class="flex flex-wrap items-center justify-center gap-2">
          <Button
            v-for="button in buyRaffleTicketsButtons"
            :key="button"
            :label="`+${button}`"
            class="h-10 grow-0 shrink-0 basis-14"
            @click="incrementTicketsCount(button)"
          />
        </div>

        <div class="flex items-center justify-center gap-2">
          <InputNumber
            v-model="ticketsCount"
            :max="500"
            :min="1"
            buttonLayout="horizontal"
            showButtons
          />

          <span class="w-14 font-bold text-center text-green-500">{{
            parsedTotalTicketsValue
          }}</span>
        </div>

        <Button
          :disabled="buyTicketsButtonDisabled"
          class="w-20 justify-self-center"
          label="Buy"
          @click="createCharge"
        />
      </div>
    </template>

    <p class="text-sm text-center text-gray-400">
      {{ $t('messages.createdDate') }} {{ parsedRaffleCreationDate }}
    </p>
  </div>

  <PaymentComponent
    v-model:chargeStatus="chargeStatus"
    v-model:correlationId="correlationId"
    v-model:visible="dialogVisible"
  />
</template>

<style scoped>
Button {
  border-radius: 16px !important;
}

.tickets__container {
  grid-template-columns: repeat(auto-fit, 6rem);
}
</style>
