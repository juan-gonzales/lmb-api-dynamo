import { LAMBDA_NAME } from '../constants/urls';
class DataToLog {
  idTransaccion: string;
  lambda: string;
  action: string;
  token: string;
  responseTime: number;
  status: string;
  code: number;
  message: any;

  constructor(data: any) {
    this.idTransaccion = data.idTransaccion ?? undefined;
    this.lambda = LAMBDA_NAME!;
    this.action = data.action ?? 'Action no defined';
    this.token = data.token ?? 'Token undefined';
    this.responseTime = data.duration ?? 0;
    this.status = data.status ?? 'OK';
    this.code = 200;
    this.message = data.message ?? 'Message not defined';
  }
}

export default DataToLog;
