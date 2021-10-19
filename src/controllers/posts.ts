import { Request, Response, NextFunction } from 'express';
import nanoid from '../utils/nanoid';
import Post from '../models/Post';

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  const postId = req.params.id;

  try {
    let result;
    if (postId) {
      const data = await (await Post.findOne(postId)).promise();
      result = data.Item;
    } else {
      const data = await (await Post.find()).promise();
      result = data.Items;
    }
    if (!result) return res.status(404).json({ message: 'No post(s) found' });

    return res.json(result);
  } catch (err) {
    return next(err);
  }
};

const addPost = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = Post.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { postId, ...rest } = req.body;
  if (postId) return res.status(400).send('Post already exists');

  const postData = {
    postId: `m${nanoid()}`,
    ...rest,
  };

  try {
    const result = await (await Post.update(postData)).promise();
    return res.json(result.Attributes);
  } catch (err) {
    return next(err);
  }
};

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = Post.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const postId = req.params.id || '0';

  try {
    const data = await (await Post.findOne(postId)).promise();
    if (!data.Item) return res.status(404).send('No post exists');

    const result = await (await Post.update(req.body)).promise();
    return res.json(result.Attributes);
  } catch (err) {
    return next(err);
  }
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  const postId = req.params.id;

  try {
    const data = await (await Post.findOne(postId)).promise();
    if (!data.Item) return res.status(404).send('No post exists');

    const result = await (await Post.remove(postId)).promise();

    if (result.Attributes) return res.json({ message: 'Successfully deleted' });

    return res.json({ message: 'Something is not correct' });
  } catch (err) {
    return next(err);
  }
};

// eslint-disable-next-line import/prefer-default-export
export { getPosts, addPost, updatePost, deletePost };
