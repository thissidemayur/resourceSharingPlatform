// auth.middleware.ts
import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/apiError';
import { verifyToken } from '../utils/jwt';
import { prisma } from '../utils/prismaClient';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers?.authorization?.replace('Bearer ', '');
  const cookieToken = req.cookies?.accessToken;

  const token = cookieToken || authHeader;
  if (!token || typeof token !== 'string') {
    throw new ApiError({
      status: 401,
      message: 'Unauthorized: No valid token provided',
    });
  }

  try {
    const decodedToken = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decodedToken.userId },
      select: {
        id: true,
        email: true,
      },
    });

    if (!user) {
      throw new ApiError({ status: 404, message: 'User not found' });
    }

    // Attach user to request
    req.authUser = { id: user.id, email: user.email };

    next();
  } catch (error) {
    throw new ApiError({
      status: 401,
      message: 'Unauthorized: Invalid token',
    });
  }
};
