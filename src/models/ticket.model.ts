import type { Raffle } from '@/models/raffle.model';
import type { User } from '@/models/user.model';

export interface Ticket {
  number: number;
  raffle: Raffle;
  user: User;
}

export interface TicketsResponseDto {
  numbers: number[];
  count: number;
}

export interface CreateTicketsDto {
  raffleId: string;
  quantity: number;
}
