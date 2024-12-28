// import { Request, Response } from "express";
import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";

import { AdminServices } from "./admin.service";
import httpStatus from 'http-status-codes';


const blockUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;
  
    // Call the admin service to block the user
    const result = await AdminServices.blockUser(id, body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: "User blocked successfully",
      data: result,
    });
  });
  

const getDeletedBlog= catchAsync(async(req, res) => {
    const{ id }= req.params 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const result = await AdminServices.deleteBlog(id)

    sendResponse(res, {
        statusCode : httpStatus.OK,
        message: 'Blog deleted successfully',
        data: []
    })
})

  export const AdminControllers = {
    blockUser,
    getDeletedBlog   

  };