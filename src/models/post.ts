import { Schema, model } from 'mongoose';
import Joi from 'joi';

import { PostType } from '../types';

const postSchema = new Schema<PostType>(
  {
    slug: { type: String, unique: true, maxlength: 100 },
    status: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true, minlength: 5, maxlength: 100 },
    excerpt: { type: String },
    description: { type: String },
    keyphrase: { type: String },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tags: { type: [Schema.Types.ObjectId], ref: 'Tag' },
    categories: {
      type: [Schema.Types.ObjectId],
      ref: 'Category',
    },
    thumbnail: { type: String },
    images: { type: [String] },
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: { createdAt: false, updatedAt: 'modifiedAt' },
    versionKey: false,
  }
);

postSchema.set('toJSON', {
  virtuals: true,
  transform(doc, ret) {
    // eslint-disable-next-line no-param-reassign
    delete ret._id;
  },
});

const Post = model('Post', postSchema);

const validate = (post: PostType) => {
  const schema = Joi.object({
    createdAt: Joi.string().label('Published date'),
    updatedAt: Joi.string().label('Updated date'),
    slug: Joi.string().min(5).max(100).required().label('Slug'),
    status: Joi.string().required().label('Status'),
    type: Joi.string().required().label('type'),
    title: Joi.string().min(5).max(100).required().label('Title'),
    excerpt: Joi.string().allow('').label('Excerpt'),
    description: Joi.string().allow('').label('Description'),
    keyphrase: Joi.string().allow('').label('Key phrase'),
    content: Joi.string().allow('').required().label('Content'),
    author: Joi.string().required().label('Author'),
    tags: Joi.array().items(Joi.string()).label('Tags'),
    categories: Joi.array().items(Joi.string()),
    thumbnail: Joi.string().allow(null, '').label('Thumbnail'),
    images: Joi.array().items(Joi.string()).label('Images'),
  });

  return schema.validate(post);
};

export { Post, validate };
