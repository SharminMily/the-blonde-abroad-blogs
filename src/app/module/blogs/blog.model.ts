import { model, Schema } from 'mongoose';
import { IBlog } from './blog.interface';

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      ref: 'User',
    },

    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

//creating a custom static method
// BlogSchema.statics.isUserExists = async function (id: string) {
//   const existingUser = await BlogSchema.findOne({ id });
//   return existingUser;
// };

const Blog = model<IBlog>('blog', BlogSchema);

export default Blog;
