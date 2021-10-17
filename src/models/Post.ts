import db from '../db';
// import Joi from 'joi';
import { PostData } from '../types';

const TABLE: string = 'Posts';

interface Param {
  TableName: string;
  Key: {
    postId: string;
  };
}

const find = async () => {
  const params: { TableName: string } = {
    TableName: 'Posts',
  };

  return db.scan(params);
};

const findOne = async (id: string) => {
  const params: Param = {
    TableName: TABLE,
    Key: {
      postId: id,
    },
  };
  return db.get(params);
};

const insert = async (data: PostData) => {
  const params = {
    TableName: TABLE,
    Item: data,
  };

  return db.put(params);
};

export default {
  find,
  findOne,
  insert,
};
