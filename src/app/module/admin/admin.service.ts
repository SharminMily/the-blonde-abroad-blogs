import User from "../user/user.model";
import Blog from "../blogs/blog.model";
import { IUser } from "../user/user.interface";


const blockUser = async (id: string, data: Partial<IUser>) => {
    if (!data.isBlocked) {
      throw new Error("Invalid request. 'isBlocked' field is required.");
    }
  
    const result = await User.findByIdAndUpdate(
      id,
      { isBlocked: data.isBlocked },
      { new: true }
    );
  
    if (!result) {
      throw new Error("User not found or could not be updated.");
    }
  
    return result;
  };


const deleteBlog = async(id : string) => {
    const result = await Blog.findByIdAndDelete(id);
 return result
}


  export const AdminServices = {
    blockUser ,
    deleteBlog
  };