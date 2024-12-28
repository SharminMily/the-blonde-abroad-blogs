import { FilterQuery, Query } from "mongoose"

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>
    public query: Record<string, unknown>
    
    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
      this.modelQuery = modelQuery
      this.query = query
    }
  
    search(searchableFields: string[]) {
        const search = this?.query?.search;
      
        if (typeof search === 'string') {
          const regex = new RegExp(search, 'i'); // Case-insensitive regex
          this.modelQuery = this.modelQuery.find({
            $or: searchableFields.map(field => ({
              [field]: { $regex: regex },
            })),
          } as FilterQuery<T>);
        }
  
      return this
    }
  
    filter() {
      const queryObj = { ...this.query };
      const excludeFields = ['search', 'page', 'limit', 'sortOrder', 'sortBy', 'fields'];
  
      excludeFields.forEach(field => delete queryObj[field]);
  
      if (this.query.filter) {
        queryObj['author'] = this.query.filter; // Explicitly map 'filter' to 'author'
      }
  
      this.modelQuery = this.modelQuery.find(queryObj);
      return this;
    }
  
    paginate() {
      const page = Number(this?.query?.page) || 1;
      const limit = Number(this?.query?.limit) || 10;
      const skip = (page - 1) * limit;
  
      this.modelQuery = this.modelQuery.skip(skip).limit(limit);
      return this;
    }
  
  
    sort() {
      let sortStr = '-createdAt'; // Default sorting by createdAt in descending order
  
      if (this?.query?.sortBy && this?.query?.sortOrder) {
        const sortBy = this.query.sortBy as string;
        const sortOrder = this.query.sortOrder === 'desc' ? '-' : '';
        sortStr = `${sortOrder}${sortBy}`;
      }
  
      this.modelQuery = this.modelQuery.sort(sortStr);
      return this;
    }
  
   
  select() {
    let fields = '-__v';

    if (this?.query?.fields) {
      fields = (this.query.fields as string)?.split(',').join(' ');
    }

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}
  
  
  export default QueryBuilder;