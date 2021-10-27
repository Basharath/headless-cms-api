import express, {
  Application,
  Request,
  Response,
  json,
  urlencoded,
} from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import posts from './routes/posts';
import users from './routes/users';
import categories from './routes/categories';
import tags from './routes/tags';
import notFound from './middleware/404';
import error from './middleware/error';

const db = process.env.db as string;

mongoose
  .connect(db)
  .then(() => console.log('Connected to MongoDb'))
  .catch((err) => console.log(err.message));

const app: Application = express();

app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/posts', posts);
app.use('/users', users);
app.use('/categories', categories);
app.use('/tags', tags);

app.get('/', (req: Request, res: Response) =>
  res.send('Welcome to the Headless CMS')
);

app.use(notFound);
app.use(error);

export default app;
