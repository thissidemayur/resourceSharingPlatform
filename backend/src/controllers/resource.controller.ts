// Handle resouce controller

import resourceService from '../services/resource.service.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

//add new resource
export const createResource = asyncHandler(async (req, res) => {
  const { title, category, image, description } = req.body;
  console.log('req.authUser?.id!', req.authUser?.id!);
  const resource = await resourceService.create(req.authUser?.id!, {
    title,
    category,
    image,
    description,
  });

  return res.status(201).json(
    new ApiResponse({
      message: 'Resource created successfully',
      status: 201,
      data: resource,
    }),
  );
});

// get all resources
export const getAllResources = asyncHandler(async (req, res) => {
  const resources = await resourceService.findAll();

  return res.status(200).json(
    new ApiResponse({
      message: 'Resources retrieved successfully',
      status: 200,
      data: resources,
    }),
  );
});

// get single resource
export const getSingleResource = asyncHandler(async (req, res) => {
  // to be implemented
  const { resourceId } = req.params;
  try {
    const resource = await resourceService.findResourceById(resourceId);

    return res.status(200).json(
      new ApiResponse({
        message: 'Resource retrieved successfully',
        status: 200,
        data: resource,
      }),
    );
  } catch (error) {
    throw error;
  }
});

// update resource
export const updateResource = asyncHandler(async (req, res) => {
  const { resourceId } = req.params;
  const { title, category, image, description } = req.body;

  try {
    const resource = await resourceService.updateResource({
      resourceId,
      ownerId: req.authUser?.id!,
      data: { title, category, image, description },
    });
    return res.status(200).json(
      new ApiResponse({
        message: 'Resource updated successfully',
        status: 200,
        data: resource,
      }),
    );
  } catch (error) {
    throw error;
  }
});

// delete resourcec
export const deleteResource = asyncHandler(async (req, res) => {
  const { resourceId } = req.params;
  try {
    const deletedResource = await resourceService.deleteResource({
      resourceId,
      ownerId: req.authUser?.id!,
    });
    return res.status(200).json(
      new ApiResponse({
        message: 'Resource deleted successfully',
        status: 200,
        data: deletedResource,
      }),
    );
  } catch (error) {
    throw error;
  }
});
