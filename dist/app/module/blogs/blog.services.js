"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogServices = void 0;
const querybuilder_1 = __importDefault(require("../../../builder/querybuilder"));
const blog_model_1 = __importDefault(require("./blog.model"));
const createBlog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.create(payload);
    return result;
});
const getBlog = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchableFields = ['title', 'content'];
    const blogs = new querybuilder_1.default(blog_model_1.default.find().populate('author', 'name email'), query || {})
        .search(searchableFields)
        .filter()
        .sort()
        .paginate()
        .select();
    const result = yield blogs.modelQuery;
    return result;
});
const getSingleBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.findById(id);
    return result;
});
const updateBlog = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.findByIdAndUpdate(id, data, {
        new: true,
    }).populate('author', 'name email');
    return result;
});
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.findByIdAndDelete(id);
    return result;
});
exports.blogServices = {
    createBlog,
    getBlog,
    getSingleBlog,
    updateBlog,
    deleteBlog,
};