import { Application } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

export default function prod(app: Application) {
  app.use(compression());
  app.use(helmet());
  app.use(
    cors({
      // @ts-ignore
      origin: ['http://localhost:3000', process.env.SITE, process.env.SITE2],
      methods: 'HEAD,PUT,PATCH,POST,DELETE',
      optionsSuccessStatus: 200,
      credentials: true,
    })
  );
  app.use(cookieParser());
}
