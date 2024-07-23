import type { RaffleStatus } from '@/models/raffle-status.enum';
import type { User } from '@/models/user.model';
import type { RaffleImage } from '@/models/raffle-image.model';

export interface Raffle {
  id: string;
  name: string;
  description: string;
  prizeValue: number;
  ticketPrice: number;
  raffleDate: string;
  maxTickets: number;
  status: RaffleStatus;
  winner: string;
  createdDate: string;
  updatedDate: string;
  createdBy: User;
  images: RaffleImage[];
}
