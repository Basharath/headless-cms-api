/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../types';

const errorHandler = (
  error: HttpError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';

  return res.status(status).json({
    status,
    message,
  });
};

export default errorHandler;
