import { ObjectId } from 'mongoose';

export interface PostType {
  createdAt?: string;
  updatedAt?: string;
  modifiedAt?: string;
  slug: string;
  status: string;
  type: string;
  title: string;
  excerpt: string;
  description: string;
  keyphrase: string;
  content: string;
  author: ObjectId;
  tags: ObjectId[];
  categories: ObjectId[];
  thumbnail: string;
  images: string[];
}

export interface CategoryType {
  name: string;
}

export interface TagType {
  name: string;
}

export interface UserType {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  generateToken: () => string;
}

export interface PassType {
  oldPassword: string;
  newPassword: string;
}

export interface DecodedType {
  id: string;
  name: string;
  isAdmin: boolean;
}

// export interface RequestUser extends Request {
//   user: Record<string, string>;
// }
// export type PostData = {
//   [key: string]: string | string[],
// }

// This line is equivalent to the above two
// export type PostData = Record<string, string | string[]>;

export interface HttpError extends Error {
  status?: number;
}
