import BaseService from '@/services/base.service';
import type { Raffle } from '@/models/raffle.model';
import type { AxiosResponse } from 'axios';

const RaffleService = () => {
  const baseService = BaseService('raffles');

  const getPendingRaffles = (): Promise<AxiosResponse<Raffle[]>> => {
    return baseService.get('/pending');
  };

  const getFinishedRaffles = (): Promise<AxiosResponse<Raffle[]>> => {
    return baseService.get('/finished');
  };

  const getRaffle = (raffleId: string): Promise<AxiosResponse<Raffle>> => {
    return baseService.get(`/${raffleId}`);
  };

  return {
    getPendingRaffles,
    getFinishedRaffles,
    getRaffle
  };
};

export default RaffleService();
