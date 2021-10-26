import { Request, Response, NextFunction } from 'express';
import { Tag, validate } from '../models/tag';

const getTags = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tags = await Tag.find();
    if (!tags) return res.status(404).send('No tags found');
    return res.send(tags);
  } catch (err) {
    return next(err);
  }
};

const addTag = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  try {
    let tag = new Tag({
      name: req.body.name,
    });
    tag = await tag.save();

    return res.send(tag);
  } catch (err) {
    return next(err);
  }
};

const updateTag = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const tagId = req.params.id;
  try {
    const tag = await Tag.findByIdAndUpdate(
      tagId,
      {
        name: req.body.name,
      },
      { new: true }
    );

    if (!tag)
      return res.status(400).send('Tag with the given ID is not present');

    return res.send(tag);
  } catch (err) {
    return next(err);
  }
};

const deleteTag = async (req: Request, res: Response, next: NextFunction) => {
  const tagId = req.params.id;

  try {
    const tag = await Tag.findByIdAndDelete(tagId);
    if (!tag)
      return res.status(404).send('Tag with the given ID is not present');

    return res.send(tag);
  } catch (err) {
    return next(err);
  }
};

export { getTags, addTag, updateTag, deleteTag };
