import * as winston from 'winston';

const isProduction = process.env.NODE_ENV == 'production';

export const logger = winston.createLogger({
  level: 'http',
  format: isProduction ? winston.format.json() : winston.format.simple(),
  defaultMeta: { service: 'Blog-API' },
  transports: [new winston.transports.Console()],
});
