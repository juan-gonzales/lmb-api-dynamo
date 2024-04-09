import { HttpInternalServerErrorResponse } from '../../utils/responseHandlers/HttpInternalServerErrorResponse';
import { Environment } from '../../utils/constants/urls';
import dotenv from 'dotenv';
dotenv.config();

export const getAWSConfiguration = () => {
  let configuration: any = {};

  switch (process.env.NODE_ENV) {
    case Environment.LOCAL:
      configuration = {
        region: process.env.REGION,
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
      };
      break;
    case Environment.DEVELOPMENT:
    case Environment.TEST:
    case Environment.PRODUCTION:
      configuration = {
        region: process.env.REGION,
      };
      break;
    default:
      throw new HttpInternalServerErrorResponse('Environment not defined');
  }

  return configuration;
};