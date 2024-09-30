import { NextFunction, Request, Response } from 'express';
import { HttpRequestError } from '../utils';
import { verifyJwt } from '../services/jwt.service';
import { findUniqueUser } from '../user';
import { omit } from 'lodash';

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let access_token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      access_token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.access_token) {
      access_token = req.cookies.access_token;
    }

    if (!access_token) {
      return next(new HttpRequestError('You are not logged in', 401));
    }

    const decoded = verifyJwt<{ sub: string }>(access_token, 'accessTokenPrivateKey');

    if (!decoded) {
      return next(new HttpRequestError(`Invalid token or user doesn't exist`, 401));
    }

    const user = await findUniqueUser({ id: decoded.sub }, { id: true, username: true, person: true });

    if (!user) {
      return next(new HttpRequestError(`Invalid token or session has expired`, 401));
    }

    res.locals.user = {
      ...omit(user, 'password'),
      role: user.role.name,
      status: user.status.name,
    };

    next();
  } catch (err: any) {
    next(err);
  }
};
