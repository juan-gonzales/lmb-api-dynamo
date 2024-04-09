import { logger } from './config';
import DataToLog from './model';

type LogLevel = 'info' | 'error' | 'warn' | 'debug' | 'trace' | 'fatal';

class PinoLogger {
  private static instance: PinoLogger;
  private static idTransaccion: string;

  private constructor(idTransaccion: string) {
    PinoLogger.idTransaccion = idTransaccion;
  }
  private static log(data: any, logLevel: LogLevel): void {
    const log = new DataToLog({
      ...data,
      status: logLevel === 'info' || logLevel === 'debug' || logLevel === 'trace' ? 'OK' : 'Error',
      idTransaccion: PinoLogger.idTransaccion,
    });
    logger[logLevel](log);
  }
  public static getInstance(idTransaccion: string): PinoLogger {
    if (!PinoLogger.instance) {
      PinoLogger.instance = new PinoLogger(idTransaccion);
    }
    return PinoLogger.instance;
  }
  public static logInfo(data: any): void {
    this.log(data, 'info');
  }

  public static logError(data: any): void {
    this.log(data, 'error');
  }

  public static logWarn(data: any): void {
    this.log(data, 'warn');
  }

  public static logDebug(data: any): void {
    this.log(data, 'debug');
  }

  public static logTrace(data: any): void {
    this.log(data, 'trace');
  }

  public static logFatal(data: any): void {
    this.log(data, 'fatal');
  }
}

export default PinoLogger;
