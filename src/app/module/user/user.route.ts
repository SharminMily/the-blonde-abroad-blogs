import { Router } from "express";

import { userController } from "./user.controller";
import auth from "../../../middlewares/auth";
import { USER_ROLE } from "./user.constants";


const userRouter = Router()

userRouter.get('/:id', userController.getSingleUser)

// userRouter.post('/',  userController.createUser)

// userRouter.post('/create-admin',auth("admin"),  userController.createUser)


// userRouter.patch('/:id', userController.getUpdateUser)
// userRouter.delete('/:id', userController.getDeletedUser)


userRouter.get('/',auth(USER_ROLE.admin), userController.getUser)

export default userRouter;
