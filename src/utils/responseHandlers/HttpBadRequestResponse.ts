import { BaseResponse } from './BaseResponse';
import PinoLogger from '../logger/logger';
export class HttpBadRequestResponse extends BaseResponse {
  constructor(error: string) {
    PinoLogger.logFatal({ action: 'HttpBadRequestResponse', message: error });
    super(400, { status: 'Error', message: 'Bad Request', error: error});
  }
}