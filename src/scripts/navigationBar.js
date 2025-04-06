/**
 * URL to the profile page.
*/
const PROFILE_URL = "http://127.0.0.1:5500/src/pages/profile.html";
  
/**
 * URL to the login page.
*/
const LOGIN_URL = "http://127.0.0.1:5500/src/pages/login/login.html";

/**
 * This function initializes the navigation bar by adding event listeners to the buttons.
*/
export const dropdown = () => {
  const browseButton = document.querySelector(".browse-button");
  const dropdown = document.querySelector(".dropdown-content");
    
  if (!browseButton || !dropdown) {
    return;
  }
    
  browseButton.addEventListener("mouseenter", () => {
    dropdown.style.display = "block";
  });
    
  browseButton.addEventListener("mouseleave", () => {
    setTimeout(() => {
      if (!dropdown.matches(":hover")) {
        dropdown.style.display = "none";
      }
    }, 200);
  });
    
  dropdown.addEventListener("mouseleave", () => {
    dropdown.style.display = "none";
  });
};

/**
 * This function changes the href attribute of the user icon in the navigation bar.
 * If the user is logged in (email is stored in local storage), it sets the href to the profile page.
*/
export const changeUserIconHref = () => {
  const userIcon = document.querySelector(".nav-buttons a:first-child");
  const userEmail = localStorage.getItem("email");

  if (userEmail) {
    userIcon.setAttribute("href", PROFILE_URL);
  } else {
    userIcon.setAttribute("href", LOGIN_URL);
  }
};
    
  
