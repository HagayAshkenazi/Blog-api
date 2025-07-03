import * as morgan from 'morgan';
import { logger } from '@/common/helpers/logs';
import type { Request, Response } from 'express';

export const morganLogger = morgan(
  (tokens: morgan.TokenIndexer, req: Request, res: Response) => {
    const responseTime = Number(tokens['response-time'](req, res) ?? 0);
    const contentLengthStr = tokens.res(req, res, 'content-length');
    const contentLength = contentLengthStr ? Number(contentLengthStr) : 0;

    logger.http('http request', {
      route: tokens.url(req, res) ?? '',
      method: tokens.method(req, res) ?? '',
      status: Number(tokens.status(req, res) ?? 0),
      responseTime,
      contentLength,
    });
  },
);
