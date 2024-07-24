<script lang="ts" setup>
import { usePaymentService } from '@/services/payment.service';
import { computed, ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';
import { ChargeStatusEnum } from '@/models/charge.model';

const paymentService = usePaymentService();
const toastService = useToast();
const { t } = useI18n();

const dialogVisible = defineModel('visible', { default: false });
const correlationId = defineModel('correlationId', { default: '' });
const chargeStatus = defineModel('chargeStatus', { default: '' });

const qrCodeImage = ref('');
const brCode = ref('');

const evaluateTagSeverity = computed(() => {
  if (chargeStatus.value == ChargeStatusEnum.COMPLETED) {
    return 'success';
  }

  return 'danger';
});

const evaluateTagLabel = computed(() => {
  if (chargeStatus.value == ChargeStatusEnum.COMPLETED) {
    return t('messages.paymentCompleted');
  }

  return t('messages.awaitingPayment');
});

const getCharge = async () => {
  const { data } = await paymentService.getCharge(correlationId.value);

  qrCodeImage.value = data.charge.qrCodeImage;
  brCode.value = data.charge.brCode;
};

const checkChargeStatus = async () => {
  const { data } = await paymentService.getCharge(correlationId.value);

  chargeStatus.value = data.charge.status;
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(brCode.value);

  toastService.add({
    severity: 'success',
    life: 3000,
    summary: 'Success',
    detail: t('messages.copiedToClipboard')
  });
};

let interval = 0;

watch(correlationId, () => {
  getCharge();
  interval = setInterval(() => checkChargeStatus(), 3000);
});

watch(chargeStatus, (chargeStatus) => {
  if (chargeStatus == ChargeStatusEnum.COMPLETED) {
    clearInterval(interval);
  }
});

watch(dialogVisible, (dialogVisible) => {
  if (!dialogVisible) {
    clearInterval(interval);
  }
});
</script>

<template>
  <Dialog v-model:visible="dialogVisible" :dismissableMask="true" modal>
    <div v-if="correlationId" class="flex flex-col items-center gap-4">
      <Tag :severity="evaluateTagSeverity">
        <i
          v-if="chargeStatus != ChargeStatusEnum.COMPLETED"
          class="pi pi-spinner animate-spin"
        ></i>
        <span> {{ evaluateTagLabel }} </span>
      </Tag>

      <img
        v-if="qrCodeImage"
        :src="qrCodeImage"
        alt="QR Code"
        class="h-40 border-2 border-green-500 rounded-lg"
      />

      <p class="text-center">{{ $t('messages.pixGuide') }}</p>

      <p class="text-center">{{ $t('messages.pixGuideLine2') }}</p>

      <Button
        :label="$t('messages.copyQrCode')"
        class="justify-self-center"
        @click="copyToClipboard"
      />
    </div>
  </Dialog>
</template>

<style scoped></style>
