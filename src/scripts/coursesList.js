import { fetchData } from "./utils/fetchData.js";

/*
 * Page number is set as constant to be used in the fetchCourseData function.
 */
const PAGE_NUMBER = 1;

/*
 * Items per page are set as constant to be used in the fetchCourseData function.
 */
const ITEMS_PER_PAGE = 8;

/*
 * An empty array to store the fetched courses.
 */
const coursesList = [];

/*
 * Function to render the courses on the page.
 */
const renderCourses = (courses) => {
  const coursesList = document.querySelector(".courses-list");

  coursesList.innerHTML = "";
  courses.forEach((course) => {
    const courseElement = document.createElement("li");
    courseElement.classList.add("course-item");
    courseElement.innerHTML = `
          <img src="${course.image}" alt="${
  course.title
}" class="course-image"/>
          <h3 class="course-title">${course.title}</h3>
          <p class="course-instructors">Instructors: ${course.instructor.join(
    ", "
  )}</p>
          <p class="course-duration">Duration: ${course.duration}</p>
        `;
    coursesList.appendChild(courseElement);
  });
};

/*
 * Function to fetch the course data from the JSON file.
 *
 * @params - page and coursesPerPage
 *
 * The function takes two parameters: page and coursesPerPage
 * and calls utils function to fetch data from a JSON file.
 * Called function takes the URL of the JSON file, page number and items per page as parameters.
 * It then fetches the data from the JSON file and populates the coursesList with data.
 */
export const fetchCourseData = (
  page = PAGE_NUMBER,
  coursesPerPage = ITEMS_PER_PAGE
) => {
  const url = "core/DB/courses.json";

  fetchData(url, page, coursesPerPage)
    .then((data) => {
      renderCourses(data);
    })
    .catch((error) => {
      console.error("Error fetching courses:", error);
    });
};
