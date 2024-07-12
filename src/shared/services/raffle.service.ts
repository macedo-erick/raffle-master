import BaseService from '@/shared/services/base.service';
import type { Raffle } from '@/models/raffle.model';
import type { AxiosResponse } from 'axios';

const RaffleService = () => {
  const baseService = BaseService;

  const getPendingRaffles = (): Promise<AxiosResponse<Raffle[]>> => {
    return baseService.get('/raffles/pending');
  };

  const getFinishedRaffles = (): Promise<AxiosResponse<Raffle[]>> => {
    return baseService.get('/raffles/finished');
  };

  return {
    getPendingRaffles,
    getFinishedRaffles
  };
};

export default RaffleService();
