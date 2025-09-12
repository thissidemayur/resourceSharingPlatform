import { prisma } from '../utils/prismaClient.js';
import { ApiError } from '../utils/apiError.js';

interface createRqstProps {
  resourceId: string;
  userId: string;
}
interface approveRqstProps {
  requestId: string;
  userId: string;
}
interface rejectRqstProps {
  requestId: string;
  userId: string;
}

// Create a new resource request
const createRequest = async ({ resourceId, userId }: createRqstProps) => {
  const resource = await prisma.resource.findUnique({
    where: { id: resourceId },
  });
  if (!resource) {
    throw new ApiError({ status: 404, message: 'Resource not found' });
  }

  if (resource.ownerId === userId) {
    throw new ApiError({
      status: 400,
      message: 'Cannot request your own resource',
    });
  }

  // prevent duplicate pending requests
  const existingRqst = await prisma.request.findFirst({
    where: {
      resourceId,
      borrowerId: userId,
      status: 'PENDING',
    },
  });

  if (existingRqst) {
    throw new ApiError({
      status: 400,
      message: 'You already have a pending request for this resource',
    });
  }

  // notification

  return await prisma.request.create({
    data: {
      resourceId,
      borrowerId: userId,
      status: 'PENDING',
      ownerId: resource.ownerId,
    },
  });
};

// Get all resource requests for a user (made + received )
const getUserRequests = async (userId: string) => {
  const requestMade = await prisma.request.findMany({
    where: {
      borrowerId: userId,
    },
    include: {
      resource: true,
      borrower: true,
      owner: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const requestReceived = await prisma.request.findMany({
    where: {
      ownerId: userId,
    },
    include: {
      resource: true,
      borrower: true,
      owner: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return { requestMade, requestReceived };
};

// Approve a resource request
const approveRequest = async ({ requestId, userId }: approveRqstProps) => {
  const request = await prisma.request.findUnique({
    where: { id: requestId },
    include: { resource: true, owner: true, borrower: true },
  });

  if (!request) {
    throw new ApiError({ status: 404, message: 'Request not found' });
  }

  if (request.ownerId !== userId) {
    throw new ApiError({ status: 403, message: 'Not authorized' });
  }

  if (request.status !== 'PENDING') {
    throw new ApiError({
      status: 400,
      message: 'Request is already processed',
    });
  }

  return await prisma.request.update({
    where: { id: requestId },
    data: { status: 'APPROVED' },
  });
};

// Reject a resource request
const rejectRequest = async ({ requestId, userId }: rejectRqstProps) => {
  const request = await prisma.request.findUnique({
    where: { id: requestId },
  });

  if (!request) {
    throw new ApiError({ status: 404, message: 'Request not found' });
  }

  if (request.ownerId !== userId) {
    throw new ApiError({
      status: 403,
      message: 'Not authorized to reject this request',
    });
  }

  if (request.status !== 'PENDING') {
    throw new ApiError({
      status: 400,
      message: 'Request is already processed',
    });
  }

  return await prisma.request.update({
    where: { id: requestId },
    data: { status: 'REJECTED' },
  });
};

export default {
  createRequest,
  getUserRequests,
  approveRequest,
  rejectRequest,
};
