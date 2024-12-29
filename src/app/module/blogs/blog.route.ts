import { Router } from 'express';
import { blogController } from './blog.controller';
import auth from '../../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';

const BlogRouter = Router();

BlogRouter.get('/:id', auth(USER_ROLE.user), blogController.getSingleBlog);

BlogRouter.post('/', auth(USER_ROLE.user), blogController.createBlog);
BlogRouter.get('/', blogController.getBlog);

BlogRouter.patch('/:id', auth(USER_ROLE.user), blogController.getUpdateBlog);
BlogRouter.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  blogController.getDeletedBlog,
);

export default BlogRouter;
