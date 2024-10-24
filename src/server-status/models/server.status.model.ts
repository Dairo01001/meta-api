export interface ServerStatus {
  id: number;
  name: string;
  status: boolean;
}

export type CreateServerStatus = Omit<ServerStatus, 'id'>;
