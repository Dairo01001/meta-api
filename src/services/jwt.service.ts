import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../config';

type PrivateKEY = 'accessTokenPrivateKey' | 'refreshTokenPrivateKey';

const setPrivateKey = (keyName: PrivateKEY): string => {
  if (keyName === 'accessTokenPrivateKey') {
    return ACCESS_TOKEN;
  }
  return REFRESH_TOKEN;
};

export const signJwt = (object: Object, privateKey: PrivateKEY, options?: jwt.SignOptions | undefined) => {
  const signInKey = Buffer.from(setPrivateKey(privateKey), 'base64').toString('ascii');

  return jwt.sign(object, signInKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};
