import QueryBuilder from "../../../builder/querybuilder";
import { IBlog } from "./blog.interface";
import Blog from "./blog.model";

const createBlog = async(payload: IBlog) => {
    const result = await Blog.create(payload)
    return result
}

const getBlog = async(query: Record<string, unknown>) => {

    const searchableFields = ["title", "content"];

    const blogs = new QueryBuilder(
        Blog.find().populate('author', 'name email'),
        query || {}
      )
        .search(searchableFields)
        .filter()
        .sort()
        .paginate()
        .select();
    const result = await blogs.modelQuery;
  
 return result
}

const getSingleBlog = async(id : string) => {
    const result = await Blog.findById(id);
 return result
}

const updateBlog = async(id : string, data: IBlog) => {
    const result = await Blog.findByIdAndUpdate(id, data, {
        new: true,
    }).populate('author','name email');
 return result
}

const deleteBlog = async(id : string) => {
    const result = await Blog.findByIdAndDelete(id);
 return result
}



export const blogServices = {
    createBlog,
    getBlog,
    getSingleBlog,
    updateBlog,
    deleteBlog
}