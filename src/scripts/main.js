import { dropdown, changeUserIconHref } from "./navigationBar.js";
import { fetchCourseData, filterCoursesByTag } from "./coursesList.js";
import { initializeSlider } from "./slider.js";

let currentTag = null;

addEventListener("DOMContentLoaded", () => {
  dropdown();
  changeUserIconHref();
  fetchCourseData();
  initializeSlider();

  const filterItems = document.querySelectorAll(".courses-filter-item");
  filterItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const selectedTag = item.getAttribute("data-tag");

      if (currentTag === selectedTag) {
        currentTag = null;
        fetchCourseData();
      } else {
        currentTag = selectedTag;
        filterCoursesByTag(selectedTag);
      }
    });
  });
});
