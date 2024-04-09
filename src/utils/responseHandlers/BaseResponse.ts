import { APIGatewayProxyResult } from 'aws-lambda';

export class BaseResponse implements APIGatewayProxyResult {
  statusCode: number;
  body: string;

  constructor(statusCode: number, body: any) {
    this.statusCode = statusCode;
    this.body = JSON.stringify(body);
  }
}
