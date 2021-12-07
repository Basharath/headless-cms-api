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
      origin:
        process.env.NODE_ENV !== 'production'
          ? 'http://localhost:3000'
          : process.env.SITE,
      optionsSuccessStatus: 200,
      credentials: true,
      exposedHeaders: 'set-cookie',
    })
  );
  // app.use((req, res, next) => {
  //   res.header(
  //     'Access-Control-Allow-Origin',
  //     process.env.NODE_ENV !== 'production'
  //       ? 'http://localhost:3000'
  //       : process.env.SITE
  //   );
  //   res.header('Access-Control-Allow-Credentials');
  //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  //   res.header(
  //     'Access-Control-Allow-Headers',
  //     'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
  //   );
  //   next();
  // });
  app.use(cookieParser());
}
