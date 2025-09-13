import { Router } from 'express';
import {
  createResource,
  deleteResource,
  getAllResources,
  getSingleResource,
  updateResource,
} from '../controllers/resource.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
const resourceRouter = Router();
resourceRouter.post('/create', authenticate, createResource); //create resoucrce
resourceRouter.get('/', getAllResources); // get all resources
resourceRouter.get('/:resourceId', getSingleResource); // get sungle resources
resourceRouter.put('/:resourceId', authenticate, updateResource); // update resource
resourceRouter.delete('/:resourceId', authenticate, deleteResource); // delete resource

export { resourceRouter };
