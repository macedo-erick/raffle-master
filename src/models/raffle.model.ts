import type { RaffleStatus } from '@/models/raffle-status.enum';
import type { User } from '@/models/user.model';

export interface Raffle {
  id: string;
  name: string;
  description: string;
  prizeValue: number;
  entryValue: number;
  raffleDate: string;
  maxEntries: number;
  status: RaffleStatus;
  winner: string;
  createdDate: string;
  updatedDate: string;
  createdBy: User;
}
