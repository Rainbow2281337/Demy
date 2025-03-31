/*
 * Function to initialize the image slider.
 * 
 * This function sets up the slider by selecting necessary DOM elements,
 * creating navigation dots, and adding event listeners for the previous
 * and next buttons. It also sets up an auto-slide feature that moves the
 * slider every 10 seconds.
 *
 * The slider allows the user to manually navigate to specific slides via
 * the dots, or through the next/prev buttons.
 */
export const initializeSlider = () => {
  const sliderTrack = document.querySelector(".slider-track");
  const slides = document.querySelectorAll(".slide");
  const prevButton = document.querySelector(".prev-btn");
  const nextButton = document.querySelector(".next-btn");
  const dotContainer = document.querySelector(".dots-container");
    
  /* 
   * The currentIndex variable keeps track of the currently displayed slide.
   */
  let currentIndex = 0;

  /* 
   * The totalSlides variable stores the total number of slides.
   */
  const totalSlides = slides.length;
  
  /*
   * Create navigation dots dynamically for each slide.
   * 
   * Each dot corresponds to a slide and allows the user to jump directly
   * to the respective slide by clicking on it.
   */
  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
  

    if (index === 0) {
      dot.classList.add("active");
    }
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateSlider(sliderTrack, currentIndex);
    });
  
    dotContainer.appendChild(dot);
  });
  
  /* 
   * Next button click event listener. Moves to the next slide when clicked.
   */
  nextButton.addEventListener("click", () => nextSlide());
    
  /* 
   * Previous button click event listener. Moves to the previous slide when clicked.
   */
  prevButton.addEventListener("click", () => prevSlide());
    
  /*
   * Set an interval to automatically move to the next slide every 10 seconds.
   */
  setInterval(() => nextSlide(), 10000);
  
  /*
   * Function to move to the next slide.
   * 
   * The nextSlide function increments the currentIndex and wraps it around
   * if it exceeds the total number of slides. It then updates the slider's
   * position and the active dot.
   */
  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider(sliderTrack, currentIndex);
  };
  
  /*
   * Function to move to the previous slide.
   * 
   * The prevSlide function decrements the currentIndex and wraps it around
   * if it goes below 0. It then updates the slider's position and the active dot.
   */
  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider(sliderTrack, currentIndex);
  };
};
  
/*
 * Function to update the slider's position and active dot.
 *
 * @sliderTrack - the DOM element that holds the slide track
 * @currentIndex - the current index of the slide to show
 *
 * The function adjusts the transform property of the slider track to show
 * the slide corresponding to the current index. It also updates the active
 * class on the dots to highlight the selected slide.
 */
const updateSlider = (sliderTrack, currentIndex) => {
  sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
  
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
};
  
