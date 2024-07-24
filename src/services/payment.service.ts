import { defineStore } from 'pinia';
import { useBaseService } from '@/services/base.service';
import type { AxiosResponse } from 'axios';
import { type ChargeResponse } from '@/models/charge.model';

export const usePaymentService = defineStore('paymentService', () => {
  const { instance } = useBaseService();

  const createCharge = (
    value: number
  ): Promise<AxiosResponse<ChargeResponse>> => {
    return instance.post('/payments', { value });
  };

  const getCharge = (
    correlationId: string
  ): Promise<AxiosResponse<ChargeResponse>> => {
    return instance.get(`/payments/${correlationId}`);
  };

  return {
    createCharge,
    getCharge
  };
});
