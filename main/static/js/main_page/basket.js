const sliderItemBasketBtnMain = document.querySelectorAll(".slider__item-basket");
const headerBottomBasketCountMain = document.querySelector(".header__bottom-basket > p");
const headerBottomBasketValueMobMain = document.querySelector(".header__bottom-basket-value");
const headerBottomHoverList = document.querySelector(".header__bottom-basket-hover-list");
const headerBottomHover = document.querySelector(".header__bottom-basket-hover");
const productsList = document.querySelector(".products__list");
let productItemBtn = document.querySelectorAll(".products___item-basket");
let sliderItemWeightList = document.querySelectorAll(".slider__item-weight-list-item");
const aboutProductBtn = document.querySelector(".about__product-basket-btn");
const aboutProductAction = document.querySelector(".about__product-action");
const yourWeightBtn = document.querySelector(".about__product-your-weight-hide button");
const aboutProductWeightSpan = document.querySelector(".about__product-price-weight span");
const viewProduct = document.querySelector(".popular__goods-slider");
const wrapper = document.querySelector('.wrapper')
localStorage.setItem('baseUrl', wrapper.dataset.url)

console.log(window.location.href !== `${localStorage.getItem('baseUrl')}/placing_an_order/`);
if(window.location.href !== `${localStorage.getItem('baseUrl')}/placing_an_order/`){
  localStorage.removeItem('oneClickItem')
}
// slider item weight list click
sliderItemWeightList.forEach((item) => {
  item.addEventListener("click", (e) => {
    sliderItemWeightList.forEach((el) => {
      if (el.classList.contains("slider__item-weight-list-item-active")) {
        el.classList.remove("slider__item-weight-list-item-active");
      }
    });
    item.classList.add("slider__item-weight-list-item-active");
    if (
      e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].children[0].classList.contains(
        "slider___item-price-promotion"
      ) ||
      e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].children[0].classList.contains(
        "products___item-price-promotion"
      )
    ) {
      localStorage.setItem(
        "pricePerOneKg",
        e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].children[1].children[0].dataset
          .priceperonekg
      );
      e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].children[1].children[0].textContent =
        parseFloat(e.currentTarget.dataset.weightPrice.split(",").join(".")).toFixed(2);
      localStorage.setItem(
        "buyOneClickPrice",
        parseFloat(e.currentTarget.dataset.weightPrice.split(",").join(".")).toFixed(2)
      );
    } else {
      localStorage.setItem(
        "pricePerOneKg",
        e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].children[0].dataset
          .priceperonekg
      );
      e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].children[0].textContent =
        parseFloat(e.currentTarget.dataset.weightPrice.split(",").join(".")).toFixed(2);
      localStorage.setItem(
        "buyOneClickPrice",
        parseFloat(e.currentTarget.dataset.weightPrice.split(",").join(".")).toFixed(2)
      );
    }
  });
});
if (aboutProductWeightSpan) {
  localStorage.setItem(
    "optionWeight",
    " " + aboutProductWeightSpan.textContent.trim().split(" ").splice(1, 1).join("")
  );
}

let count = localStorage.getItem("basket") ? JSON.parse(localStorage.getItem("basket")).length : 0;
headerBottomBasketCountMain.textContent = count;
let basketArrayObj = [];

/**
 * Sets the count of items in the basket in the DOM and in localStorage.
 * This function is called when the page loads and also when an item is
 * added or removed from the basket.
 */
function setCountInBasket() {
  // Check if there are any items in the basket
  if (localStorage.getItem("basket") === null) {
    return;
  }

  // Get the length of the basket array from localStorage
  count = JSON.parse(localStorage.getItem("basket"))?.length;

  // Update the text content of the basket count element in the DOM
  headerBottomBasketCountMain.textContent = count;

  // Update the text content of the basket count element for mobile view in the DOM
  headerBottomBasketValueMobMain.textContent = count;
}
setCountInBasket();

/**
 * A function that updates the count of an item in the basket based on the button clicked.
 *
 * @param {Event} e - The event object containing information about the click event.
 * @return {void} This function does not return anything.
 */
function setCountItem(e) {
  if (e.target.tagName === "BUTTON") {
    if (e.target.classList.contains("minus")) {
      basketArrayObj = JSON.parse(localStorage.getItem("basket"));
      for (let i of basketArrayObj) {
        if (
          i.id === e.target.parentElement.parentElement.parentElement.parentElement.dataset.id &&
          e.target.parentElement.parentElement.parentElement.parentElement.children[0].children[1].children[1].children[0].textContent.trim() ===
            i.weight.join("")
        ) {
          if (i.count <= 1) {
            e.target.parentElement.parentElement.parentElement.parentElement.remove();
            basketArrayObj.includes(i) ? basketArrayObj.splice(basketArrayObj.indexOf(i), 1) : "";
          }
          e.target.parentElement.parentElement.parentElement.children[1].children[2].children[0].textContent = (
            +e.target.parentElement.parentElement.parentElement.children[1].children[2].children[0].textContent.trim() -
            +parseFloat(i.weight.join("").split(" ").splice(0, 1).join("").split(",").join("."))
          ).toFixed(1);
          i.count -= 1;
          i.initPrice === 0 ? (i.initPrice = i.price) : 0;
          i.price = Number(i.price - i.initPrice);
          e.target.parentElement.parentElement.children[1].textContent =
            (Math.floor(i.price * 100) / 100).toFixed(2) + " BYN";
          e.target.parentElement.children[1].textContent = i.count;
          localStorage.setItem("basket", JSON.stringify(basketArrayObj));
          setCountInBasket();
          if (headerBottomHoverList.children.length === 0) {
            const li = document.createElement("li");
            li.classList.add("header__bottom-hover-list-none");
            li.innerHTML = `Ваша корзина пуста`;
            headerBottomHoverList.append(li);
          }
        }
      }
    } else {
      basketArrayObj = JSON.parse(localStorage.getItem("basket"));
      for (let i of basketArrayObj) {
        if (
          i.id === e.target.parentElement.parentElement.parentElement.parentElement.dataset.id &&
          e.target.parentElement.parentElement.parentElement.parentElement.children[0].children[1].children[1].children[0].textContent.trim() ===
            i.weight.join("")
        ) {
          e.target.parentElement.parentElement.parentElement.children[1].children[2].children[0].textContent = (
            +e.target.parentElement.parentElement.parentElement.children[1].children[2].children[0].textContent.trim() +
            +parseFloat(i.weight.join("").split(" ").splice(0, 1).join("").split(",").join("."))
          ).toFixed(1);
          i.count += 1;
          i.price = Number(i.count * i.initPrice);
          e.target.parentElement.parentElement.children[1].textContent =
            (Math.floor(i.price * 100) / 100).toFixed(2) + " BYN";
          e.target.parentElement.children[1].textContent = i.count;
          localStorage.setItem("basket", JSON.stringify(basketArrayObj));
          setCountInBasket();
        }
      }
    }
  }
}

headerBottomHover.addEventListener("click", setCountItem);

/**
 * Adds an item to the basket in local storage.
 *
 * @param {Event} e - The event object.
 */
function addBasketItemToLocalStorage(e) {
  // Get the selected weight options for the item
  let array = [];
  for (let i of Array.from(e.currentTarget.parentElement.parentElement.children[2].children)) {
    if (i.classList.contains("slider__item-weight-list-item-active")) {
      array.push(i.textContent.trim());
    }
  }
  // Get the basket array from local storage, or initialize an empty array
  let basketArrayObj = JSON.parse(localStorage.getItem("basket")) || [];
  // Check if the item already exists in the basket
  for (let i of basketArrayObj) {
    if (
      i.id === e.currentTarget.parentElement.parentElement.dataset.id &&
      Array.from(e.currentTarget.parentElement.parentElement.children[2].children)
        .map((item) =>
          item.classList.contains("slider__item-weight-list-item-active") ? item.textContent.trim() : null
        )
        .includes(i.weight.join(""))
    ) {
      // If the item exists, increment its count and update its price
      i.count += 1;
      i.price = Number(i.count * i.initPrice);
      localStorage.setItem("basket", JSON.stringify(basketArrayObj));
      return;
    }
  }
  // Get the price of the item, considering promotion and weight options
  let price = Array.from(
    e.currentTarget.parentElement.parentElement.children[4]?.classList.contains("slider__item-promotion") ||
      e.currentTarget.parentElement.parentElement.children[4]?.classList.contains("products___item-promotion")
      ? e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].children[1].children[0].textContent.trim()
      : e.currentTarget.parentElement.parentElement.children[3].children[0].textContent.trim()
  ).splice(0, 6);

  // If weight options are selected, add the item to the basket
  if (array.length !== 0) {
    basketArrayObj.push({
      count: 1, // The initial count of the item
      id: e.currentTarget.parentElement.parentElement.dataset.id, // The ID of the item
      title: e.currentTarget.parentElement.parentElement.children[1].textContent.trim(), // The title of the item
      src: e.currentTarget.parentElement.parentElement.children[0].children[0].src, // The src of the item's image
      weight: array, // The selected weight options
      initPrice: +parseFloat(price.join("")).toFixed(2), // The initial price of the item
      price: +parseFloat(price.join("")).toFixed(2), // The current price of the item
      promotion:
        e.currentTarget.parentElement.parentElement.children[4]?.classList.contains("slider__item-promotion") ||
        e.currentTarget.parentElement.parentElement.children[4].classList.contains("products___item-promotion")
          ? true
          : false, // Whether the item is on promotion
      href: e.currentTarget.parentElement.parentElement.children[1].href, // The href of the item's link
    });
    localStorage.setItem("basket", JSON.stringify(basketArrayObj));
    setCountInBasket(); // Update the count in the basket
  }
}

/**
 * Function to add basket items to the hover list.
 * It fetches the basket items from local storage,
 * clears the hover list, and adds new items to it.
 */
function addBasketItemToHover() {
  // Fetch basket items from local storage
  const basketArray = JSON.parse(localStorage.getItem("basket")) || [];
  let basketCount = 0; // Initialize basket count

  // If basket is empty, add a message to the list
  if (basketArray.length === 0) {
    const li = document.createElement("li");
    li.classList.add("header__bottom-hover-list-none");
    li.innerHTML = `Ваша корзина пуста`;
    headerBottomHoverList.append(li);
  }
  // If basket is not empty, clear the list and add new items
  else {
    headerBottomHoverList.innerHTML = "";
  }

  // Loop through basket items and add them to the list
  if (basketArray) {
    let totalQuantity = 0; // Initialize total quantity
    for (let i of basketArray) {
      const li = document.createElement("li");
      li.classList.add("header__bottom-basket-hover-list-item");
      li.dataset.id = i.id;
      basketCount++;

      // Generate HTML string for each basket item
      li.innerHTML = `
        <!-- Basket item wrapper -->
        <div class="header__bottom-basket-hover-list-item-wrap">
          <!-- Basket item image -->
          <div class="header__bottom-basket-hover-list-item-img">
            <img src="${i.src}" alt="">
          </div>
          <!-- Basket item action -->
          <div class="header__bottom-basket-hover-list-item-action">
            <!-- Basket item title -->
            <a href="${i.href}" 
               class="header__bottom-basket-hover-list-item-title">
              ${i.title}
            </a>
            <!-- Basket item weight list -->
            <ul class="header__bottom-basket-hover-list-item-weight-list">
              <!-- Loop through weight list and generate HTML -->
              ${i?.weight?.map((item) => {
                totalQuantity = item?.split(" ").splice(0, 1).join("").split(",").join(".");
                return `<li class='header__bottom-basket-hover-list-item-weight-list-item slider__item-weight-list-item-active'>${item}</li>`;
              })}
            </ul>
            <!-- Basket item total weight -->
            <div class="header__bottom-basket-hover-list-item-tototal-quantity">
              Общий вес: 
              <span>${(i.count * +totalQuantity).toFixed(2)}</span>
              <span> ${i.weight.join("").split(" ").splice(1, 1).join("")}</span>
            </div>
          </div>
          <!-- Basket item quantity -->
          <div class="header__bottom-basket-hover-list-item-quantity">
            <!-- Basket item quantity wrap -->
            <div class="header__bottom-basket-hover-list-item-quantity-wrap">
              <button type="button" class="minus">
                -
              </button>
              <div>
                ${i.count}
              </div>
              <button type="button" class="plus">
                +
              </button>
            </div>
            <!-- Basket item price -->
            <p>
              ${(Math.floor(i.price * 100) / 100).toFixed(2)} BYN
            </p>
          </div>
        </div>
      `;
      headerBottomHoverList.append(li);
    }
  }
}

addBasketItemToHover();

sliderItemBasketBtnMain.forEach((item) => {
  item.addEventListener("click", (event) => {
    addBasketItemToLocalStorage(event);
    addBasketItemToHover();
  });
});
// product list observer for catalog page
let obsever = new MutationObserver(() => {
  productItemBtn = document.querySelectorAll(".products___item-basket");
  productItemBtn.forEach((item) => {
    item.addEventListener("click", (event) => {
      addBasketItemToLocalStorage(event);
      addBasketItemToHover();
    });
  });
  sliderItemWeightList = document.querySelectorAll(".slider__item-weight-list-item");
  sliderItemWeightList.forEach((item) => {
    item.addEventListener("click", (e) => {
      sliderItemWeightList.forEach((el) => {
        if (el.classList.contains("slider__item-weight-list-item-active")) {
          el.classList.remove("slider__item-weight-list-item-active");
        }
      });
      item.classList.add("slider__item-weight-list-item-active");
    });
  });
  sliderItemWeightList = document.querySelectorAll(".slider__item-weight-list-item");
  sliderItemWeightList.forEach((item) => {
    item.addEventListener("click", (e) => {
      sliderItemWeightList.forEach((el) => {
        if (el.classList.contains("slider__item-weight-list-item-active")) {
          el.classList.remove("slider__item-weight-list-item-active");
        }
      });
      item.classList.add("slider__item-weight-list-item-active");
      if (
        e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].children[0].classList.contains(
          "slider___item-price-promotion"
        ) ||
        e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].children[0].classList.contains(
          "products___item-price-promotion"
        )
      ) {
        localStorage.setItem(
          "pricePerOneKg",
          e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].children[1].children[0]
            .dataset.priceperonekg
        );
        e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].children[1].children[0].textContent =
          parseFloat(e.currentTarget.dataset.weightPrice.split(",").join(".")).toFixed(2);
        localStorage.setItem(
          "buyOneClickPrice",
          parseFloat(e.currentTarget.dataset.weightPrice.split(",").join(".")).toFixed(2)
        );
      } else {
        localStorage.setItem(
          "pricePerOneKg",
          e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].children[0].dataset
            .priceperonekg
        );
        e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].children[0].textContent =
          parseFloat(e.currentTarget.dataset.weightPrice.split(",").join(".")).toFixed(2);
        localStorage.setItem(
          "buyOneClickPrice",
          parseFloat(e.currentTarget.dataset.weightPrice.split(",").join(".")).toFixed(2)
        );
      }
    });
  });
});
productsList
  ? obsever.observe(productsList, {
      childList: true,
    })
  : "";
// set eventListner for slider view in basket
let viewProductObserver = new MutationObserver(() => {
  const sliderButton = document.querySelectorAll(".slider__item-btn");
  const sliderItemBtn = document.querySelectorAll(".slider__item-basket");
  sliderItemBtn.forEach((item) => {
    item.addEventListener("click", (event) => {
      addBasketItemToLocalStorage(event);
      addBasketItemToHover();
    });
  });
  sliderItemWeightList = document.querySelectorAll(".slider__item-weight-list-item");
  sliderItemWeightList.forEach((item) => {
    item.addEventListener("click", (e) => {
      sliderItemWeightList.forEach((el) => {
        if (el.classList.contains("slider__item-weight-list-item-active")) {
          el.classList.remove("slider__item-weight-list-item-active");
        }
      });
      item.classList.add("slider__item-weight-list-item-active");
    });
  });
  sliderItemWeightList = document.querySelectorAll(".slider__item-weight-list-item");
  sliderItemWeightList.forEach((item) => {
    item.addEventListener("click", (e) => {
      sliderItemWeightList.forEach((el) => {
        if (el.classList.contains("slider__item-weight-list-item-active")) {
          el.classList.remove("slider__item-weight-list-item-active");
        }
      });
      item.classList.add("slider__item-weight-list-item-active");
      if (
        e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].children[0].classList.contains(
          "slider___item-price-promotion"
        ) ||
        e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].children[0].classList.contains(
          "products___item-price-promotion"
        )
      ) {
        localStorage.setItem(
          "pricePerOneKg",
          e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].children[1].children[0]
            .dataset.priceperonekg
        );
        e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].children[1].children[0].textContent =
          parseFloat(e.currentTarget.dataset.weightPrice.split(",").join(".")).toFixed(2);
        localStorage.setItem(
          "buyOneClickPrice",
          parseFloat(e.currentTarget.dataset.weightPrice.split(",").join(".")).toFixed(2)
        );
      } else {
        localStorage.setItem(
          "pricePerOneKg",
          e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].children[0].dataset
            .priceperonekg
        );
        e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].children[0].textContent =
          parseFloat(e.currentTarget.dataset.weightPrice.split(",").join(".")).toFixed(2);
        localStorage.setItem(
          "buyOneClickPrice",
          parseFloat(e.currentTarget.dataset.weightPrice.split(",").join(".")).toFixed(2)
        );
      }
    });
  });
  sliderButton.forEach((item) => {
    item.addEventListener("click", (e) => {
      for (let i of e.currentTarget.parentElement.children[2].children) {
        if (i.classList.contains("slider__item-weight-list-item-active")) {
          document.body.style.overflow = "hidden";
          modal.classList.add("modal__active");
          buyOneClick.classList.add("modal__active");
          buyOneClickWeightList.innerHTML = "";
          buyOneClickImg.setAttribute("src", e.currentTarget.parentElement.children[0].children[0].getAttribute("src"));
          buyOneClickTitle.textContent = e.currentTarget.parentElement.children[1].textContent.trim();
          buyOneClickModalCountInit.textContent = 1;
          buyOneClickWeightList.innerHTML += `<li class="buy__one-click-list-item-weight-list-item slider__item-weight-list-item-active">${i.textContent}</li>`;
          localStorage.setItem("initWeight", i.textContent.trim().split(" ").splice(0, 1).join(""));
          if (
            e.currentTarget.parentElement.children[4].classList.contains("products___item-promotion") ||
            e.currentTarget.parentElement.children[4].classList.contains("slider__item-promotion")
          ) {
            buyOneClickPrice.textContent =
              e.currentTarget.parentElement.children[3].children[0].children[0].children[1].children[0].textContent.trim() +
              " BYN";
          } else {
            buyOneClickPrice.textContent = e.currentTarget.parentElement.children[3].children[0].textContent.trim();
          }
          if (e.currentTarget.parentElement.children[2].children[0].children[0].textContent === "шт.") {
            weightButton.style.display = "none";
          } else {
            weightButton.style.display = "flex";
          }
        }
      }
    });
  });
});
viewProduct
  ? viewProductObserver.observe(viewProduct, {
      childList: true,
    })
  : "";
// product item button basket
productItemBtn.forEach((item) => {
  item.addEventListener("click", (event) => {
    addBasketItemToLocalStorage(event);
    addBasketItemToHover();
  });
});
// details page set basket btn event
aboutProductBtn?.addEventListener("click", (e) => {
  let basket = JSON.parse(localStorage.getItem("basket")) || [];
  const inputValue = e.currentTarget.parentElement.children[0].children[1].value;
  const weightInput = document.querySelector(".about__product-your-weight-hide input");
  let weightItem;
  let initPrice;
  // get total weight
  Array.from(
    e.currentTarget.parentElement.parentElement.parentElement.children[1].children[0].children[0].children[1].children
  ).forEach((item) => {
    if (item.classList.contains("about__product-weight-list-item-active")) {
      weightItem = item.children[0].textContent.trim() + ".";
      initPrice = item.children[1].textContent.trim().split(" ").splice(0, 1).join("").trim();
    }
  });
  for (let i of basket) {
    if (
      i.id === e.currentTarget.dataset.productId &&
      (i?.weight?.includes(weightItem) ||
        i?.weight.includes(localStorage.getItem("initWeight").split(".").join(",") + " кг."))
    ) {
      i.count += +inputValue;
      i.price = Number(i.count * i.initPrice);
      localStorage.setItem("basket", JSON.stringify(basket));
      addBasketItemToHover();
      return;
    }
  }
  if (
    weightItem ||
    parseFloat(weightInput?.value).toFixed(1) + " кг." ===
      e.currentTarget.parentElement.parentElement.children[3]?.children[1]?.children[0]?.textContent.trim() ||
    (parseFloat(weightInput?.value) * aboutProductAction.children[1].value).toFixed(1).split(".").join(",") + " кг." ===
      e.currentTarget.parentElement.parentElement.children[3]?.children[1]?.children[0]?.textContent.trim()
  ) {
    if (!e.currentTarget.parentElement.parentElement.children[3].classList.contains("about__product-action-wrap")) {
      if (initPrice === undefined) {
        initPrice = e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].classList.contains(
          "about__product-price-promotion-noaction-price"
        )
          ? +parseFloat(
              e.currentTarget.parentElement.parentElement.children[3].children[0].children[1].dataset.priceperonekg
                .split(",")
                .join(".") * localStorage.getItem("initWeight")
            ).toFixed(2)
          : +parseFloat(
              e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].dataset.priceperonekg
                .split(",")
                .join(".") * localStorage.getItem("initWeight")
            ).toFixed(2);
      }
      if (weightItem === undefined) {
        weightItem = localStorage.getItem("initWeight") + localStorage.getItem("optionWeight");
      }
      basket.push({
        id: e.currentTarget.dataset.productId,
        count: +inputValue,
        initPrice: +initPrice,
        weight: [
          parseFloat(
            String(+weightInput.value * aboutProductAction.children[1].value)
              .split(".")
              .join(",")
          ).toFixed(1) +
            " кг." !==
          e.currentTarget.parentElement.parentElement.children[3].children[1].children[0].textContent.trim()
            ? weightItem
            : weightInput.value * aboutProductAction.children[1].value + " кг.",
        ],
        price: e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].classList.contains(
          "about__product-price-promotion-noaction-price"
        )
          ? +parseFloat(
              e.currentTarget.parentElement.parentElement.children[3].children[0].children[1].dataset.priceperonekg
                .split(",")
                .join(".") * localStorage.getItem("totalWeightDetail")
            ).toFixed(2)
          : +parseFloat(
              e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].dataset.priceperonekg
                .split(",")
                .join(".") * localStorage.getItem("totalWeightDetail")
            ).toFixed(2),
        title:
          e.currentTarget.parentElement.parentElement.parentElement.parentElement.children[0].children[0].textContent.trim(),
        promotion: e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].classList.contains(
          "about__product-price-promotion-noaction-price"
        )
          ? true
          : false,
        src: e.currentTarget.parentElement.parentElement.parentElement.children[0].children[1].children[0].children[0]
          .src,
        href: window.location.href,
      });
    } else {
      if (initPrice === undefined) {
        initPrice = e.currentTarget.parentElement.parentElement.children[2].children[0].children[0].classList.contains(
          "about__product-price-promotion-noaction-price"
        )
          ? +parseFloat(
              e.currentTarget.parentElement.parentElement.children[2].children[0].children[1].dataset.priceperonekg
                .split(",")
                .join(".") * localStorage.getItem("totalWeightDetail")
            ).toFixed(2)
          : +parseFloat(
              e.currentTarget.parentElement.parentElement.children[2].children[0].children[0].dataset.priceperonekg
                .split(",")
                .join(".") * localStorage.getItem("totalWeightDetail")
            ).toFixed(2);
      }
      basket.push({
        id: e.currentTarget.dataset.productId,
        count: +inputValue,
        initPrice: +initPrice,
        weight: [
          weightInput?.value + " кг." !==
          e.currentTarget?.parentElement?.parentElement?.children[3]?.children[1]?.children[0]?.textContent.trim()
            ? weightItem
            : weightInput?.value + " кг.",
        ],
        price: e.currentTarget.parentElement.parentElement.children[2].children[0].children[0].classList.contains(
          "about__product-price-promotion-noaction-price"
        )
          ? +parseFloat(
              e.currentTarget.parentElement.parentElement.children[2].children[0].children[1].dataset.priceperonekg
                .split(",")
                .join(".") * localStorage.getItem("totalWeightDetail")
            ).toFixed(2)
          : +parseFloat(
              e.currentTarget.parentElement.parentElement.children[2].children[0].children[0].dataset.priceperonekg
                .split(",")
                .join(".") * localStorage.getItem("totalWeightDetail")
            ).toFixed(2),
        title:
          e.currentTarget.parentElement.parentElement.parentElement.parentElement.children[0].children[0].textContent.trim(),
        promotion: e.currentTarget.parentElement.parentElement.children[2].children[0].children[0].classList.contains(
          "about__product-price-promotion-noaction-price"
        )
          ? true
          : false,
        src: e.currentTarget.parentElement.parentElement.parentElement.children[0].children[1].children[0].children[0]
          .src,
        href: window.location.href,
      });
    }
  }
  localStorage.setItem("basket", JSON.stringify(basket));
  addBasketItemToHover();
  setCountInBasket();
});
// ---
// choose your weight
yourWeightBtn?.addEventListener("click", (e) => {
  aboutProductAction.children[1].value = 1;
  // share verification
  if (e.currentTarget.parentElement.parentElement.parentElement.parentElement.children[3].children[0].children[1]) {
    e.currentTarget.parentElement.parentElement.parentElement.parentElement.children[3].children[0].children[1].textContent =
      parseFloat(
        e.currentTarget.parentElement.children[0].value *
          e.currentTarget.parentElement.parentElement.parentElement.parentElement.children[3].children[0].children[1].dataset.priceperonekg
            .split(",")
            .join(".")
      ).toFixed(2) + " BYN";
  } else {
    e.currentTarget.parentElement.parentElement.parentElement.parentElement.children[3].children[0].children[0].textContent =
      parseFloat(
        e.currentTarget.parentElement.children[0].value *
          e.currentTarget.parentElement.parentElement.parentElement.parentElement.children[3].children[0].children[0].dataset.priceperonekg
            .split(",")
            .join(".")
      ).toFixed(2) + " BYN";
  }
  e.currentTarget.parentElement.parentElement.parentElement.parentElement.children[3].children[1].children[0].textContent =
    parseFloat(e.currentTarget.parentElement.children[0].value).toFixed(1).split(".").join(",") + " кг.";
  localStorage.setItem("totalWeightDetail", e.currentTarget.parentElement.children[0].value);
  localStorage.setItem("initWeight", e.currentTarget.parentElement.children[0].value);
  const aboutProductList = document.querySelectorAll(".about__product-weight-list-item");
  for (let i of aboutProductList) {
    i.classList.remove("about__product-weight-list-item-active");
  }
});

localStorage.setItem("initWeight", aboutProductWeightSpan?.textContent.split(" ").splice(0, 1).join(""));
// quantity product input
// Add an event listener to the input field for choosing weight
aboutProductAction?.children[1]?.addEventListener("input", (e) => {
  // Check if initial weight is stored in local storage, if not, store it
  if (localStorage.getItem("initWeight") === null) {
    localStorage.setItem(
      "initWeight",
      e.currentTarget.parentElement.parentElement.children[3].children[1].children[0].textContent.split(" ")[0] // Split the text content by space and get the first item
    );
  }
  // Calculate total weight based on the chosen weight and initial weight
  let totalWeight = e.currentTarget.value * +localStorage.getItem("initWeight");
  localStorage.setItem("totalWeightDetail", totalWeight.toFixed(1));

  // Set total weight in input details
  if (
    e.currentTarget.parentElement.parentElement.parentElement.children[3].classList.contains(
      "about__product-price-wrap"
    )
  ) {
    // Set weight in details
    e.currentTarget.parentElement.parentElement.parentElement.children[3].children[1].children[0].textContent =
      parseFloat(totalWeight).toFixed(1).split(".").join(",") + localStorage.getItem("optionWeight");

    // Set price in details
    if (e.currentTarget.parentElement.parentElement.parentElement.children[3].children[0].children[1]) {
      // Check if details container has second child
      e.currentTarget.parentElement.parentElement.parentElement.children[3].children[0].children[1].textContent =
        parseFloat(
          e.currentTarget.parentElement.parentElement.parentElement.children[3].children[0].children[1].dataset.priceperonekg
            .split(",")
            .join(".") * totalWeight
        ).toFixed(2) + " BYN";
    } else {
      // Check if details container has first child
      e.currentTarget.parentElement.parentElement.parentElement.children[3].children[0].children[0].textContent =
        parseFloat(
          e.currentTarget.parentElement.parentElement.parentElement.children[3].children[0].children[0].dataset.priceperonekg
            .split(",")
            .join(".") * totalWeight
        ).toFixed(2) + " BYN";
    }
  } else {
    // Set weight in details
    e.currentTarget.parentElement.parentElement.parentElement.children[2].children[1].children[0].textContent =
      parseFloat(totalWeight).toFixed(1).split(".").join(",") + localStorage.getItem("optionWeight");

    // Set price in details
    if (e.currentTarget.parentElement.parentElement.parentElement.children[2].children[0].children[1]) {
      // Check if details container has second child
      e.currentTarget.parentElement.parentElement.parentElement.children[2].children[0].children[1].textContent =
        parseFloat(
          e.currentTarget.parentElement.parentElement.parentElement.children[2].children[0].children[1].dataset.priceperonekg
            .split(",")
            .join(".") * totalWeight
        ).toFixed(2) + " BYN";
    } else {
      // Check if details container has first child
      e.currentTarget.parentElement.parentElement.parentElement.children[2].children[0].children[0].textContent =
        parseFloat(
          e.currentTarget.parentElement.parentElement.parentElement.children[2].children[0].children[0].dataset.priceperonekg
            .split(",")
            .join(".") * totalWeight
        ).toFixed(2) + " BYN";
    }
  }
});
//------

aboutProductAction?.addEventListener("click", (e) => {
  if (e.target.textContent.trim() === "+") {
    // set count in input for quantity product
    e.currentTarget.children[1].value = +e.currentTarget.children[1].value + 1;
    //---
    // set init weight
    if (localStorage.getItem("initWeight") === null) {
      localStorage.setItem(
        "initWeight",
        e.currentTarget.parentElement.parentElement.children[3].children[1].children[0].textContent
          .split(" ")
          .splice(0, 1)
          .join("")
      );
    }
    //---
    // set option weight for total price
    if (e.currentTarget.parentElement.parentElement.children[3].classList.contains("about__product-price-wrap")) {
      localStorage.setItem(
        "optionWeight",
        e.currentTarget.parentElement.parentElement.children[3].children[1].children[0].textContent
          .trim()
          .split(" ")
          .splice(1, 1)
          .join("") === "шт."
          ? " шт."
          : " кг."
      );
    } else {
      localStorage.setItem(
        "optionWeight",
        e.currentTarget.parentElement.parentElement.children[2].children[1].children[0].textContent
          .trim()
          .split(" ")
          .splice(1, 1)
          .join("") === "шт."
          ? " шт."
          : " кг."
      );
    }
    //---
    if (e.currentTarget.parentElement.parentElement.children[3].classList.contains("about__product-price-wrap")) {
      // set state total weight
      localStorage.setItem(
        "totalWeightDetail",
        parseFloat(
          +e.currentTarget.parentElement.parentElement.children[3].children[1].children[0].textContent
            .split(" ")
            .splice(0, 1)
            .join("")
            .split(",")
            .join(".") + +localStorage.getItem("initWeight")
        ).toFixed(1)
      );
      //----
      // set total weight in detail page tag
      e.currentTarget.parentElement.parentElement.children[3].children[1].children[0].textContent =
        parseFloat(
          +e.currentTarget.parentElement.parentElement.children[3].children[1].children[0].textContent
            .split(" ")
            .splice(0, 1)
            .join("")
            .split(",")
            .join(".") + +localStorage.getItem("initWeight")
        )
          .toFixed(1)
          .split(".")
          .join(",") + localStorage.getItem("optionWeight");
      // -----
      if (e.currentTarget.parentElement.parentElement.children[3].children[0].children[1]) {
        e.currentTarget.parentElement.parentElement.children[3].children[0].children[1].textContent =
          parseFloat(
            e.currentTarget.parentElement.parentElement.children[3].children[0].children[1].dataset.priceperonekg
              .split(",")
              .join(".") * +localStorage.getItem("totalWeightDetail")
          ).toFixed(2) + " BYN";
      } else {
        e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].textContent =
          parseFloat(
            e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].dataset.priceperonekg
              .split(",")
              .join(".") * +localStorage.getItem("totalWeightDetail")
          ).toFixed(2) + " BYN";
      }
    } else {
      // set state total weight
      localStorage.setItem(
        "totalWeightDetail",
        parseFloat(
          +e.currentTarget.parentElement.parentElement.children[2].children[1].children[0].textContent
            .split(" ")
            .splice(0, 1)
            .join("")
            .split(",")
            .join(".") + +localStorage.getItem("initWeight")
        ).toFixed(1)
      );
      //----
      e.currentTarget.parentElement.parentElement.children[2].children[1].children[0].textContent =
        parseFloat(
          +e.currentTarget.parentElement.parentElement.children[2].children[1].children[0].textContent
            .split(" ")
            .splice(0, 1)
            .join("")
            .split(",")
            .join(".") + +localStorage.getItem("initWeight")
        ).toFixed(1) + localStorage.getItem("optionWeight");
      if (e.currentTarget.parentElement.parentElement.children[2].children[0].children[1]) {
        e.currentTarget.parentElement.parentElement.children[2].children[0].children[1].textContent =
          parseFloat(
            e.currentTarget.parentElement.parentElement.children[2].children[0].children[1].dataset.priceperonekg
              .split(",")
              .join(".") * +localStorage.getItem("totalWeightDetail")
          ).toFixed(2) + " BYN";
      } else {
        e.currentTarget.parentElement.parentElement.children[2].children[0].children[0].textContent =
          parseFloat(
            e.currentTarget.parentElement.parentElement.children[2].children[0].children[0].dataset.priceperonekg
              .split(",")
              .join(".") * +localStorage.getItem("totalWeightDetail")
          ).toFixed(2) + " BYN";
      }
    }
  } else if (e.target.textContent.trim() === "-") {
    if (e.currentTarget.children[1].value > 1) {
      // set quantity product in detail input
      e.currentTarget.children[1].value = +e.currentTarget.children[1].value - 1;
      // --
      if (e.currentTarget.parentElement.parentElement.children[3].classList.contains("about__product-price-wrap")) {
        // set state total weight
        localStorage.setItem(
          "totalWeightDetail",
          parseFloat(
            +e.currentTarget.parentElement.parentElement.children[3].children[1].children[0].textContent
              .split(" ")
              .splice(0, 1)
              .join("")
              .split(",")
              .join(".") - +localStorage.getItem("initWeight")
          ).toFixed(1)
        );
        //----
        // -------
        // set total weight in detail page tag
        e.currentTarget.parentElement.parentElement.children[3].children[1].children[0].textContent =
          parseFloat(
            +e.currentTarget.parentElement.parentElement.children[3].children[1].children[0].textContent
              .split(" ")
              .splice(0, 1)
              .join("")
              .split(",")
              .join(".") - +localStorage.getItem("initWeight")
          )
            .toFixed(1)
            .split(".")
            .join(",") + localStorage.getItem("optionWeight");
        // -------
        // set total price in detail page
        if (e.currentTarget.parentElement.parentElement.children[3].children[0].children[1]) {
          e.currentTarget.parentElement.parentElement.children[3].children[0].children[1].textContent =
            parseFloat(
              e.currentTarget.parentElement.parentElement.children[3].children[0].children[1].dataset.priceperonekg
                .split(",")
                .join(".") * +localStorage.getItem("totalWeightDetail")
            ).toFixed(2) + " BYN";
        }
        // -----
        else {
          e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].textContent =
            parseFloat(
              e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].dataset.priceperonekg
                .split(",")
                .join(".") * +localStorage.getItem("totalWeightDetail")
            ).toFixed(2) + " BYN";
        }
      } else {
        // set state total weight
        localStorage.setItem(
          "totalWeightDetail",
          parseFloat(
            +e.currentTarget.parentElement.parentElement.children[2].children[1].children[0].textContent
              .split(" ")
              .splice(0, 1)
              .join("")
              .split(",")
              .join(".") - +localStorage.getItem("initWeight")
          ).toFixed(1)
        );
        //----
        e.currentTarget.parentElement.parentElement.children[2].children[1].children[0].textContent =
          parseFloat(
            +e.currentTarget.parentElement.parentElement.children[2].children[1].children[0].textContent
              .split(" ")
              .splice(0, 1)
              .join("")
              .split(",")
              .join(".") - +localStorage.getItem("initWeight")
          ).toFixed(1) + localStorage.getItem("optionWeight");
        if (e.currentTarget.parentElement.parentElement.children[2].children[0].children[1]) {
          e.currentTarget.parentElement.parentElement.children[2].children[0].children[1].textContent =
            parseFloat(
              e.currentTarget.parentElement.parentElement.children[2].children[0].children[1].dataset.priceperonekg
                .split(",")
                .join(".") * +localStorage.getItem("totalWeightDetail")
            ).toFixed(2) + " BYN";
        } else {
          e.currentTarget.parentElement.parentElement.children[2].children[0].children[0].textContent =
            parseFloat(
              e.currentTarget.parentElement.parentElement.children[2].children[0].children[0].dataset.priceperonekg
                .split(",")
                .join(".") * +localStorage.getItem("totalWeightDetail")
            ).toFixed(2) + " BYN";
        }
      }
    }
  }
});



