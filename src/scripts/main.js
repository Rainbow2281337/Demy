import { dropdown, changeUserIconHref } from "./navigationBar.js";
import { fetchCourseData, filterCoursesByTag, searchCourses } from "./coursesList.js";
import { initializeSlider } from "./slider.js";

let currentTag = null;

addEventListener("DOMContentLoaded", () => {
  dropdown();
  changeUserIconHref();
  fetchCourseData();
  initializeSlider();
  
  const filterItems = document.querySelectorAll(".courses-filter-item");

  /**
   * Event listener for filter items.
   * When a filter item is clicked, it shows the courses based on the selected tag.
  */
  filterItems.forEach(item => {
    item.addEventListener("click", async (e) => {
      e.preventDefault();
      const selectedTag = item.getAttribute("data-tag");

      if (currentTag === selectedTag) {
        currentTag = null;
        fetchCourseData();
      } else {
        currentTag = selectedTag;
        await filterCoursesByTag(selectedTag);
      }
    });
  });

  const searchInput = document.querySelector(".nav-search input");
  const searchButton = document.querySelector(".nav-search button");

  searchButton.addEventListener("click", () => {
    const query = searchInput.value;
    searchCourses(query);
  });
  
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchCourses(searchInput.value);
    }
  });
});
