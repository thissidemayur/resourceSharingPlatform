import { Router } from 'express';

import {
  getUserProfile,
  loginAuth,
  registerAuth,
  // verifyEmailOtp,
} from '../controllers/auth.controller.js';
const authRouter = Router();
authRouter.post('/register', registerAuth);
authRouter.post('/login', loginAuth);
// authRouter.post('/verify-email', verifyEmailOtp);
authRouter.get('/profile/:userId', getUserProfile);

export { authRouter };
