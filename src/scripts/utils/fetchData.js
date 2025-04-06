/**
 * Fetches data from the provided URL
 * 
 * @param {string} url - The URL to fetch data from.
 * @param {number} page - The page number to fetch.
 * @param {number} perPage - The number of items to fetch per page.
 * @returns - A promise that resolves to the fetched data.
*/
export const fetchData = async (url, page = 1, perPage = 10) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;
    const slicedData = data.slice(startIndex, endIndex);
    
    return slicedData;
  } catch (error) {
    return console.error("Error fetching data:", error);
  }
};

/**
 * Fetches all data from the provided URL.
 * 
 * @param {string} url - The URL to fetch data from.
 * @returns - A promise that resolves to the fetched data.
*/
export const fetchAllData = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    return console.error("Error fetching data:", error);
  }
};
