import express, { Application } from 'express';
import prod from './startup/prod';
import routes from './startup/routes';
import db from './startup/db';

const app: Application = express();

db();
prod(app);
routes(app);

export default app;
