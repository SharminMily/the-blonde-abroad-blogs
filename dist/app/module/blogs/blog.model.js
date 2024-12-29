"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BlogSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        ref: 'User',
    },
    isPublished: { type: Boolean, default: true },
}, { timestamps: true });
//creating a custom static method
// BlogSchema.statics.isUserExists = async function (id: string) {
//   const existingUser = await BlogSchema.findOne({ id });
//   return existingUser;
// };
const Blog = (0, mongoose_1.model)('blog', BlogSchema);
exports.default = Blog;
