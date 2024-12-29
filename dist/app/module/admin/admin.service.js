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
exports.AdminServices = void 0;
const user_model_1 = __importDefault(require("../user/user.model"));
const blog_model_1 = __importDefault(require("../blogs/blog.model"));
const blockUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data.isBlocked) {
        throw new Error("Invalid request. 'isBlocked' field is required.");
    }
    const result = yield user_model_1.default.findByIdAndUpdate(id, { isBlocked: data.isBlocked }, { new: true });
    if (!result) {
        throw new Error('User not found or could not be updated.');
    }
    return result;
});
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.findByIdAndDelete(id);
    return result;
});
exports.AdminServices = {
    blockUser,
    deleteBlog,
};
