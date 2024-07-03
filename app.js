document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("theme-toggle");
  const body = document.body;

  toggleButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Save the style in local storage
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });

  // Load the style preference on page load
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
  }
});
