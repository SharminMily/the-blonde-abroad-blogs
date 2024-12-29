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
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../app/module/user/user.model"));
const auth = (...requiredRole) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        // Check if the Authorization header is provided
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error('You are not authorized');
        }
        // Extract token from the Authorization header
        const token = authHeader.split(' ')[1];
        // if(!token){
        //     throw new Error ('You are not Authorized')
        // }
        const decoded = jsonwebtoken_1.default.verify(token, 'secret');
        const { email, role } = decoded;
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            throw new Error('user not found');
        }
        // Check if the user is blocked
        if (user.isBlocked) {
            throw new Error('User is blocked');
        }
        if (requiredRole.length && !requiredRole.includes(role)) {
            throw new Error('You are not authorized');
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
