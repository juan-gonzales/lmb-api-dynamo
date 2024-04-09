import dotenv from 'dotenv';
dotenv.config();
const enum Environment {
  LOCAL = 'local',
  DEVELOPMENT = 'development',
  TEST = 'test',
  PRODUCTION = 'production',
}
const Api = process.env.API_URL;
const LAMBDA_NAME = process.env.LAMBDA_NAME;
const API_FIND_DATA_BY_DNI = `${Api}/people?studentDni=`;
const TABLE_NAME_VIEW = process.env.TABLE_NAME_VIEW;
const NODE_ENV = process.env.NODE_ENV;
const FORCE_SHOW_LOGS = process.env.FORCE_SHOW_LOGS;
export {
  API_FIND_DATA_BY_DNI,
  TABLE_NAME_VIEW,
  Environment,
  LAMBDA_NAME,
  NODE_ENV,
  FORCE_SHOW_LOGS,
};
