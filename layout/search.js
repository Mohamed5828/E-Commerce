// export const handleSearch = (event) => {
//   event.preventDefault();
//   const searchInput = event.target.querySelector(".search-input-important");
//   const query = searchInput.value.trim();
//   if (query) {
//     const urlParams = new URLSearchParams(window.location.search);
//     urlParams.set("query", query);
//     urlParams.set("page", 1);
//     window.location.href = `${
//       window.location.pathname
//     }?${urlParams.toString()}`;
//   }
// };
export const handleSearch = (event) => {
  event.preventDefault();
  const searchInput = event.target.querySelector(".search-input-important");
  const query = searchInput.value.trim();
  if (query) {
    const urlParams = new URLSearchParams();
    urlParams.set("query", query);
    urlParams.set("page", 1);
    window.location.href = `http://127.0.0.1:5500/layout/products.html?${urlParams.toString()}`;
  }
};
