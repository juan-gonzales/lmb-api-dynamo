import AWS from '../../config/aws/aws';
import PinoLogger from '../logger/logger';

class DynamoDBConnection {
  private static instance: AWS.DynamoDB.DocumentClient;

  private constructor() {}

  public static getInstance(): AWS.DynamoDB.DocumentClient {
    
    if (!DynamoDBConnection.instance) {
      PinoLogger.logDebug({ action: 'Creating DynamoDBConnection instance' });
      DynamoDBConnection.instance = new AWS.DynamoDB.DocumentClient();
    }
    PinoLogger.logDebug({ action: 'Getting DynamoDBConnection instance' });
    return DynamoDBConnection.instance;
  }

  public static async saveItem(data: any): Promise<any> {
    return DynamoDBConnection.instance.put(data).promise();
  }
}

export default DynamoDBConnection;