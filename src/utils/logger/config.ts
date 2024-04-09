import pino from 'pino';
import pinoPretty from 'pino-pretty';
import { Environment, NODE_ENV, FORCE_SHOW_LOGS } from '../constants/urls';
const level = () => {
  if (FORCE_SHOW_LOGS === 'true') {
    return 'trace';
  }
  switch (NODE_ENV) {
    case Environment.LOCAL:
      return 'trace';
    case Environment.DEVELOPMENT:
      return 'debug';
    case Environment.TEST:
      return 'info';
    case Environment.PRODUCTION:
      return 'info';
    default:
      return 'info';
  }
};
const options = () => {
  switch (NODE_ENV) {
    case Environment.LOCAL:
      return pinoPretty({
        colorize: true,
      });
    default:
      return undefined;
  }
};
export const logger = pino(
  {
    level: level(),
  },
  ...(options() ? [options()] : []),
);
