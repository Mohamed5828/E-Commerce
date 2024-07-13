let slideIndex = 0;
let slides = document.getElementsByClassName("slide");
showSlides();
let slideInterval = setInterval(showSlides, 5000);

function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
}

function plusSlides(n) {
  clearInterval(slideInterval);
  slideIndex += n;

  if (slideIndex < 1) {
    slideIndex = slides.length;
  } else if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
  slideInterval = setInterval(showSlides, 5000);
}

fetch("https://dummyjson.com/products/categories")
  .then((res) => res.json())
  .then((data) => {
    const categoriesSlider = document.getElementById("categories-slider");
    data.forEach((category) => {
      const categoryItem = document.createElement("div");
      categoryItem.className = "category-item";
      categoryItem.textContent = category.name;
      console.log(category);
      categoriesSlider.appendChild(categoryItem);
    });

    categoriesSlider.scrollTo({
      left: 0,
      behavior: "smooth",
    });

    let intervalId;
    const startScrolling = () => {
      intervalId = setInterval(() => {
        categoriesSlider.scrollBy({
          left: categoriesSlider.offsetWidth,
          behavior: "smooth",
        });
      }, 5000);
    };

    const stopScrolling = () => {
      clearInterval(intervalId);
    };

    categoriesSlider.addEventListener("mouseenter", stopScrolling);
    categoriesSlider.addEventListener("mouseleave", startScrolling);

    startScrolling();
  });
