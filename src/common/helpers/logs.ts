import * as winston from 'winston';

const isProduction = process.env.NODE_ENV === 'production';

export const logger = winston.createLogger({
  level: 'http',
  defaultMeta: { service: 'BLOG-API' },
  format: isProduction
    ? winston.format.json()
    : winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.prettyPrint(),
      ),
  transports: [new winston.transports.Console()],
});
