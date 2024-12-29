import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { blogServices } from './blog.services';
import Blog from './blog.model';

const createBlog = catchAsync(async (req, res) => {
  const body = req.body;

  const result = await Blog.create(body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'blog Created Successfully',
    data: result,
  });
});

const getBlog = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await blogServices.getBlog(query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'blog getting Successfully',
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await blogServices.getSingleBlog(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'single Blog get successfully',
    data: result,
  });
});

const getUpdateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const result = await blogServices.updateBlog(id, body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Blog update successfully',
    data: result,
  });
});

const getDeletedBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const result = await blogServices.deleteBlog(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blog deleted successfully',
    data: [],
  });
});

export const blogController = {
  createBlog,
  getBlog,
  getSingleBlog,
  getUpdateBlog,
  getDeletedBlog,
};
