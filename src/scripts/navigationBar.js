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
    
  
