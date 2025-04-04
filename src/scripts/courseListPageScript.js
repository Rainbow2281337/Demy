import { fetchData } from "./utils/fetchData.js";

const coursesListContainer = document.querySelector(".courses-list");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const pageNumberDisplay = document.querySelector(".page-number");

/*
 * Current page number.
 */
let CURRENT_PAGE = 1;

/*
 * Items per page are set as constant to be used in the fetchData function.
 */
const ITEMS_PER_PAGE = 10;

/* 
 * Path to the local JSON file containing courses data.
 */
const COURSES_URL = "../../core/DB/courses.json";

/* 
 * This function fetches data 
 * and renders courses info for specified page. Also it updates the page number display.
 * It disables the previous button if on the first page 
 * and disables the next button if there are no more courses to display.
 */
const displayCourses = async (page) => {
  const courses = await fetchData(COURSES_URL, page, ITEMS_PER_PAGE);
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
          <p class="course-price">${course.price}</p>
        </div>
      </div>
    `;
    coursesListContainer.appendChild(courseItem);
  });

  pageNumberDisplay.textContent = `Page ${page}`;
  
  prevBtn.disabled = page === 1;
  nextBtn.disabled = courses.length < ITEMS_PER_PAGE;
};

prevBtn.addEventListener("click", () => {
  if (CURRENT_PAGE > 1) {
    CURRENT_PAGE--;
    displayCourses(CURRENT_PAGE);
  }
});

nextBtn.addEventListener("click", () => {
  CURRENT_PAGE++;
  displayCourses(CURRENT_PAGE);
});

displayCourses(CURRENT_PAGE);
