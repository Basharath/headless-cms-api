import express, { Application } from 'express';
import prod from './startup/prod';
import routes from './startup/routes';
import db from './startup/db';

const app: Application = express();

prod(app);
routes(app);
db();

export default app;
