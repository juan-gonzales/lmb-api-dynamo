import { IRepository, IModel } from '../interfaces';
import { TABLE_NAME_VIEW } from '../utils/constants/urls';
import { HttpNotFoundResponse, HttpInternalServerErrorResponse } from '../utils/responseHandlers';
import DynamoDBConnection from '../utils/dynamoDB/dynamoDBConnection';
import { DataToSaveModel } from '../models/DataToSaveModel';
import PinoLogger from '../utils/logger/logger';

class DynamoRepository implements IRepository {
  private dynamoDBClient: AWS.DynamoDB.DocumentClient = DynamoDBConnection.getInstance();
  async findData(dni: IModel): Promise<IModel> {
    throw new HttpNotFoundResponse(`Method not implemented. ${JSON.stringify(dni)}`);
  }
  async saveData(data: IModel): Promise<IModel> {
    performance.mark('Start saveData');
    PinoLogger.logDebug({
      action: 'Start saveData Repository',
      message: data,
    });
    const item: DataToSaveModel = new DataToSaveModel(data);
    const params = {
      TableName: TABLE_NAME_VIEW!,
      Item: item,
    };
    try {
      await this.dynamoDBClient.put(params).promise();
      performance.mark('End saveData');
      performance.measure('saveData', 'Start saveData', 'End saveData');
      PinoLogger.logDebug({
        action: 'End saveData Repository',
        message: item,
        duration: performance.getEntriesByName('saveData')[0].duration,
      });
      return data;
    } catch (error: any) {
      performance.mark('End saveData');
      performance.measure('saveData', 'Start saveData', 'End saveData');
      PinoLogger.logError({
        action: 'Error saveData Repository',
        message: error.message,
        duration: performance.getEntriesByName('saveData')[0].duration,
      });
      throw new HttpInternalServerErrorResponse(`Error saving data: ${error.message}`);
    }
  }
}

export default DynamoRepository;
