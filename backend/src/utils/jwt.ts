// utils/jwt.ts
import jwt, { JwtPayload } from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'supersecretkey';

export interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): CustomJwtPayload => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as CustomJwtPayload;
};
