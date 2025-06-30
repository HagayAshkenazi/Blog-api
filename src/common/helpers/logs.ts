import * as winston from 'winston';

const isProduction = process.env.NODE_ENV === 'production';

const customFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.colorize({ all: true }),
  winston.format.printf(({ level, stack, message, timestamp, ...meta }) => {
    return stack
      ? `${timestamp} [${level}]: ${message} - ${stack}`
      : `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
  }),
);

export const logger = winston.createLogger({
  level: 'http',
  defaultMeta: { service: 'Blog-Api' },
  transports: [new winston.transports.Console()],
  format: isProduction ? winston.format.json() : customFormat,
});
