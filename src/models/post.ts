import { Schema, model } from 'mongoose';
import Joi from 'joi';

import { PostType } from '../types';

const postSchema = new Schema<PostType>(
  {
    slug: { type: String, unique: true, maxlength: 100 },
    status: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true, minlength: 5, maxlength: 100 },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tags: { type: [Schema.Types.ObjectId], ref: 'Tag', required: true },
    categories: {
      type: [Schema.Types.ObjectId],
      ref: 'Category',
      required: true,
    },
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false }
);

const Post = model('Post', postSchema);

const validate = (post: PostType) => {
  const schema = Joi.object({
    createdAt: Joi.string().label('Published date'),
    updatedAt: Joi.string().label('Modified date'),
    slug: Joi.string().min(5).max(100).required().label('Slug'),
    status: Joi.string().required().label('Status'),
    type: Joi.string().required().label('type'),
    title: Joi.string().min(5).max(100).required().label('Title'),
    excerpt: Joi.string().required().label('Excerpt'),
    content: Joi.string().min(100).required().label('Content'),
    author: Joi.string().required().label('Author'),
    tags: Joi.array().items(Joi.string()).required().label('Tags'),
    categories: Joi.array().items(Joi.string()).required(),
    thumbnail: Joi.string().required().label('Thumbnail'),
    images: Joi.array().items(Joi.string()).label('Images'),
  });

  return schema.validate(post);
};

export { Post, validate };
