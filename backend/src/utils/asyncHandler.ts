import { Request, Response, NextFunction, RequestHandler } from 'express';

// export { asyncHandler };

export const asyncHandler = (requestHandler: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };
};
