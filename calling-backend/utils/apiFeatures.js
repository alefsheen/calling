class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = [
      "page",
      "sort",
      "limit",
      "fields",
      "open",
      "search",
    ];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Handle fields where values are comma-separated (e.g., key=value1,value2)
    for (const key in queryObj) {
      if (queryObj[key].includes(",")) {
        queryObj[key] = { $in: queryObj[key].split(",") }; // Use $in operator to match any of the values
      }
    }

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);

    // Replace comparison operators like gte, gt, lte, lt
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  search(Model) {
    if (this.queryString.search) {
      const searchQuery = this.queryString.search;
      const searchConditions = [];

      // Iterate over all fields of the model schema
      const schemaFields = Object.keys(Model.schema.paths);

      // Generate search condition for each string field in the schema
      schemaFields.forEach((field) => {
        const fieldType = Model.schema.paths[field].instance;

        // Only apply $regex to string fields
        if (
          field !== "__v" &&
          field !== "createdAt" &&
          field !== "updatedAt" &&
          fieldType === "String" // Only apply regex to String fields
        ) {
          const condition = {};
          condition[field] = { $regex: searchQuery, $options: "i" }; // case-insensitive search
          searchConditions.push(condition);
        }
      });

      if (searchConditions.length > 0) {
        this.query = this.query.find({ $or: searchConditions });
      }
    }

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1;
    if (!limit) return this;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  populate() {
    const field = this.queryString.open;
    if (!field) return this;

    this.query = this.query.populate(field);

    return this;
  }
}
module.exports = APIFeatures;
