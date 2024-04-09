import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
export interface IController {
  handleRequest(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>;
}
