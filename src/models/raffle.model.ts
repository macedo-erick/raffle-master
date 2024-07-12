import type { RaffleStatus } from '@/models/raffle-status.enum';

export interface Raffle {
  id: string;
  name: string;
  description: string;
  raffleDate: Date;
  maxEntries: number;
  status: RaffleStatus;
  winner: string;
  createdDate: Date;
  updatedDate: Date;
  createdBy: string;
}