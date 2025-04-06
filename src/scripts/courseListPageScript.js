import { fetchAllData } from "./utils/fetchData.js";
import { 
  filterCoursesByPrice, 
  filterCoursesByRating, 
  filterCoursesByTag, 
  filterCoursesByTotalHours, 
  filterCoursesByLevel 
} from "./utils/filtering.js";

const coursesListContainer = document.querySelector(".courses-list");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const pageNumberDisplay = document.querySelector(".page-number");
const priceFilter = document.getElementById("price");
const ratingFilter = document.getElementById("rating");
const tagsFilter = document.getElementById("tags");
const hoursFilter = document.getElementById("hours");
const difficultyFilter = document.getElementById("difficulty");


/** 
 * Current page number.
*/
let CURRENT_PAGE = 1;

/**
 * Items per page are set as constant to be used in the fetchData function.
*/
const ITEMS_PER_PAGE = 10;  // Show 10 courses per page

/**
 * Path to the local JSON file containing courses data.
*/
const COURSES_URL = "../../core/DB/courses.json";

/** 
 * An empty array to store the fetched courses.
*/
let allCourses = [];

/** 
 * An empty array to store the courses displayed on the current page.
*/
let displayedCourses = [];

/**
 * This function renders the courses on the page.
 * 
 * @param {string[]} courses - The array of courses to be rendered.
*/
const renderCourses = (courses) => {
  coursesListContainer.innerHTML = "";

  courses.forEach(course => {
    const courseItem = document.createElement("li");
    courseItem.classList.add("course-item");
    courseItem.innerHTML = `
      <div class="course-card">
        <div class="course-image">
          <img src="../../${course.image}" alt="${course.title}" />
        </div>
        <div class="course-info">
          <h2 class="course-title">${course.title}</h2>
          <p class="course-description">${course.description}</p>
          <p class="course-instructors">${course.instructor.join(", ")}</p>
          <div class="course-rating-container">
            <span class="course-rating">${course.average_rating} stars</span>
            <span class="course-students">(${course.total_students})</span>
          </div>
          <div class="course-meta">
            <span class="course-duration">${course.duration}</span>
            <span class="course-lectures">${course.lectures} lectures</span>
            <span class="course-difficulty">${course.difficulty_level}</span>
          </div>
          <p class="course-price">$${course.price}</p>
        </div>
      </div>
    `;
    coursesListContainer.appendChild(courseItem);
  });
};

/** 
 * This function filters the displayed courses based on the selected filters.
 * It updates the displayed courses and renders them.
*/
const filterDisplayedCourses = () => {
  let filteredCourseData = [...displayedCourses];

  filteredCourseData = filterCoursesByRating(filteredCourseData, ratingFilter.value);
  filteredCourseData = filterCoursesByTag(filteredCourseData, tagsFilter.value);
  filteredCourseData = filterCoursesByTotalHours(filteredCourseData, hoursFilter.value);
  filteredCourseData = filterCoursesByLevel(filteredCourseData, difficultyFilter.value);
  filteredCourseData = filterCoursesByPrice(filteredCourseData, priceFilter.value);

  renderCourses(filteredCourseData);
};

/**
 * This function paginates the courses based on the current page.
 * It calculates the start and end indices for slicing the courses array
 * and updates the displayed courses accordingly.
 * 
 * @param {string[]} courses - The array of courses to be paginated.
 * @param {number} page - The current page number. 
*/
const paginateCourses = (courses, page) => {
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  displayedCourses = courses.slice(start, end);

  filterDisplayedCourses();

  pageNumberDisplay.textContent = `Page ${page}`;
  prevBtn.disabled = page === 1;
  nextBtn.disabled = end >= courses.length;
};

/**
 * This function fetches all courses data from the JSON file 
 * and initializes the pagination and filtering.
*/
fetchAllData(COURSES_URL).then(data => {
  allCourses = data;
  paginateCourses(allCourses, CURRENT_PAGE);
});

/**
 * Event listeners for filter changes.
 * When a filter is changed, the current page is reset to 1 
 * and the courses are re-paginated and filtered accordingly.
*/
[priceFilter, ratingFilter, tagsFilter, hoursFilter, difficultyFilter].forEach(filter => {
  filter.addEventListener("change", () => {
    CURRENT_PAGE = 1;
    paginateCourses(allCourses, CURRENT_PAGE);
  });
});

prevBtn.addEventListener("click", () => {
  if (CURRENT_PAGE > 1) {
    CURRENT_PAGE--;
    paginateCourses(allCourses, CURRENT_PAGE);
  }
});

nextBtn.addEventListener("click", () => {
  if (CURRENT_PAGE * ITEMS_PER_PAGE < allCourses.length) {
    CURRENT_PAGE++;
    paginateCourses(allCourses, CURRENT_PAGE);
  }
});
