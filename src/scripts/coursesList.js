import { fetchData } from "./utils/fetchData.js";

/**
 * Page number is set as constant to be used in the fetchCourseData function.
*/
const PAGE_NUMBER = 1;

/** 
 * Items per page are set as constant to be used in the fetchCourseData function.
*/
const ITEMS_PER_PAGE = 10;

/**
 * Path to the JSON file containing course data.
*/
const COURSES_URL = "core/DB/courses.json";

/** 
 * An empty array to store the fetched courses.
*/
let coursesData = [];

/**
 * Function to render the courses on the page.
 * 
 * @param {string[]} courses - Array of course objects.
*/
const renderCourses = (courses) => {
  const coursesList = document.querySelector(".courses-list");
  coursesList.innerHTML = "";

  courses.forEach((course) => {
    const courseElement = document.createElement("li");
    courseElement.classList.add("course-item");
    courseElement.innerHTML = `
      <img src="${course.image}" alt="${course.title}" class="course-image"/>
      <h3 class="course-title">${course.title}</h3>
      <p class="course-instructors">Instructors: ${course.instructor.join(", ")}</p>
      <p class="course-duration">Duration: ${course.duration}</p>
    `;
    coursesList.appendChild(courseElement);
  });
};

/**
 * Function to render a message when no courses are found.
*/
const showNoCoursesMessage = () => {
  const coursesList = document.querySelector(".courses-list");
  coursesList.innerHTML = "<li class=\"no-courses\">No courses found for this category.</li>";
};

/**
 * This function filters the courses based on the selected category.
 * 
 * @param {string} tag - The tag to filter courses by.
*/
export const filterCoursesByTag = async (tag) => {
  try {
    const data = await fetchData("core/DB/courses.json");
    const filteredCourses = data.filter(course => course.tags.includes(tag));

    if (filteredCourses.length === 0) {
      showNoCoursesMessage();
    } else {
      renderCourses(filteredCourses);
    }
  } catch (error) {
    console.error("Error filtering courses:", error);
  }
};

/**
 * Function to fetch the course data from the JSON file
 * 
 * @param {string} url - URL of the JSON file to fetch data from.
 * @param {string} page - Page number to fetch data for.
 * @param {number} coursesPerPage - Number of courses to fetch per page.
 * @remarks
 *
 * The function takes two parameters: page and coursesPerPage
 * and calls utils function to fetch data from a JSON file.
 * Called function takes the URL of the JSON file, page number and items per page as parameters.
 * It then fetches the data from the JSON file and populates the coursesList with data. 
*/
export const fetchCourseData = (
  url = COURSES_URL,
  page = PAGE_NUMBER,
  coursesPerPage = ITEMS_PER_PAGE
) => {

  fetchData(url, page, coursesPerPage)
    .then((data) => {
      coursesData = data;
      renderCourses(coursesData);
    })
    .catch((error) => {
      console.error("Error fetching courses:", error);
    });
};
