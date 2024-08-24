import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const authSignInHandler = (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    id: 'adw',
    username: 'dairo',
    accessToken: 'adw',
    refreshToken: 'adw',
  });
};
