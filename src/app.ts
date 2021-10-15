import express, {
  Application,
  Request,
  Response,
  json,
  urlencoded,
} from 'express';
import posts from './routes/posts';
import users from './routes/users';
import tags from './routes/tags';

const app: Application = express();

app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/posts', posts);
app.use('/users', users);
app.use('/tags', tags);

app.get('/', (req: Request, res: Response) =>
  res.send('Welcome to the Headless CMS')
);

export default app;
