import Joi from 'joi';
import { Schema, model } from 'mongoose';
import { CategoryType } from '../types';

const categorySchema = new Schema<CategoryType>(
  {
    name: { type: String, minlength: 3, maxlength: 255, required: true },
  },
  { versionKey: false }
);

const Category = model('Category', categorySchema);

const validate = (category: CategoryType) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
  });
  return schema.validate(category);
};

export { Category, validate, categorySchema };
