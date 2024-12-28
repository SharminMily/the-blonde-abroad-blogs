/* eslint-disable no-unused-vars */
export interface IAdminService {
    blockUser(userId: string): Promise<void>;
    deleteBlog(blogId: string): Promise<void>;
  }