import AWS from 'aws-sdk';
import PinoLogger from '../../utils/logger/logger';
import { getAWSConfiguration } from './awsConfig';
import dotenv from 'dotenv';
dotenv.config();

try {
  AWS.config.update(getAWSConfiguration());
  PinoLogger.logInfo({ action: 'Configure AWS', message: { region: AWS.config.region } });
} catch (error: any) {
  PinoLogger.logError({ action: 'Configure AWS', message: { error } });
}

export default AWS;
