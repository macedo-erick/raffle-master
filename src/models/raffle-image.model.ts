import type { Raffle } from '@/models/raffle.model';

export interface RaffleImage {
  id: string;
  alternateText: string;
  url: string;
  raffle: Raffle;
}
