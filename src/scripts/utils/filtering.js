/**
 * This function filters an array of courses based on the provided price filter.
 * 
 * @param {Object[]} courses - Array of courses to filter.
 * @param {string} priceFilter - The price filter to apply. Can be "all", "low-high", or "high-low".
 * @returns {Object[]} - Filtered courses based on the price filter.
 */
export const filterCoursesByPrice = (courses, priceFilter) => {
  if (priceFilter === "all") {
    return courses;
  }

  return courses.sort((a, b) => {
    const priceA = Number(a.price);
    const priceB = Number(b.price);

    if (priceFilter === "low-high") {
      return priceA - priceB;
    } else {
      return priceB - priceA;
    }
  });
};


/**
 * This function filters an array of courses based on the provided rating filter.
 * 
 * @param {Object[]} courses - Array of courses to filter.
 * @param {string} ratingFilter - The rating filter to apply. Can be "all", "1", "2", "3", "4", or "5".
 * @returns - Filtered courses based on the rating filter.
 */
export const filterCoursesByRating = (courses, ratingFilter) => {
  if (ratingFilter === "all") {
    return courses;
  }
  const rating = parseInt(ratingFilter, 10);

  return courses.filter(course => Math.floor(course.average_rating) === rating);
};

/**
 * This function filters an array of courses based on the provided tag filter.
 * 
 * @param {Object[]} courses - Array of courses to filter.
 * @param {string} tagFilter - The tag filter to apply. Can be "all" or a specific tag.
 * @returns - Filtered courses based on the tag filter.
 */
export const filterCoursesByTag = (courses, tagFilter) => {
  if (tagFilter === "all") {
    return courses;
  }
  return courses.filter(course => course.tags.includes(tagFilter));
};

/**
 * This function filters an array of courses based on the provided total hours filter.
 * 
 * @param {Object[]} courses - Array of courses to filter.
 * @param {number} totalHoursFilter - The total hours filter to apply. Can be "all", "0-20", "21-40", or "40+".
 * @returns - Filtered courses based on the total hours filter.
 */
export const filterCoursesByTotalHours = (courses, totalHoursFilter) => {
  if (totalHoursFilter === "all") {
    return courses;
  }
  return courses.filter(course => {
    const hours = parseFloat(course.total_hours);
    if (totalHoursFilter === "0-20") {
      return hours <= 20;
    }
    if (totalHoursFilter === "21-40") {
      return hours > 20 && hours <= 40;
    }
    if (totalHoursFilter === "40+") {
      return hours > 40;
    }
  });
};

/**
 * This function filters an array of courses based on the provided level filter.
 * 
 * @param {Object[]} courses - Array of courses to filter.
 * @param {string} levelFilter - The level filter to apply. Can be "all", "beginner", "intermediate", or "advanced".
 * @returns - Filtered courses based on the level filter.
 */
export const filterCoursesByLevel = (courses, levelFilter) => {
  if (levelFilter === "all") {
    return courses;
  }
  return courses.filter(course => course.difficulty_level.toLowerCase() === levelFilter);
};
