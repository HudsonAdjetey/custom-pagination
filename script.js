// on dom content load

window.addEventListener("DOMContentLoaded", function () {
  // get the various  elements we'll need to work with
  const productsContainer = document.querySelector(".products");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const paginationContainer = document.querySelector(".pagination");
  const numsPags = document.querySelector(".nums");

  let totalPages = 0;
  let page = 1;
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

  // render products in the product container
  const renderProducts = function () {
    // clearing up  any existing child nodes before rendering new ones
    // while (productsContainer.firstChild) {
    //   productsContainer.removeChild(productsContainer.lastChild);
    // }
    productsContainer.innerHTML = "";

    product.forEach((item, id) => {
      const productSingle = document.createElement("div");
      const img = document.createElement("img");
      const para = document.createElement("p");
      productSingle.classList.add("single-product");
      img.src = item.thumbnail;
      para.textContent = item.title;
      productSingle.appendChild(img);
      productSingle.appendChild(para);

      productsContainer.appendChild(productSingle);
    });
  };

  // pagination
  const renderPagination = function () {
    //  first remove all of the previous page numbers

    // previous  button functionality
    prevBtn.addEventListener("click", function () {
      prevBtn.className = page > 1 ? "" : "disabled";

      if (page > 1) {
        page--;
        console.log(page);
        fetchData();
      }
    });

    // next btn

    nextBtn.addEventListener("click", function () {
      nextBtn.className = page < totalPages ? "" : "disabled";

      if (page < totalPages) {
        page++;
        console.log(page);

        fetchData();
      }
    });
    // list of numbers
  };

  fetchData();
});
