import { Request, Response, NextFunction } from 'express';
import { Category, validate } from '../models/category';

const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find();
    if (!categories) return res.status(404).send('No categories found');
    return res.send(categories);
  } catch (err) {
    return next(err);
  }
};

const addCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  try {
    let category = new Category({
      name: req.body.name,
    });
    category = await category.save();

    return res.send(category);
  } catch (err) {
    return next(err);
  }
};

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const categoryId = req.params.id;
  try {
    const category = await Category.findByIdAndUpdate(
      categoryId,
      {
        name: req.body.name,
      },
      { new: true }
    );

    if (!category)
      return res.status(400).send('Category with the given ID is not present');

    return res.send(category);
  } catch (err) {
    return next(err);
  }
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findByIdAndDelete(categoryId);
    if (!category)
      return res.status(404).send('Category with the given ID is not present');

    return res.send(category);
  } catch (err) {
    return next(err);
  }
};

export { getCategories, addCategory, updateCategory, deleteCategory };
