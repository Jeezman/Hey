

export interface Collection {
  id: number;
  title: string;
  content: string;
  username: string;
  signature: string;
  pubkey: string;
  verified: boolean;
}

export const SocketEvents = {
  invoicePaid: 'invoice-paid',
};
