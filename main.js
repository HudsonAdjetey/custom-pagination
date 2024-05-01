const productsContainer = document.querySelector(".products");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const paginationContainer = document.querySelector(".pagination");
const numsPags = document.querySelector(".nums");

// fetch all the images
// / number of items to display on a single page, can be changed as needed
let page = 1;

// fetch data

document.addEventListener("DOMContentLoaded", () => {
  // get total pages from meta tag in html
  let totalPages = 0;
  let page = 2;
  let perPage = page * 10;
  let product = [];

  const fetchData = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();
    if (data && data.products) {
      product = data.products;
      totalPages = Math.ceil(data.total / 10);
      renderProducts();
      renderPagination();
    }
  };

  // a function to render  products into HTML
  const renderProducts = () => {
    // Clear previous products
    productsContainer.innerHTML = "";

    product.forEach((item, id) => {
      const productSingle = document.createElement("div");
      const para = document.createElement("span");
      const img = document.createElement("img");

      productSingle.classList.add("single-product");

      img.src = item.thumbnail;
      para.textContent = `${item.title}`;
      productSingle.appendChild(img);
      productSingle.appendChild(para);

      productSingle.dataset.id = id;
      productsContainer.appendChild(productSingle);
    });
  };

  // a function to render pagination and navigation
  const renderPagination = () => {
    //  clear the existing pagination first
    /*  while (paginationContainer.firstChild) {
      paginationContainer.removeChild(paginationContainer.firstChild);
    } */

    // the prev button
    prevBtn.addEventListener("click", () => {
      prevBtn.className = page > 1 ? "" : "disabled";
      if (page > 1) {
        page--;
        fetchData();
      }
    });
    const numsPags = document.querySelector(".nums");
    // Clear existing pagination numbers
    numsPags.innerHTML = "";
    // the pagination numbers
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("span");
      pageButton.textContent = i;
      pageButton.className = page === i ? "pagination__selected" : "";
      pageButton.addEventListener("click", () => {
        console.log(i); // Log the clicked page number
        page = i; // Update the current page
        fetchData(); // Fetch data for the clicked page
      });
      numsPags.appendChild(pageButton); // Append the page number to the container
    }
  };

  nextBtn.addEventListener("click", () => {
    nextBtn.className = page < 1 ? "" : "disabled";
    if (page <= totalPages) {
      page++;
      fetchData();
    }
  });
  fetchData();
});
