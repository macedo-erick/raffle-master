export enum ChargeStatusEnum {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  EXPIRED = 'EXPIRED'
}

export interface Charge {
  value: number;
  correlationID: string;
  status: ChargeStatusEnum;
  qrCodeImage: string;
  brCode: string;
}

export interface ChargeResponse {
  charge: Charge;
}
