import { Application } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

export default function prod(app: Application) {
  app.use(compression());
  app.use(helmet());
  app.use(
    // cors({
    //   origin:
    //     process.env.NODE_ENV !== 'production'
    //       ? 'http://localhost:3000'
    //       : process.env.SITE,
    //   optionsSuccessStatus: 200,
    //   credentials: true,
    // })
    cors()
  );
  app.use(cookieParser());
}
