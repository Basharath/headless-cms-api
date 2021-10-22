import Joi from 'joi';
import { Schema, model } from 'mongoose';
import { TagType } from '../types';

const tagSchema = new Schema<TagType>(
  {
    name: { type: String, minlength: 3, maxlength: 255, required: true },
  },
  { versionKey: false }
);

const Tag = model('Tag', tagSchema);

const validate = (tag: TagType) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
  });
  return schema.validate(tag);
};

export { Tag, validate, tagSchema };
