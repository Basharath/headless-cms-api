import { DynamoDB } from 'aws-sdk';
// export interface PostData {
//   postId: string;
//   published: string;
//   modified: string;
//   slug: string;
//   status: string;
//   type: string;
//   title: string;
//   excerpt: string;
//   content: string;
//   author: string;
//   tags: string[];
//   thumbnail: string;
//   images: string[];
// }

// export type PostData = {
//   [key: string]: string | string[],
// }

// This line is equivalent to the above two
export type PostData = Record<string, string | string[]>;
export type ParamGet = DynamoDB.DocumentClient.GetItemInput;
export type ParamScan = DynamoDB.DocumentClient.ScanInput;
export type ParamPut = DynamoDB.DocumentClient.PutItemInput;
export type ParamUpdate = DynamoDB.DocumentClient.UpdateItemInput;
export type ParamDelete = DynamoDB.DocumentClient.DeleteItemInput;

export interface HttpError extends Error {
  status?: number;
}
