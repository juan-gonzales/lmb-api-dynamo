import { APIGatewayProxyEvent } from 'aws-lambda';
import PersonController from '../../src/controllers/PersonController';
import { IModel, IService } from '../../src/interfaces';
import {
  HttpBadRequestResponse,
  HttpSuccessResponse,
  HttpInternalServerErrorResponse,
} from '../../src/utils/responseHandlers';
describe('PersonController', () => {
  let mockService: jest.Mocked<IService>;
  let personController: PersonController;

  beforeEach(() => {
    mockService = {
      fetchDataByDni: jest.fn(),
    } as jest.Mocked<IService>;
    personController = new PersonController(mockService);
  });

  const createEvent = (dni: string): APIGatewayProxyEvent => ({
    queryStringParameters: dni === '' ? {} : { dni },
    multiValueQueryStringParameters: {},
    body: '',
    headers: {},
    multiValueHeaders: {},
    httpMethod: '',
    path: '',
    isBase64Encoded: false,
    pathParameters: {},
    requestContext: {} as any,
    resource: '',
    stageVariables: {},
  });

  it('should return a BadRequest response if "dni" is not provided', async () => {
    const event = createEvent('');
    const response = await personController.handleRequest(event);
    expect(response).toBeInstanceOf(HttpBadRequestResponse);
  });

  it('should call fetchDataByDni with the correct "dni" parameter', async () => {
    const event = createEvent('12345678');
    await personController.handleRequest(event);
    expect(mockService.fetchDataByDni).toHaveBeenCalledWith('12345678');
  });

  it('should return a HttpSuccessResponse with the correct data when service responds successfully', async () => {
    const event = createEvent('12345678');
    const mockResponse: IModel = { firstName: 'John Doe', lastName: 'Doe', dni: '12345678' };
    mockService.fetchDataByDni.mockResolvedValue(mockResponse);
    const response = await personController.handleRequest(event);
    expect(response).toEqual(new HttpSuccessResponse(mockResponse));
  });

  it('should return an InternalServerErrorResponse when an error occurs during service call', async () => {
    const event = createEvent('12345678');
    const mockError = new HttpInternalServerErrorResponse('Internal Server Error');
    mockService.fetchDataByDni.mockRejectedValue(mockError);
    const response = await personController.handleRequest(event);
    expect(response).toBeInstanceOf(HttpInternalServerErrorResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
