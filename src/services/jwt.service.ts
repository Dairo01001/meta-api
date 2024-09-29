import jwt from 'jsonwebtoken';
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  ACCESS_TOKEN_PUBLIC,
  REFRESH_TOKEN_PUBLIC,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from '../config';
import { CreatedUser } from '../user';

type PrivateKEY = 'accessTokenPrivateKey' | 'refreshTokenPrivateKey';
type PublicKey = 'accessTokenPublicKey' | 'refreshTokenPublicKey';

const setPrivateKey = (keyName: PrivateKEY): string => {
  if (keyName === 'accessTokenPrivateKey') {
    return ACCESS_TOKEN;
  }
  return REFRESH_TOKEN;
};

const setPublicKey = (keyName: PublicKey): string => {
  if (keyName === 'accessTokenPublicKey') {
    return ACCESS_TOKEN_PUBLIC;
  }
  return REFRESH_TOKEN_PUBLIC;
};

export const signJwt = (object: Object, privateKey: PrivateKEY, options?: jwt.SignOptions | undefined) => {
  const signInKey = Buffer.from(setPrivateKey(privateKey), 'base64').toString('ascii');

  return jwt.sign(object, signInKey, {
    ...(options && options),
    algorithm: 'HS256',
  });
};

export const verifyJwt = <T>(token: string, keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'): T | null => {
  try {
    const publicKey = Buffer.from(setPublicKey(keyName), 'base64').toString('ascii');
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (error) {
    return null;
  }
};

export const signTokens = (
  userId: CreatedUser['id'],
): {
  accessToken: string;
  refreshToken: string;
} => {
  const accessToken = signJwt({ sub: userId }, 'accessTokenPrivateKey', {
    expiresIn: `${ACCESS_TOKEN_EXPIRES_IN}m`,
  });

  const refreshToken = signJwt({ sub: userId }, 'refreshTokenPrivateKey', {
    expiresIn: `${REFRESH_TOKEN_EXPIRES_IN}m`,
  });

  return { accessToken, refreshToken };
};
