import { json, urlencoded, Request, Response, Application } from 'express';
import posts from '../routes/posts';
import users from '../routes/users';
import categories from '../routes/categories';
import tags from '../routes/tags';
import notFound from '../middleware/404';
import error from '../middleware/error';

export default function routes(app: Application) {
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use('/posts', posts);
  app.use('/users', users);
  app.use('/categories', categories);
  app.use('/tags', tags);
  app.use('/', posts);

  app.get('/', (req: Request, res: Response) =>
    res.send('Welcome to the Headless CMS')
  );

  app.use(notFound);
  app.use(error);
}
