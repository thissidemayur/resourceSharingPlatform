import requestService from '../services/request.service.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// create request
export const createRequest = asyncHandler(async (req, res) => {
  const { resourceId } = req.params;
  const userId = req.authUser?.id!;
  const request = await requestService.createRequest({ resourceId, userId });

  return res.status(201).json(
    new ApiResponse({
      status: 201,
      data: request,
      message: 'Request created successfully',
    }),
  );
});

// get user's requests(made+received): both side track request
export const getUserRequests = asyncHandler(async (req, res) => {
  try {
    const userId = req.authUser?.id!;
    const requests = await requestService.getUserRequests(userId);

    return res.status(200).json(
      new ApiResponse({
        status: 200,
        data: requests,
        message: 'User requests fetched successfully',
      }),
    );
  } catch (error) {
    throw error;
  }
});

// appprove request
export const approveRequest = asyncHandler(async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.authUser?.id!;
    const request = await requestService.approveRequest({ requestId, userId });

    return res.status(200).json(
      new ApiResponse({
        status: 200,
        data: request,
        message: 'Request approved successfully',
      }),
    );
  } catch (error) {
    throw error;
  }
});

// reject request
export const rejectRequest = asyncHandler(async (req, res) => {
  // to be implemented
  try {
    const { requestId } = req.params;
    const userId = req.authUser?.id!;
    const request = await requestService.rejectRequest({ requestId, userId });

    return res.status(200).json(
      new ApiResponse({
        status: 200,
        data: request,
        message: 'Request rejected successfully',
      }),
    );
  } catch (error) {
    throw error;
  }
});
