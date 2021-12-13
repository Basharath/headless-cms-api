import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';
import { Request, Response, NextFunction } from 'express';
import { Post } from '../models/post';
import { Tag } from '../models/tag';
import { Category } from '../models/category';

const folderpath = path.resolve('data');

const backupCollection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let postResult = await Post.find();
    postResult = postResult.map((i) => {
      return {
        // @ts-ignore
        ...i._doc,
        _id: { $oid: i.id },
        author: { $oid: i.author },
        tags: i.tags.map((t) => ({ $oid: t })),
        categories: i.categories.map((c) => ({ $oid: c })),
        updatedAt: {
          $date: i.updatedAt,
        },
        createdAt: {
          $date: i.createdAt,
        },
        modifiedAt: {
          $date: i.modifiedAt,
        },
      };
    });

    let tagResult = await Tag.find();
    tagResult = tagResult.map((i) => {
      return {
        // @ts-ignore
        ...i._doc,
        _id: { $oid: i.id },
      };
    });

    let categoryResult = await Category.find();
    categoryResult = categoryResult.map((i) => {
      return {
        // @ts-ignore
        ...i._doc,
        _id: { $oid: i.id },
      };
    });

    try {
      fs.writeFileSync(
        path.resolve('data/posts.json'),
        JSON.stringify(postResult)
      );

      fs.writeFileSync(
        path.resolve('data/tags.json'),
        JSON.stringify(tagResult)
      );

      fs.writeFileSync(
        path.resolve('data/categories.json'),
        JSON.stringify(categoryResult)
      );
    } catch (err) {
      return res.json('Could not backup');
    }

    // if (error) return res.json(error);
    // return res.json('Successfully backedup');

    const zip = new AdmZip();
    zip.addLocalFolder(folderpath);
    zip.toBuffer();
    zip.writeZip(path.resolve('backup.zip'));

    const filename = `devapt_${new Date().toISOString().slice(0, 10)}`;

    return res.download(path.resolve('backup.zip'), filename);
  } catch (err) {
    return next(err);
  }
};

export default backupCollection;
