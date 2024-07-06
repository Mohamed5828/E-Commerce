//navbar samll
const navList = document.querySelector(".nav-list");

document.querySelector(".hamburger").onclick = () => {
  navList.classList.add("show");
};

document.querySelector(".close").onclick = () => {
  navList.classList.remove("show");
};

const body = document.body;
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
}
