import { BaseResponse } from './BaseResponse';
import PinoLogger from '../logger/logger';
export class HttpNotFoundResponse extends BaseResponse {
  constructor(resource: string) {
    PinoLogger.logError({
      action: 'HttpNotFoundResponse',
      message: resource,
    });
    super(404, { status: 'Error', message: 'Not Found', resource });
  }
}
