
/**
 * URL to fetch users data. 
*/
const USERS_URL = "../../core/DB/users.json";

/**
 * URL to the main page after successful login.
*/
const MAIN_PAGE_URL = "http://127.0.0.1:5500/src/index.html";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".auth-form");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
  
  /**
   * This function sets user data into local storage.
   * It stores the user's ID, name, email, and course preferences.
   * 
   * @param {*} data - The user data to be stored in local storage. 
  */
  const setDataIntoLocalStorage = (data) => {
    localStorage.setItem("id", data.id);
    localStorage.setItem("user_name", data.user_name);
    localStorage.setItem("email", data.email);
    localStorage.setItem("coursePreferences", JSON.stringify(data.coursePreferences));
  };
  

  /**
   * This function validates the form inputs. It checks if the email and password fields are filled.
   * 
   * @param {string} email - The email entered by the user.
   * @param {string} password - The password entered by the user.
   * @returns - Returns true if the form is valid, otherwise false.
  */
  const validateForm = (email, password) => {
    if (!email || !password) {
      alert("Please fill in all fields.");
      return false;
    }
    return true;
  };
  
  /**
   * This function fetches user data from the provided URL.
   * 
   * @returns - A promise that resolves to the fetched user data.
  */
  const fetchData = async () => {
    try {
      const response = await fetch(USERS_URL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data. Please try again later.");
    }
  };
  
  /**
   * This function handles the form submission.
   * 
   * @param {*} event 
   * @remarks
   * It prevents the default form submission behavior, validates the inputs,
   * fetches user data, and checks if the entered email and password match any user.
   * If a match is found, it stores the user data in local storage and redirects to the main page.
   * If no match is found, it alerts the user about invalid credentials.
  */
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
  
    if (!validateForm(email, password)) {
      return;
    }
  
    const users = await fetchData();
    if (!users) {return;}
  
    const user = users.find((user) => user.email === email && user.password === password);
  
    if (user) {
      setDataIntoLocalStorage(user);
      window.location.href = MAIN_PAGE_URL;
    } else {
      alert("Invalid email or password.");
    }
  };
  
  form.addEventListener("submit", handleFormSubmit);
});
  
