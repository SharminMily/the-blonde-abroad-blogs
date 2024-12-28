import { Router } from "express";
import validateRequest from "../../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { UserValidation } from "../user/user.validation";
import { AuthControllers } from "./auth.controller";

const authRouter = Router();


authRouter.post('/register', validateRequest(UserValidation.userValidationSchema), AuthControllers.register);
authRouter.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthControllers.login);

// authRouter.post('/register', validateRequest(UserValidation.userValidationSchema), AuthControllers.register);
// authRouter.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthControllers.login);



export default authRouter;