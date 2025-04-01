import { dropdown, changeUserIconHref } from "./navigationBar.js";
import { fetchCourseData } from "./coursesList.js";
import { initializeSlider } from "./slider.js";

addEventListener("DOMContentLoaded", () => {
  dropdown();
  changeUserIconHref();
  fetchCourseData();
  initializeSlider();
});
