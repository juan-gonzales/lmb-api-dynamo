import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { IController, IService } from '../interfaces';
import { HttpBadRequestResponse, HttpSuccessResponse } from '../utils/responseHandlers';
import PinoLogger from '../utils/logger/logger';

class PersonController implements IController {
  private service: IService;

  constructor(service: IService) {
    this.service = service;
  }

  async handleRequest(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    PinoLogger.logTrace({
      action: 'Start handleRequest Controller',
      message: { parameters: event.queryStringParameters },
    });
    const dni = event.queryStringParameters!.dni ?? undefined;
    if (!dni) {
      return new HttpBadRequestResponse('DNI is required');
    }
    try {
      const response = await this.service.fetchDataByDni(dni);
      PinoLogger.logTrace({ action: 'End handleRequest Controller', message: response });
      return new HttpSuccessResponse(response);
    } catch (error: any) {
      return error;
    }
  }
}

export default PersonController;
