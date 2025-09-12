import 'express';

declare module 'express-serve-static-core' {
  interface Request {
    authUser?: {
      id: string;
      // name: string | null;
      email: string;
    };
  }
}
