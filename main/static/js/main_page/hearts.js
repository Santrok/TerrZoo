let hearts = document.querySelectorAll(".slider__item-hearts");
const heartsArr = JSON.parse(localStorage.getItem("heartsProduct")) || [];
const productList = document.querySelector(".products__list");
if(localStorage.getItem("heartsProduct") === null) {
    localStorage.setItem("heartsProduct", JSON.stringify(heartsArr));
}
hearts?.forEach((item) => {
  for (let i of JSON.parse(localStorage.getItem("heartsProduct"))) {
    if (i.id === item.parentElement.dataset.id) {
      item.classList.add("slider__item-hearts-active");
    }
  }
});

/**
 * Function to toggle the active class of a heart icon and update the
 * heartsProduct array in localStorage.
 * 
 * @param {Event} e - The event object of the click event.
 * @param {Element} item - The heart icon element.
 */
function heartFunc(e, item) {
  // Toggle the active class of the heart icon.
  item.classList.toggle("slider__item-hearts-active");

  // Get the heartsProduct array from localStorage.
  const heartsProduct = JSON.parse(localStorage.getItem("heartsProduct"));

  // Iterate through the heartsProduct array to find the product with the
  // same id as the clicked heart icon.
  for (let i of heartsProduct) {
    if (i.id === e.currentTarget.parentElement.dataset.id) {
      // If the product is found, remove it from the array and update
      // localStorage.
      heartsArr.splice(heartsProduct.indexOf(i), 1);

      // If the page is the wishlist page, remove the product from the DOM.
      if(window.location.href === 'http://127.0.0.1:8000/wishlist/') {
        item.parentElement.parentElement.remove()
      }

      localStorage.setItem("heartsProduct", JSON.stringify(heartsArr));

      // Exit the function after removing the product.
      return;
    }
  }

  // If the heart icon has the active class, add the product to the
  // heartsProduct array.
  if (item.classList.contains("slider__item-hearts-active")) {
    let heartsWeight = [];

    // Get the weights of the product and add them to the heartsWeight array.
    for (let i of e.currentTarget.parentElement?.children[2]?.children) {
      heartsWeight.push(i.textContent.trim());
    }

    // Add the product to the heartsProduct array.
    heartsArr.push({
      id: e.currentTarget.parentElement.dataset.id,
      src: e.currentTarget.parentElement.children[0].children[0].src,
      link: e.currentTarget.parentElement.children[1].href,
      title: e.currentTarget.parentElement.children[1].textContent.trim(),
      weight: heartsWeight,
      price: {
        old: e.currentTarget?.parentElement?.children[3]?.children[0]?.children[0]?.children[0]?.textContent.trim(),
        new: e.currentTarget?.parentElement?.children[3]?.children[0]?.children[0]?.children[1]?.children[0]
          ?.textContent.trim(),
      },
      promotion:
        e.currentTarget.parentElement?.children[4]?.classList.contains("products___item-promotion") ||
        e.currentTarget.parentElement.children[4].classList.contains("slider__item-promotion")
          ? true
          : false,
    });
  }

  // Update the heartsProduct array in localStorage.
  localStorage.setItem("heartsProduct", JSON.stringify(heartsArr));
}

  hearts.forEach((item) => {
    item.addEventListener("click", (e) => heartFunc(e, item));
  });

if (productList && window.location.href !== 'http://127.0.0.1:8000/wishlist/') {
  new MutationObserver((mutation) => {
    hearts = document.querySelectorAll(".slider__item-hearts");
    hearts.forEach((item) => {
      item.addEventListener("click", (e) => {
        heartFunc(e, item);
      });
      for (let i of JSON.parse(localStorage.getItem("heartsProduct"))) {
        if (i.id === item.parentElement.dataset.id) {
          item.classList.add("slider__item-hearts-active");
        }
      }
    });
  }).observe(productList, {
    childList: true,
    subtree: true,
  });
}
