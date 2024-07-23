import { useBaseService } from '@/services/base.service';
import type { AxiosResponse } from 'axios';
import type {
  CreateEntriesDto,
  EntriesResponseDto
} from '@/models/entry.model';
import { defineStore } from 'pinia';

export const useEntryService = defineStore('entryService', () => {
  const { instance } = useBaseService();

  const createEntries = (createEntriesDto: CreateEntriesDto) => {
    return instance.post('/entries/', createEntriesDto);
  };

  const getRaffleEntries = (
    raffleId: string
  ): Promise<AxiosResponse<EntriesResponseDto>> => {
    return instance.get(`/entries/${raffleId}`);
  };

  return {
    getRaffleEntries,
    createEntries
  };
});
