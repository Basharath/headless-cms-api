import { Application } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

export default function prod(app: Application) {
  app.use(compression());
  app.use(helmet());
  app.use(cors());
  app.use(cookieParser());
}
