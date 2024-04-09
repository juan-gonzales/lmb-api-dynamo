import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { IController, IRepository, IService } from './interfaces';
import PersonController from './controllers/PersonController';
import PersonService from './services/PersonService';
import DynamoRepository from './repositories/DynamoRepository';
import ApiRepository from './repositories/ApiRepository';
import PinoLogger from './utils/logger/logger';
import { v4 as uuidv4 } from 'uuid';

const dynamoRepository: IRepository = new DynamoRepository();
const apiRepository: IRepository = new ApiRepository();
const personService: IService = new PersonService(dynamoRepository, apiRepository);
const personController: IController = new PersonController(personService);

export const handleRequest = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  PinoLogger.getInstance(uuidv4());
  //#region [Performance-log]
  performance.mark('Start HandleRequest');
  PinoLogger.logInfo({
    action: 'Start HandleRequest',
    message: { parameters: event.queryStringParameters },
  });
  //#endregion
  const result = await personController.handleRequest(event);
  //#region [Performance-log]
  performance.mark('End HandleRequest');
  performance.measure('HandleRequest', 'Start HandleRequest', 'End HandleRequest');
  PinoLogger.logInfo({
    action: 'End HandleRequest',
    message: result,
    duration: performance.getEntriesByName('HandleRequest')[0].duration,
  });
  //#endregion
  return result;
};
