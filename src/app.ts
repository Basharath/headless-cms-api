import express, {
  Application,
  Request,
  Response,
  json,
  urlencoded,
} from 'express';
import dotenv from 'dotenv';
import posts from './routes/posts';
import users from './routes/users';
import categories from './routes/categories';
import tags from './routes/tags';
import notFound from './middleware/404';
import error from './middleware/error';

dotenv.config();
const app: Application = express();

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
