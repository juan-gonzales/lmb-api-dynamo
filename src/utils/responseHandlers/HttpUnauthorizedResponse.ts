import { BaseResponse } from './BaseResponse';
export class HttpUnauthorizedResponse extends BaseResponse {
  constructor() {
    super(401, { status: 'Error', message: 'Unauthorized' });
  }
}