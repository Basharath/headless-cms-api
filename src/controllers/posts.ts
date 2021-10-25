import { Request, Response, NextFunction } from 'express';
import { Post, validate } from '../models/post';

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  const postId = req.params.id;

  try {
    let result;
    if (postId) {
      const data = await Post.findById(postId);
      result = data;
    } else {
      const data = await Post.find();
      result = data;
    }
    if (!result) return res.status(404).json({ message: 'No post(s) found' });

    return res.json(result);
  } catch (err) {
    return next(err);
  }
};

const addPost = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const {
    slug,
    status,
    type,
    title,
    excerpt,
    content,
    author,
    tags,
    categories,
    thumbnail,
    images,
  } = req.body;

  try {
    const post = new Post({
      slug,
      status,
      type,
      title,
      excerpt,
      content,
      author,
      tags,
      categories,
      thumbnail,
      images,
    });

    const result = await post.save();
    return res.json(result);
  } catch (err) {
    return next(err);
  }
};

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const postId = req.params.id;

  const {
    slug,
    status,
    type,
    title,
    excerpt,
    content,
    author,
    tags,
    categories,
    thumbnail,
    images,
    updatedAt,
  } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        slug,
        status,
        type,
        title,
        excerpt,
        content,
        author,
        tags,
        categories,
        thumbnail,
        images,
        ...(updatedAt && { updatedAt }),
      },
      { new: true }
    );

    if (!post)
      return res.status(400).send('Post with the given ID is not present');

    return res.send(post);
  } catch (err) {
    return next(err);
  }
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  const postId = req.params.id;

  try {
    const post = await Post.findByIdAndDelete(postId);

    if (!post)
      return res.status(404).send('Post with the given ID is not present');

    return res.send(post);
  } catch (err) {
    return next(err);
  }
};

export default { getPosts, addPost, updatePost, deletePost };
