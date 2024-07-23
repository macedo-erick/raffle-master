import { useBaseService } from '@/services/base.service';
import type { Raffle } from '@/models/raffle.model';
import { type AxiosResponse } from 'axios';
import { defineStore } from 'pinia';

export const useRaffleService = defineStore('raffleService', () => {
  const { instance } = useBaseService();

  const getPendingRaffles = (): Promise<AxiosResponse<Raffle[]>> => {
    return instance.get('/raffles/pending');
  };

  const getFinishedRaffles = (): Promise<AxiosResponse<Raffle[]>> => {
    return instance.get('/raffles/finished');
  };

  const getRaffle = (raffleId: string): Promise<AxiosResponse<Raffle>> => {
    return instance.get(`/raffles/${raffleId}`);
  };

  return {
    getPendingRaffles,
    getFinishedRaffles,
    getRaffle
  };
});
