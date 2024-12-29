"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        const search = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.search;
        if (typeof search === 'string') {
            const regex = new RegExp(search, 'i'); // Case-insensitive regex
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: regex },
                })),
            });
        }
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
        const excludeFields = [
            'search',
            'page',
            'limit',
            'sortOrder',
            'sortBy',
            'fields',
        ];
        excludeFields.forEach((field) => delete queryObj[field]);
        if (this.query.filter) {
            queryObj['author'] = this.query.filter; // Explicitly map 'filter' to 'author'
        }
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
    paginate() {
        var _a, _b;
        const page = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const limit = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.limit) || 10;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    sort() {
        var _a, _b;
        let sortStr = '-createdAt'; // Default sorting by createdAt in descending order
        if (((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sortBy) && ((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.sortOrder)) {
            const sortBy = this.query.sortBy;
            const sortOrder = this.query.sortOrder === 'desc' ? '-' : '';
            sortStr = `${sortOrder}${sortBy}`;
        }
        this.modelQuery = this.modelQuery.sort(sortStr);
        return this;
    }
    select() {
        var _a, _b;
        let fields = '-__v';
        if ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.fields) {
            fields = (_b = this.query.fields) === null || _b === void 0 ? void 0 : _b.split(',').join(' ');
        }
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
}
exports.default = QueryBuilder;
