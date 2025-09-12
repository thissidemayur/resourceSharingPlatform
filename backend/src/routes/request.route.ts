//

import { Router } from 'express';
import {
  approveRequest,
  createRequest,
  getUserRequests,
  rejectRequest,
} from '../controllers/request.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const requestRouter = Router();

requestRouter.post('/:resourceId', authenticate, createRequest);
requestRouter.get('/:userId', authenticate, getUserRequests);
requestRouter.patch('/:requestId/approve', authenticate, approveRequest);
requestRouter.patch('/:requestId/reject', authenticate, rejectRequest);

export { requestRouter };
