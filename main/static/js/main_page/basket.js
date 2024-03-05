addEventListener("DOMContentLoaded", () => {
  const sliderItemBasketBtn = document.querySelectorAll(".slider__item-basket");
  const headerBottomBasketCount = document.querySelector(".header__bottom-basket > p");
  const headerBottomBasketValueMob = document.querySelector(".header__bottom-basket-value");
  const headerBottomHoverList = document.querySelector(".header__bottom-basket-hover-list");
  const headerBottomHover = document.querySelector(".header__bottom-basket-hover");
  const productsList = document.querySelector(".products__list");
  let productItemBtn = document.querySelectorAll(".products___item-basket");
  let sliderItemWeightList = document.querySelectorAll(".slider__item-weight-list-item");
  const aboutProductBtn = document.querySelector(".about__product-basket-btn");
  const aboutProductAction = document.querySelector(".about__product-action");

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

  let count = localStorage.getItem("basket") ? JSON.parse(localStorage.getItem("basket")).length : 0;
  headerBottomBasketCount.textContent = count;
  let basketArrayObj = [];

  function setCountInBasket() {
    if (localStorage.getItem("basket") === null) {
      return;
    }
    count = JSON.parse(localStorage.getItem("basket"))?.length;
    headerBottomBasketCount.textContent = count;
    headerBottomBasketValueMob.textContent = count;
  }
  setCountInBasket();

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
            i.count -= 1;
            i.initPrice === 0 ? (i.initPrice = i.price) : 0;
            i.price = Number(i.price - i.initPrice);
            e.target.parentElement.parentElement.children[1].textContent =
              (Math.floor(i.price * 100) / 100).toFixed(2) + " BYN";
            e.target.parentElement.children[1].textContent = i.count;
            localStorage.setItem("basket", JSON.stringify(basketArrayObj));
            setCountInBasket();
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

  function addBasketItemToLocalStorage(e) {
    let array = [];
    for (let i of Array.from(e.currentTarget.parentElement.parentElement.children[2].children)) {
      if (i.classList.contains("slider__item-weight-list-item-active")) {
        array.push(i.textContent.trim());
      }
    }
    localStorage.getItem("basket") === null ? "" : (basketArrayObj = JSON.parse(localStorage.getItem("basket")));
    for (let i of basketArrayObj) {
      if (
        i.id === e.currentTarget.parentElement.parentElement.dataset.id &&
        Array.from(e.currentTarget.parentElement.parentElement.children[2].children)
          .map((item) =>
            item.classList.contains("slider__item-weight-list-item-active") ? item.textContent.trim() : null
          )
          .includes(i.weight.join(""))
      ) {
        i.count += 1;
        i.price = Number(i.count * i.initPrice);
        localStorage.setItem("basket", JSON.stringify(basketArrayObj));
        return;
      }
    }

    let price = Array.from(
      e.currentTarget.parentElement.parentElement.children[4]?.classList.contains("slider__item-promotion") ||
        e.currentTarget.parentElement.parentElement.children[4]?.classList.contains("products___item-promotion")
        ? e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].children[1].children[0].textContent.trim()
        : e.currentTarget.parentElement.parentElement.children[3].children[0].textContent.trim()
    ).splice(0, 6);
    if (array.length !== 0) {
      basketArrayObj.push({
        count: 1,
        id: e.currentTarget.parentElement.parentElement.dataset.id,
        title: e.currentTarget.parentElement.parentElement.children[1].textContent.trim(),
        src: e.currentTarget.parentElement.parentElement.children[0].children[0].src,
        weight: array,
        initPrice: parseFloat(price.join("")).toFixed(2),
        price: parseFloat(price.join("")).toFixed(2),
        promotion: e.currentTarget.parentElement.parentElement.children[4]?.classList.contains("slider__item-promotion")
          ? true
          : false,
        href: e.currentTarget.parentElement.parentElement.children[1].href,
      });
      localStorage.setItem("basket", JSON.stringify(basketArrayObj));
      setCountInBasket();
    }
  }

  function addBasketItemToHover() {
    const basketArray = JSON.parse(localStorage.getItem("basket"));
    let basketCount = 0;
    headerBottomHoverList.innerHTML = "";
    if (basketArray) {
      for (let i of basketArray) {
        const li = document.createElement("li");
        li.classList.add("header__bottom-basket-hover-list-item");
        li.dataset.id = i.id;
        basketCount++;
        li.innerHTML = `
        <div class="header__bottom-basket-hover-list-item-wrap">
        <div class="header__bottom-basket-hover-list-item-img">
            <img src="${i.src}" alt="">
        </div>
        <div class="header__bottom-basket-hover-list-item-action">
            <a href="${i.href}" class="header__bottom-basket-hover-list-item-title">
                ${i.title}
            </a>
            <ul class="header__bottom-basket-hover-list-item-weight-list">
                ${i?.weight?.map(
                  (item) =>
                    `<li class='header__bottom-basket-hover-list-item-weight-list-item slider__item-weight-list-item-active'>${item}</li>`
                )}
            </ul>
        </div>
        <div class="header__bottom-basket-hover-list-item-quantity">
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

  sliderItemBasketBtn.forEach((item) => {
    item.addEventListener("click", (event) => {
      addBasketItemToLocalStorage(event);
      addBasketItemToHover();
    });
  });

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

  productItemBtn.forEach((item) => {
    item.addEventListener("click", (event) => {
      addBasketItemToLocalStorage(event);
      addBasketItemToHover();
    });
  });

  aboutProductBtn?.addEventListener("click", (e) => {
    let basket = JSON.parse(localStorage.getItem("basket")) || [];
    const inputValue = e.currentTarget.parentElement.children[0].children[1].value;
    let weightItem
    Array.from(e.currentTarget.parentElement.parentElement.parentElement.children[1].children[0].children[0].children[1].children).forEach(item => {
      if(item.classList.contains("about__product-weight-list-item-active")) {
        weightItem = item.children[0].textContent.trim() + "."
      }
    })
    for(let i of basket) {
      if(i.id === e.currentTarget.dataset.productId && i.weight.includes(weightItem)) {
        i.count += +inputValue;
        i.price = Number(i.count * i.initPrice);
        localStorage.setItem("basket", JSON.stringify(basket));
        addBasketItemToHover()
        return
      }
    }
    console.log(e.currentTarget.parentElement.parentElement);
    if(!e.currentTarget.parentElement.parentElement.children[3].classList.contains('about__product-action-wrap')){
      basket.push({
        id: e.currentTarget.dataset.productId,
        count: +inputValue,
        initPrice:
          e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].classList.contains(
            "about__product-price-promotion-noaction-price"
          )
            ? parseFloat(
                e.currentTarget.parentElement.parentElement.children[3].children[0].children[1].textContent
                  .trim()
                  .split(" ")
                  .splice(0, 1)
                  .join("")
              ).toFixed(2)
            : parseFloat(
                e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].textContent
                  .trim()
                  .split(" ")
                  .splice(0, 1)
                  .join("")
              ).toFixed(2),
        weight: [weightItem],
        price:
          e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].classList.contains(
            "about__product-price-promotion-noaction-price"
          )
            ? parseFloat(
                e.currentTarget.parentElement.parentElement.children[3].children[0].children[1].textContent
                  .trim()
                  .split(" ")
                  .splice(0, 1)
                  .join("") * +inputValue
              ).toFixed(2)
            : parseFloat(
                e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].textContent
                  .trim()
                  .split(" ")
                  .splice(0, 1)
                  .join("") * +inputValue
              ).toFixed(2),
        title:
          e.currentTarget.parentElement.parentElement.parentElement.parentElement.children[0].children[0].textContent.trim(),
        promotion:
          e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].classList.contains(
            "about__product-price-promotion-noaction-price"
          )
            ? true
            : false,
        src: e.currentTarget.parentElement.parentElement.parentElement.children[0].children[1].children[0]
          .children[0].src,
        href: window.location.href,
      })
    }else {
      basket.push({
        id: e.currentTarget.dataset.productId,
        count: +inputValue,
        initPrice:
          e.currentTarget.parentElement.parentElement.children[2].children[0].children[0].classList.contains(
            "about__product-price-promotion-noaction-price"
          )
            ? parseFloat(
                e.currentTarget.parentElement.parentElement.children[2].children[0].children[1].textContent
                  .trim()
                  .split(" ")
                  .splice(0, 1)
                  .join("")
              ).toFixed(2)
            : parseFloat(
                e.currentTarget.parentElement.parentElement.children[2].children[0].children[0].textContent
                  .trim()
                  .split(" ")
                  .splice(0, 1)
                  .join("")
              ).toFixed(2),
        weight: [weightItem],
        price:
          e.currentTarget.parentElement.parentElement.children[2].children[0].children[0].classList.contains(
            "about__product-price-promotion-noaction-price"
          )
            ? parseFloat(
                e.currentTarget.parentElement.parentElement.children[2].children[0].children[1].textContent
                  .trim()
                  .split(" ")
                  .splice(0, 1)
                  .join("") * +inputValue
              ).toFixed(2)
            : parseFloat(
                e.currentTarget.parentElement.parentElement.children[2].children[0].children[0].textContent
                  .trim()
                  .split(" ")
                  .splice(0, 1)
                  .join("") * +inputValue
              ).toFixed(2),
        title:
          e.currentTarget.parentElement.parentElement.parentElement.parentElement.children[0].children[0].textContent.trim(),
        promotion:
          e.currentTarget.parentElement.parentElement.children[2].children[0].children[0].classList.contains(
            "about__product-price-promotion-noaction-price"
          )
            ? true
            : false,
        src: e.currentTarget.parentElement.parentElement.parentElement.children[0].children[1].children[0]
          .children[0].src,
        href: window.location.href,
      })
    }
    
    localStorage.setItem("basket", JSON.stringify(basket));
    addBasketItemToHover()
    setCountInBasket()
  });

  aboutProductAction?.addEventListener("click", (e) => {
    if (e.target.textContent.trim() === "+") {
      e.currentTarget.children[1].value = +e.currentTarget.children[1].value + 1;
    } else if (e.target.textContent.trim() === "-") {
      if (e.currentTarget.children[1].value > 1) {
        e.currentTarget.children[1].value = +e.currentTarget.children[1].value - 1;
      }
    }
  });
});
