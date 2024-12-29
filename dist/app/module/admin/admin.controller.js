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
exports.AdminControllers = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const admin_service_1 = require("./admin.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const blockUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const body = req.body;
    // Call the admin service to block the user
    const result = yield admin_service_1.AdminServices.blockUser(id, body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        message: 'User blocked successfully',
        data: result,
    });
}));
const getDeletedBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const result = yield admin_service_1.AdminServices.deleteBlog(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        message: 'Blog deleted successfully',
        data: [],
    });
}));
exports.AdminControllers = {
    blockUser,
    getDeletedBlog,
};
