import { Schema, model } from 'mongoose';
import Joi from 'joi';

import { PostData } from '../types';

const postSchema = new Schema<PostData>(
  {
    slug: { type: String, unique: true, maxlength: 100 },
    status: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true, minlength: 5, maxlength: 100 },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true }, // TODO: replace by UserSchema
    tags: { type: [String], required: true }, // TODO: replace by TagsSchema
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true },
  },
  { timestamps: true, versionKey: false }
);

const Post = model('Post', postSchema);

const validate = (post: PostData) => {
  const schema = Joi.object({
    createdAt: Joi.string().label('Published date'),
    updatedAt: Joi.string().label('Modified date'),
    slug: Joi.string().min(5).max(100).required().label('Slug'),
    status: Joi.string().required().label('Status'),
    type: Joi.string().required().label('type'),
    title: Joi.string().min(5).max(100).required().label('Title'),
    excerpt: Joi.string().required().label('Excerpt'),
    content: Joi.string().min(100).required().label('Content'),
    author: Joi.string().min(4).max(15).required().label('Author'),
    tags: Joi.array().items(Joi.string()).required().label('Tags'),
    thumbnail: Joi.string().required().label('Thumbnail'),
    images: Joi.array().items(Joi.string()).label('Images'),
  });

  return schema.validate(post);
};

export default {
  Post,
  validate,
};
