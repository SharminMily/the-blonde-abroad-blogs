"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_controller_1 = require("./blog.controller");
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const user_constants_1 = require("../user/user.constants");
const BlogRouter = (0, express_1.Router)();
BlogRouter.get('/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.user), blog_controller_1.blogController.getSingleBlog);
BlogRouter.post('/', (0, auth_1.default)(user_constants_1.USER_ROLE.user), blog_controller_1.blogController.createBlog);
BlogRouter.get('/', blog_controller_1.blogController.getBlog);
BlogRouter.patch('/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.user), blog_controller_1.blogController.getUpdateBlog);
BlogRouter.delete('/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.admin, user_constants_1.USER_ROLE.user), blog_controller_1.blogController.getDeletedBlog);
exports.default = BlogRouter;
