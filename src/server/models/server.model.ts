export interface Server {
  id: string;
  processId: string;
  port: number;
  urlHost: string;
  gridName: string;
  dataSource: string;
  dataBaseName: string;
  dataBaseUser: string;
  dataBasePassword: string;
  statusId: number;
}
