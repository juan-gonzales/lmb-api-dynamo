import { BaseResponse } from './BaseResponse';
import PinoLogger from '../logger/logger';
export class HttpInternalServerErrorResponse extends BaseResponse {
  constructor(error: string) {
    PinoLogger.logFatal({ action: 'HttpInternalServerErrorResponse', message: error });
    super(500, { status: 'Error', message: 'Internal Server Error', error: error});
  }
}