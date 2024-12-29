"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const user_constants_1 = require("./user.constants");
const userRouter = (0, express_1.Router)();
userRouter.get('/:id', user_controller_1.userController.getSingleUser);
// userRouter.post('/',  userController.createUser)
// userRouter.post('/create-admin',auth("admin"),  userController.createUser)
// userRouter.patch('/:id', userController.getUpdateUser)
// userRouter.delete('/:id', userController.getDeletedUser)
userRouter.get('/', (0, auth_1.default)(user_constants_1.USER_ROLE.admin), user_controller_1.userController.getUser);
exports.default = userRouter;
