import { BaseResponse } from './BaseResponse';
export class HttpForbiddenResponse extends BaseResponse {
  constructor() {
    super(403, { status: 'Error', message: 'Forbidden' });
  }
}