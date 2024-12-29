"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogValidation = exports.blockUserValidation = void 0;
const zod_1 = require("zod");
exports.blockUserValidation = zod_1.z.object({
    params: zod_1.z.object({
        userId: zod_1.z.string().nonempty('User ID is required'),
    }),
});
exports.deleteBlogValidation = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().nonempty('Blog ID is required'),
    }),
});
