import { ApiError } from '../utils/apiError.js';
import { prisma } from '../utils/prismaClient.js';

interface iRegisterResourceProps {
  title: string;
  category: string;
  image: string;
  description?: string;
}

interface iUpdateResourceProps {
  resourceId: string;
  ownerId: string;
  data: Partial<iRegisterResourceProps>;
}
interface iDeleteResourceProps {
  resourceId: string;
  ownerId: string;
}

// create resource bussiness logic
const create = async (
  ownerId: string,
  { title, category, image, description }: iRegisterResourceProps,
) => {
  return await prisma.resource.create({
    data: { title, category, image, description, ownerId },
  });
};

// findAll resource bussiness logic
const findAll = async () => {
  return await prisma.resource.findMany({
    include: { owner: true },
  });
};

//finnd single resource bussiness logic
const findResourceById = async (resourceId: string) => {
  const resource = await prisma.resource.findUnique({
    where: { id: resourceId },
  });
  if (!resource)
    throw new ApiError({ message: 'Resource not found', status: 404 });

  return await prisma.resource.findUnique({
    where: { id: resourceId },
    include: { owner: true },
  });
};

const deleteResource = async ({
  resourceId,
  ownerId,
}: iDeleteResourceProps) => {
  const existingResouce = await findResourceById(resourceId);
  if (!existingResouce)
    throw new ApiError({ message: 'Resource not found', status: 404 });
  if (existingResouce.ownerId !== ownerId)
    throw new ApiError({
      message: 'You are not authorized to delete this resource',
      status: 403,
    });
  return await prisma.resource.deleteMany({
    where: { id: resourceId, ownerId },
  });
};

// update resource bussiness logic
const updateResource = async ({
  resourceId,
  ownerId,
  data,
}: iUpdateResourceProps) => {
  const existingResouce = await findResourceById(resourceId);
  if (!existingResouce)
    throw new ApiError({ message: 'Resource not found', status: 404 });
  if (existingResouce.ownerId !== ownerId)
    throw new ApiError({
      message: 'You are not authorized to update this resource',
      status: 403,
    });
  return await prisma.resource.updateMany({
    where: { id: resourceId, ownerId },
    data,
  });
};

export default {
  create,
  findAll,
  findResourceById,
  updateResource,
  deleteResource,
};
