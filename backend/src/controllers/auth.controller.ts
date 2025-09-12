import authService from '../services/auth.service.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

//
export const registerAuth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authService.registerUser({ email, password });
    return res.status(200).json(
      new ApiResponse({
        message: 'User registered successfully',
        data: user,
        status: 200,
      }),
    );
  } catch (error) {
    throw error;
  }
});

//
export const loginAuth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authService.loginUser({ email, password });
    return res.status(200).json(
      new ApiResponse({
        message: 'User logged in successfully',
        data: user,
        status: 200,
      }),
    );
  } catch (error) {
    throw error;
  }
});

// get user profile
export const getUserProfile = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await authService.userProfile(userId);
    return res.status(200).json(
      new ApiResponse({
        message: 'User profile fetched successfully',
        data: user,
        status: 200,
      }),
    );
  } catch (error) {
    throw error;
  }
});
