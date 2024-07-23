import { useBaseService } from '@/services/base.service';
import type { AxiosResponse } from 'axios';
import type {
  CreateTicketsDto,
  TicketsResponseDto
} from '@/models/ticket.model';
import { defineStore } from 'pinia';

export const useTicketService = defineStore('entryService', () => {
  const { instance } = useBaseService();

  const createTickets = (createTicketsDto: CreateTicketsDto) => {
    return instance.post('/tickets/', createTicketsDto);
  };

  const getRaffleTickets = (
    raffleId: string
  ): Promise<AxiosResponse<TicketsResponseDto>> => {
    return instance.get(`/tickets/${raffleId}`);
  };

  return {
    getRaffleTickets: getRaffleTickets,
    createTickets: createTickets
  };
});
