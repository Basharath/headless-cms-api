import { json, urlencoded, Request, Response, Application } from 'express';
import posts from '../routes/posts';
import users from '../routes/users';
import categories from '../routes/categories';
import tags from '../routes/tags';
import notFound from '../middleware/404';
import error from '../middleware/error';
import backupCollection from '../controllers/backup';

export default function routes(app: Application) {
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use('/api/posts', posts);
  app.use('/api/users', users);
  app.use('/api/categories', categories);
  app.use('/api/tags', tags);
  app.use('/api/backup', backupCollection);

  app.get('/', (req: Request, res: Response) =>
    res.send('Welcome to the Headless CMS')
  );

  app.use(notFound);
  app.use(error);
}
