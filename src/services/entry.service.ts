import BaseService from '@/services/base.service';
import type { AxiosResponse } from 'axios';
import type {
  CreateEntriesDto,
  EntriesResponseDto
} from '@/models/entry.model';

const RaffleService = () => {
  const baseService = BaseService('entries');

  const createEntries = (createEntriesDto: CreateEntriesDto) => {
    return baseService.post('/', createEntriesDto);
  };

  const getRaffleEntries = (
    raffleId: string
  ): Promise<AxiosResponse<EntriesResponseDto>> => {
    return baseService.get(`/${raffleId}`);
  };

  return {
    getRaffleEntries,
    createEntries
  };
};

export default RaffleService();
