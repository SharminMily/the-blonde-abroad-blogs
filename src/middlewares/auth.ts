import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken"
import User from "../app/module/user/user.model";

const auth=(...requiredRole: string[]) => {
   return catchAsync(async(req:Request, res: Response, next:NextFunction) => {

        const authHeader = req.headers.authorization;

        // Check if the Authorization header is provided
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error ("You are not authorized");      
    }

    // Extract token from the Authorization header
    const token = authHeader.split(" ")[1];

        // if(!token){
        //     throw new Error ('You are not Authorized')
        // }
    const decoded = jwt.verify(token, "secret") as JwtPayload 
    const {email, role} = decoded;

    const user = await User.findOne({email})
    if(!user){
        throw new Error("user not found")
    }  

    // Check if the user is blocked
    if (user.isBlocked) {
      throw new Error("User is blocked" );     
    }

    if (requiredRole.length && !requiredRole.includes(role)) {
        throw new Error(
          'You are not authorized',
        );
      }
      

    req.user = decoded as JwtPayload
  next()
    })
}

export default auth;