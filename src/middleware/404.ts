import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../types';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error: HttpError = new Error('No resource found');
  error.status = 404;

  next(error);
};

export default notFound;
