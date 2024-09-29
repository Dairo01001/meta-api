import { CookieOptions, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from '../../config';
import { findUniqueUser } from '../../user';
import { SignInUserInput } from '../../schemas';
import { comparePassword } from '../../services';
import { HttpRequestError } from '../../utils';
import { signTokens } from '../../services/jwt.service';

const cookiesOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
};

if (process.env.NODE_ENV === 'production') cookiesOptions.secure = true;

const accessTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(Date.now() + ACCESS_TOKEN_EXPIRES_IN * 60 * 1000),
  maxAge: ACCESS_TOKEN_EXPIRES_IN * 60 * 1000,
};

const refreshTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN * 60 * 1000),
  maxAge: REFRESH_TOKEN_EXPIRES_IN * 60 * 1000,
};

export const authSignInHandler = async (
  req: Request<{}, {}, SignInUserInput['body']>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password } = req.body;

    const user = await findUniqueUser(
      { username },
      { id: true, username: true, password: true, role: true, status: true },
    );

    if (!user || !(await comparePassword(password, user.password))) {
      return next(new HttpRequestError('Invalid username or password', 401));
    }

    const { accessToken, refreshToken } = signTokens(user.id);
    console.log(accessToken, refreshToken);
    res.cookie('access_token', accessToken, accessTokenCookieOptions);
    res.cookie('refresh_token', refreshToken, refreshTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    res.status(StatusCodes.OK).json({
      id: user.id,
      username: user.username,
      role: user.role.name,
      status: user.status.name,
      accessToken,
      refreshToken,
    });
  } catch (err: any) {
    next(err);
  }
};
