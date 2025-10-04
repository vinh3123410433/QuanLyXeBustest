const { Op } = require('sequelize');

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: items } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    totalItems,
    items,
    totalPages,
    currentPage,
    hasNextPage: currentPage < totalPages - 1,
    hasPrevPage: currentPage > 0,
    nextPage: currentPage < totalPages - 1 ? currentPage + 1 : null,
    prevPage: currentPage > 0 ? currentPage - 1 : null
  };
};

const buildSearchQuery = (searchFields, searchTerm) => {
  if (!searchTerm || !searchFields.length) {
    return {};
  }

  const searchConditions = searchFields.map(field => ({
    [field]: {
      [Op.iLike]: `%${searchTerm}%`
    }
  }));

  return {
    [Op.or]: searchConditions
  };
};

const buildSortQuery = (sort) => {
  if (!sort) {
    return [['createdAt', 'DESC']];
  }

  const sortParts = sort.split(',');
  return sortParts.map(part => {
    const [field, direction = 'ASC'] = part.split(':');
    return [field, direction.toUpperCase()];
  });
};

const buildFilterQuery = (filters) => {
  const query = {};
  
  Object.keys(filters).forEach(key => {
    const value = filters[key];
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        query[key] = { [Op.in]: value };
      } else if (typeof value === 'string' && value.includes(',')) {
        query[key] = { [Op.in]: value.split(',') };
      } else {
        query[key] = value;
      }
    }
  });

  return query;
};

const buildDateRangeQuery = (startDate, endDate, field = 'createdAt') => {
  const query = {};
  
  if (startDate || endDate) {
    query[field] = {};
    
    if (startDate) {
      query[field][Op.gte] = new Date(startDate);
    }
    
    if (endDate) {
      query[field][Op.lte] = new Date(endDate);
    }
  }
  
  return query;
};

module.exports = {
  getPagination,
  getPagingData,
  buildSearchQuery,
  buildSortQuery,
  buildFilterQuery,
  buildDateRangeQuery
};