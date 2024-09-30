import { CookieOptions, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from '../../config';
import { findUniqueUser } from '../../user';
import { SignInUserInput } from '../../schemas';
import { comparePassword } from '../../services';
import { HttpRequestError } from '../../utils';
import { signJwt, signTokens, verifyJwt } from '../../services/jwt.service';

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

export const refreshAccessTokenHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    const message = 'Could not refresh access token';

    if (!refreshToken) {
      return next(new HttpRequestError(message, 403));
    }

    const decoded = verifyJwt<{ sub: string }>(refreshToken, 'refreshTokenPrivateKey');

    if (!decoded) {
      return next(new HttpRequestError(message, 403));
    }

    const user = await findUniqueUser({ id: decoded.sub }, { id: true, username: true, person: true });

    if (!user) {
      return next(new HttpRequestError(message, 403));
    }

    const accessToken = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
      expiresIn: `${ACCESS_TOKEN_EXPIRES_IN}m`,
    });

    res.cookie('access_token', accessToken, accessTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    res.status(200).json({
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

function logout(res: Response) {
  res.cookie('access_token', '', { maxAge: -1 });
  res.cookie('refresh_token', '', { maxAge: -1 });
  res.cookie('logged_in', '', { maxAge: -1 });
}

export const logoutUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logout(res);

    res.status(200).json({
      message: 'You have been logged out',
    });
  } catch (err: any) {
    next(err);
  }
};
