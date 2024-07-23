import type { Raffle } from '@/models/raffle.model';
import type { User } from '@/models/user.model';

export interface Entry {
  number: number;
  raffle: Raffle;
  user: User;
}

export interface EntriesResponseDto {
  numbers: number[];
  count: number;
}

export interface CreateEntriesDto {
  raffleId: string;
  quantity: number;
}
