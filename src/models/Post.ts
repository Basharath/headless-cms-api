import Joi from 'joi';
import db from '../db';
import {
  PostData,
  ParamGet,
  ParamScan,
  ParamPut,
  ParamDelete,
  ParamUpdate,
} from '../types';

const TABLE: string = 'Posts';

const find = async () => {
  const params: ParamScan = {
    TableName: TABLE,
  };

  return db.scan(params);
};

const findOne = async (id: string) => {
  const params: ParamGet = {
    TableName: TABLE,
    Key: {
      postId: id,
    },
  };

  return db.get(params);
};

// Is not used for inserting
const insert = async (data: PostData) => {
  const params: ParamPut = {
    TableName: TABLE,
    Item: data,
    ReturnValues: 'ALL_OLD',
  };

  return db.put(params);
};

const update = async (data: PostData) => {
  const { postId, ...item } = data;

  const params: ParamUpdate = {
    TableName: TABLE,
    Key: { postId },
    UpdateExpression: `set ${Object.keys(item)
      .map((k) => `#${k} = :${k}`)
      .join(', ')}`,
    ExpressionAttributeNames: Object.entries(item).reduce(
      (acc, cur) => ({ ...acc, [`#${cur[0]}`]: cur[0] }),
      {}
    ),
    ExpressionAttributeValues: Object.entries(item).reduce(
      (acc, cur) => ({ ...acc, [`:${cur[0]}`]: cur[1] }),
      {}
    ),
    ReturnValues: 'ALL_NEW',
  };
  return db.update(params);
};

const remove = async (id: string) => {
  const params: ParamDelete = {
    TableName: TABLE,
    Key: {
      postId: id,
    },
    ReturnValues: 'ALL_OLD',
  };
  return db.delete(params);
};

const validate = (post: PostData) => {
  const schema = Joi.object({
    postId: Joi.string().label('Post ID'),
    published: Joi.string().required().label('Created date'),
    modified: Joi.string().required().label('Updated date'),
    slug: Joi.string().required().label('Slug'),
    status: Joi.string().required().label('Status'),
    type: Joi.string().required().label('type'),
    title: Joi.string().required().label('Title'),
    excerpt: Joi.string().required().label('Excerpt'),
    content: Joi.string().required().label('Content'),
    author: Joi.string().required().label('Author'),
    tags: Joi.array().items(Joi.string()).required().label('Tags'),
    thumbnail: Joi.string().required().label('Thumbnail'),
    images: Joi.array().items(Joi.string()).label('Images'),
  });

  return schema.validate(post);
};

export default {
  find,
  findOne,
  insert,
  update,
  remove,
  validate,
};
