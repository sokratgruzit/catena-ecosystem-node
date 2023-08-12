// utilities/pagination.js

export const paginateResults = async (model, query, page = 1, limit = 10) => {
  try {
      page = parseInt(page, 10);
      limit = parseInt(limit, 10);
  
      if (!page || isNaN(page) || page < 1) {
        page = 1;
      }
      if (!limit || isNaN(limit) || limit < 1) {
        limit = 10;
      }
  
      const skipCount = (page - 1) * limit;
  
      const results = await model.find(query)
        .skip(skipCount)
        .limit(limit)
        .exec();
  
      const totalCount = await model.countDocuments(query);
      const totalPages = Math.ceil(totalCount / limit);
  
      return {
        results,
        totalPages,
        currentPage: page,
      };
    } catch (error) {
      throw error;
    }
  };
  