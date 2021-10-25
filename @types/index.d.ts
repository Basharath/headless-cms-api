/* eslint-disable no-unused-vars */
declare namespace Express {
  interface Request {
    user: {
      id: string;
      name: string;
      email: string;
    };
  }
}
