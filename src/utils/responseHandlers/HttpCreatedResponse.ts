import { BaseResponse } from './BaseResponse';
export class HttpCreatedResponse extends BaseResponse {
  constructor(data: any) {
    super(201, {status: 'Success', message: 'Created', data: data});
  }
}