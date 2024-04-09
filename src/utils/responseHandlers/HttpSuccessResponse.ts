import { BaseResponse } from './BaseResponse';
import PinoLogger from '../logger/logger';
export class HttpSuccessResponse extends BaseResponse {
  constructor(data: any) {
    PinoLogger.logInfo({ action: 'HttpSuccessResponse', message: data});
    super(200, { status: 'Success', message: 'Success', data: data });
  }
}