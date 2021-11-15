import { Request, Response, NextFunction } from 'express';
// import { ObjectId } from 'mongoose';
import { Post, validate } from '../models/post';

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  const postId = req.params.id;

  const { page: p, limit: l = 8 } = req.query;
  const skip = p && l ? +l * (+p - 1) : 0;

  try {
    let result;
    if (postId) result = await Post.findById(postId);
    else if (p && l)
      result = await Post.find({}, {}, { skip, limit: +l, sort: '-updatedAt' });
    else
      result = await Post.find().sort('-updatedAt').populate('tags categories');

    if (!result) return res.status(404).json({ message: 'No post(s) found' });

    return res.json(result);
  } catch (err) {
    return next(err);
  }
};

const postsByTags = async (req: Request, res: Response, next: NextFunction) => {
  const tagId = req.params.tag;

  try {
    // @ts-ignore
    const result = await Post.find({
      tags: { $in: [tagId] },
    })
      .sort('-updatedAt')
      .populate('tags')
      .populate('categories');

    if (!result) return res.status(404).json({ message: 'No post(s) found' });

    return res.json(result);
  } catch (err) {
    return next(err);
  }
};

const postsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categoryId = req.params.category;

  try {
    // @ts-ignore
    const result = await Post.find({
      categories: { $in: [categoryId] },
    })
      .sort('-updatedAt')
      .populate('tags')
      .populate('categories');

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

export default {
  getPosts,
  postsByTags,
  postsByCategory,
  addPost,
  updatePost,
  deletePost,
};
