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

const evaluateBuyTicketLabel = computed(() => {
  if (!isUserAuthenticated.value) {
    return t('messages.buyButtonLabelNotAuthenticated');
  }

  return t('messages.buyButtonLabel');
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
  const MAX_ENTRIES = 5000;

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

    toastService.add({
      summary: 'Success',
      severity: 'success',
      detail: t('messages.ticketsPurchasedSuccess'),
      life: 10000
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
  <div v-if="raffle" class="flex justify-center grow">
    <Card class="h-max">
      <template #content>
        <div class="flex justify-center items-center gap-16">
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
                class="z-10 h-[20rem] sm:h-[30rem]"
              />
            </template>
          </Galleria>

          <div class="flex flex-col gap-4">
            <h2 class="font-bold text-2xl">{{ raffle.name }}</h2>

            <h3>{{ raffle.description }}</h3>

            <p class="font-bold text-green-500">
              {{ parsedRafflePrizeValue }}
            </p>

            <p>
              {{ parsedRaffleEventDate }}
            </p>

            <!-- TODO: Implement Raffle Percentage           -->

            <div class="grid gap-4">
              <h2 class="font-bold text-2xl">
                {{ $t('messages.buyRaffleTickets') }}
              </h2>

              <div class="buttons__container gap-2">
                <Button
                  v-for="button in buyRaffleTicketsButtons"
                  :key="button"
                  :label="`+${button}`"
                  class="h-10 grow-0 shrink-0 basis-14 rounded-2xl"
                  @click="incrementTicketsCount(button)"
                />
              </div>

              <InputNumber
                v-model="ticketsCount"
                :max="5000"
                :min="1"
                buttonLayout="horizontal"
                showButtons
              />

              <span class="font-bold text-green-500 select-none text-center">{{
                parsedTotalTicketsValue
              }}</span>

              <Button
                :disabled="!isUserAuthenticated || buyTicketsButtonDisabled"
                :label="evaluateBuyTicketLabel"
                class="justify-self-center rounded-2xl"
                @click="createCharge"
              />
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>

  <div>
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
.tickets__container {
  grid-template-columns: repeat(auto-fit, 6rem);
}

::v-deep(.p-chip-label) {
  width: 100%;

  text-align: center;

  user-select: none;
}

::v-deep(.p-inputnumber-input) {
  width: 3.5rem;
  text-align: center;
}

::v-deep(.p-galleria-prev-button),
::v-deep(.p-galleria-next-button) {
  z-index: 20;
}

.buttons__container {
  display: grid;
  grid-template-columns: repeat(5, minmax(5rem, 1fr));
}
</style>
