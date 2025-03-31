/* 
* Fetches data from the provided URL 
* and returns a subset of the data based on the page and perPage parameters.
*/
export const fetchData = (url, page = 1, perPage = 10) => {
  return fetch(url)
    .then(response => response.json())
    .then((data) => {
      const startIndex = (page - 1) * perPage;
      const endIndex = page * perPage;
      const slicedData = data.slice(startIndex, endIndex);
    
      return slicedData;
    })
    .catch(error => console.error("Error fetching data:", error));
};
