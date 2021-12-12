import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { DecodedType } from '../types';

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const { token: cookieToken } = req.cookies;
  const authToken = authorization;

  if (!authToken && !cookieToken)
    return res.status(401).send('Access denied. No token provided.');

  const finalToken = authToken || cookieToken;
  try {
    const decodedData = <DecodedType>(
      jwt.verify(finalToken, <string>process.env.jwtPrivateKey)
    );

    if (!decodedData.isAdmin)
      return res.status(401).send("You don't have access to this action");
    req.user = decodedData;

    return next();
  } catch (err) {
    return res.status(400).send('Invalid token');
  }
};

// export default (req: Request, res: Response, next: NextFunction) => {
//   const { token } = req.cookies;

//   if (!token) return res.status(401).send('Access denied. No token provided.');
// try {
//   const decodedData = jwt.verify(token, <string>process.env.jwtPrivateKey);
//   req.user = <DecodedType>decodedData;

//   return next();
// } catch (err) {
//   return res.status(400).send('Invalid token');
// }
// };
