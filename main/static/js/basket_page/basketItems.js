document.addEventListener("DOMContentLoaded", () => {
  const basketList = document.querySelector(".basket__list");
  const headerBottomBasketCount = document.querySelector(".header__bottom-basket > p");
  const hoverList = document.querySelector(".header__bottom-basket-hover-list");
  const basketTotalText = document.querySelectorAll(".basket__total-text span");
  const headerBottomHoverList = document.querySelector(".header__bottom-basket-hover-list");
  let list = document.querySelectorAll(".header__bottom-basket-hover-list-item");
  let basket = JSON.parse(localStorage.getItem("basket")) || [];



  const detectOS = () => /android/i.test(window.navigator.userAgent) ? "Android" :
                     /iPad|iPhone|iPod/.test(window.navigator.userAgent) ? "iOS" : "Неустановленная ОС";

  console.log(window.navigator);
  basketTotalText[0].textContent = basket.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2) + " BYN";
  // --- basket events
  new WebKitMutationObserver((mutation) => {
    list = document.querySelectorAll(".header__bottom-basket-hover-list-item");
    basket = JSON.parse(localStorage.getItem("basket"));
    basketTotalText[0].textContent = basket.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2) + " BYN";
    list.forEach((item) => {
      if (
        event?.currentTarget?.classList?.contains("basket__list-item") &&
        event?.currentTarget?.dataset?.id === item.dataset.id &&
        event?.currentTarget?.children[1]?.children[1].children[1].children[0].textContent.trim() ===
          item.children[0].children[1].children[1].children[0].textContent.trim()
      ) {
        item.children[0].children[2].children[0].children[1].textContent =
          event?.currentTarget?.children[2].children[0].children[0].children[1].textContent.trim();
        item.children[0].children[2].children[1].textContent =
          event?.currentTarget?.children[2].children[0].children[1].textContent.trim();
        if (Number(item.children[0].children[2].children[0].children[1].textContent) <= 0) {
          item.remove();
          basketTotalText[0].textContent =
            basket.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2) + " BYN";
        }
      }
      setCountInBasket();
    });
  }).observe(basketList, {
    childList: true,
    subtree: true,
  });
  // ----
  // --- basketHover events
  new WebKitMutationObserver((mutation) => {
    const list = document.querySelectorAll(".basket__list-item");
    const basketCount = document.querySelector(".header__bottom-basket-wrap p");
    const basket = JSON.parse(localStorage.getItem("basket"));
    const basketListCount = document.querySelectorAll(".basket__list-action div");
    for (let i of basketListCount) {
      for (let j of basket) {
        if (
          j.id === i.parentElement.parentElement.parentElement.parentElement.dataset.id &&
          i.parentElement.parentElement.parentElement.parentElement.children[1].children[1].children[1].children[0].textContent.trim() ===
            j.weight.join("")
        ) {
          i.innerHTML = j.count;
        }
      }
    }
    if (Number(basketCount.innerText) > list.length) {
      basketList.innerHTML = "";
      initBasketItem();
      basketItem = document.querySelectorAll(".basket__list-item");
      basketItem.forEach((item) => {
        item.addEventListener("click", (e) => {
          basketItems(e);
        });
      });
    }
    basketTotalText[1].textContent = basket.length + " товаров";
    basketTotalText[0].textContent = basket.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2) + " BYN";
    list.forEach((item) => {
      if (event?.target?.parentElement?.parentElement?.parentElement?.parentElement?.classList) {
        if (
          event?.target.parentElement.parentElement.parentElement.parentElement.classList.contains(
            "header__bottom-basket-hover-list-item"
          ) &&
          event?.target.parentElement.parentElement.parentElement.parentElement.dataset.id === item.dataset.id &&
          event?.target.parentElement.parentElement.parentElement.parentElement.children[0].children[1].children[1].children[0].textContent.trim() ===
            item.children[1].children[1].children[1].children[0].textContent.trim()
        ) {
          item.children[2].children[0].children[0].children[1].textContent =
            event?.target.parentElement.children[1].textContent.trim();
          item.children[2].children[0].children[1].textContent =
            event?.target.parentElement.parentElement.children[1].textContent.trim();
          if (Number(item.children[2].children[0].children[0].children[1].textContent) <= 0) {
            item.remove();
            basketTotalText[0].textContent = "0 BYN";
          }
        }
      }
      setCountInBasket();
    });
    personalWeightInit();
  }).observe(hoverList, {
    childList: true,
    subtree: true,
  });
  // ----

  function initBasketItem() {
    if (localStorage.getItem("basket") === null) {
      return;
    }
    for (let i of JSON.parse(localStorage.getItem("basket"))) {
      const li = document.createElement("li");
      li.classList.add("basket__list-item");
      li.dataset.id = i.id;
      li.innerHTML = `
      <div style="display: ${i.promotion ? "block" : "none"}" class="basket__list-item-promotion">Акция</div>
        <div class="basket__list-item-img-wrap">
            <div class="basket__list-item-img">
                <img src="${i.src}" alt="${i.title}" />
            </div>
            <div class="basket__list-item-wrap">
            <a href="${i.href}" class="basket__list-item-title">
                ${i.title}
            </a>
            <ul class="basket__list-item-weight-list">
                ${i.weight.map(
                  (item) =>
                    `<li class='basket__list-item-weight-list-item slider__item-weight-list-item-active'>${item}</li>`
                )}
            </ul>
            ${i.weight.map((item) => {
              if (item.split(" ")[1] !== "шт") {
                return `
                <div class="basket__list-item-weight-wrap">
                    <p class="basket__list-item-weight-text">Указать свой вес</p>
                    <div class="basket__list-item-weight">
                        <input type="text" name="" id="" placeholder="Укажите вес" />
                        <button type="button">Применить</button>
                    </div>
                </div>`;
              }
            })}
    </div>
        </div>
    <div class="basket__list-action-wrap">
        <div class="basket__list-action-wrap-text">
            <div class="basket__list-action">
                <button type="button" class="minus">-</button>
                <div>${i.count}</div>
                <button type="button" class="plus">+</button>
            </div>
            <div class="basket__list-action-price">${(Math.floor(i.price * 100) / 100).toFixed(2)} BYN</div>
        </div>
        <div class="basket__list-action-img">
            <svg
                width="24.000000"
                height="24.000000"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
            >
                <defs>
                    <clipPath id="clip946_10662">
                        <rect
                            id="Delete"
                            width="24.000000"
                            height="24.000000"
                            fill="white"
                            fill-opacity="0"
                        />
                    </clipPath>
                </defs>
                <g clip-path="url(#clip946_10662)">
                    <path
                        id="Shape"
                        d="M12 1.75C13.7329 1.75 15.1494 3.10645 15.2446 4.81555L15.25 5L20.5 5C20.9141 5 21.25 5.33582 21.25 5.75C21.25 6.1297 20.9678 6.44348 20.6016 6.49316L20.5 6.5L19.7041 6.5L18.4238 19.5192C18.291 20.8683 17.1982 21.91 15.8628 21.9944L15.687 22L8.31299 22C6.95752 22 5.81348 21.0145 5.59863 19.6934L5.57617 19.5192L4.29492 6.5L3.5 6.5C3.12012 6.5 2.80664 6.21783 2.75684 5.85175L2.75 5.75C2.75 5.3703 3.03223 5.05652 3.39844 5.00684L3.5 5L8.75 5C8.75 3.20508 10.2051 1.75 12 1.75ZM18.1968 6.5L5.80176 6.5L7.06885 19.3724C7.12744 19.9696 7.6001 20.4343 8.18604 20.4936L8.31299 20.5L15.687 20.5C16.2871 20.5 16.7959 20.0751 16.9121 19.4982L16.9312 19.3724L18.1968 6.5ZM13.75 9.25C14.1299 9.25 14.4434 9.53217 14.4932 9.89825L14.5 10L14.5 17C14.5 17.4142 14.1641 17.75 13.75 17.75C13.3701 17.75 13.0566 17.4678 13.0068 17.1017L13 17L13 10C13 9.58582 13.3359 9.25 13.75 9.25ZM10.25 9.25C10.6299 9.25 10.9434 9.53217 10.9932 9.89825L11 10L11 17C11 17.4142 10.6641 17.75 10.25 17.75C9.87012 17.75 9.55664 17.4678 9.50684 17.1017L9.5 17L9.5 10C9.5 9.58582 9.83594 9.25 10.25 9.25ZM12 3.25C11.082 3.25 10.3286 3.95709 10.2559 4.85645L10.25 5L13.75 5C13.75 4.03351 12.9663 3.25 12 3.25Z"
                        fill="#212121"
                        fill-opacity="1.000000"
                        fill-rule="nonzero"
                    />
                </g>
            </svg>
        </div>
    </div>
        `;
      if (basketList?.children[0]?.classList.contains("basket__list-item-empty")) {
        basketList.innerHTML = "";
      }
      basketList.append(li);
    }
  }
  initBasketItem();

  let count = localStorage.getItem("basket") ? JSON.parse(localStorage.getItem("basket")).length : 0;

  function setCountInBasket() {
    if (localStorage.getItem("basket") === null) {
      return;
    }
    count = JSON.parse(localStorage.getItem("basket")).length;
    headerBottomBasketCount.textContent = count;
  }

  let basketItem = document.querySelectorAll(".basket__list-item");
  let basketArrayObj = [];

  function checkBasket() {
    if (JSON.parse(localStorage.getItem("basket")).length === 0) {
      const li = document.createElement("li");
      li.classList.add("basket__list-item-empty");
      li.innerText = "Ваша корзина пуста";
      basketList.append(li);
      const headerBottomHoverli = document.createElement("li");
      headerBottomHoverli.classList.add("header__bottom-hover-list-none");
      headerBottomHoverli.innerHTML = `Ваша корзина пуста`;
      headerBottomHoverList.append(headerBottomHoverli);
    }
  }
  function basketItems(e) {
    if (e.target.classList.contains("minus")) {
      basketArrayObj = JSON.parse(localStorage.getItem("basket"));
      for (let i of basketArrayObj) {
        if (
          i.id === e.currentTarget.dataset.id &&
          e.currentTarget.children[1].children[1].children[1].children[0].textContent.trim() === i.weight.join("")
        ) {
          if (i.count <= 1) {
            e.currentTarget.remove();
            basketArrayObj.includes(i) ? basketArrayObj.splice(basketArrayObj.indexOf(i), 1) : "";
          }
          i.count -= 1;
          i.initPrice === 0 ? (i.initPrice = i.price) : 0;
          i.price = parseFloat(i.price - i.initPrice).toFixed(2);
          e.target.parentElement.parentElement.children[1].textContent =
            (Math.floor(i.price * 100) / 100).toFixed(2) + " BYN";
          e.target.parentElement.children[1].textContent = i.count;
          localStorage.setItem("basket", JSON.stringify(basketArrayObj));
          checkBasket();
        }
      }
    } else if (e.target.classList.contains("plus")) {
      basketArrayObj = JSON.parse(localStorage.getItem("basket"));
      for (let i of basketArrayObj) {
        if (
          i.id === e.currentTarget.dataset.id &&
          e.currentTarget.children[1].children[1].children[1].children[0].textContent.trim() === i.weight.join("")
        ) {
          i.count += 1;
          i.price = parseFloat(i.count * i.initPrice).toFixed(2);
          e.target.parentElement.parentElement.children[1].textContent =
            (Math.floor(i.price * 100) / 100).toFixed(2) + " BYN";
          e.target.parentElement.children[1].textContent = i.count;
          localStorage.setItem("basket", JSON.stringify(basketArrayObj));
          setCountInBasket();
        }
      }
    }
    if (e.target.tagName === "path" || e.target.tagName === "svg") {
      basket = JSON.parse(localStorage.getItem("basket"));
      for (let i of basket) {
        if (
          i.id === e.currentTarget.dataset.id &&
          i.weight.join("") === e.currentTarget.children[1].children[1].children[1].children[0].textContent.trim()
        ) {
          basket.splice(basket.indexOf(i), 1);
          localStorage.setItem("basket", JSON.stringify(basket));
          basketList.innerHTML = "";
          initBasketItem();
          addBasketItemToHover();
          setCountInBasket();
          basketItem = document.querySelectorAll(".basket__list-item");
          basketItem.forEach((item) => {
            item.addEventListener("click", (e) => {
              basketItems(e);
            });
          });
        }
      }
      checkBasket();
    }
  }

  // add event to basket item
  basketItem.forEach((item) => {
    item.addEventListener("click", (e) => basketItems(e));
  });
  //---

  function addBasketItemToHover() {
    const basketArray = JSON.parse(localStorage.getItem("basket"));
    const headerBottomHoverList = document.querySelector(".header__bottom-basket-hover-list");
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
            <a href="#" class="header__bottom-basket-hover-list-item-title">
                ${i.title}
            </a>
            <ul class="header__bottom-basket-hover-list-item-weight-list">
                ${i.weight.map(
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

  function personalWeightInit() {
    const personalWeightBtn = document.querySelectorAll(".basket__list-item-weight-text");
    const personalWeightInput = document.querySelectorAll('.basket__list-item-weight input')
    personalWeightInput.forEach(item => {
      item.addEventListener('input', (e) => {
        e.currentTarget.value = e.currentTarget.value.replace(/[^-0-9-.]/, '')
      })
    })
    personalWeightBtn.forEach((item) => {
      item.removeEventListener("click", personalWeight);
      item.addEventListener("click", personalWeight);
    });
  }

  function personalWeight(e) {
    const listItem = e.currentTarget?.parentElement?.parentElement?.parentElement?.parentElement;
    const currentElem = e.currentTarget?.parentElement;
    const personalweightBlock = currentElem?.children[1];
    const inputvalue = personalweightBlock.children[0];
    const submitbtn = currentElem?.children[1]?.children[1];
    const basketValue = JSON.parse(localStorage.getItem("basket"));
    const weightValue = listItem.children[1].children[1].children[1].children[0].textContent.trim()
    if (personalweightBlock.style.display !== "flex") {
      personalweightBlock.style.display = "flex";
    } else {
      personalweightBlock.style.display = "none";
    }
    submitbtn.addEventListener("click", () => {
      basketValue.forEach((item) => {
        if (item.id === listItem.dataset.id && item.weight.join('') === weightValue) {
          if (+item.priceKg !== +inputvalue.value) {
            item.price = (item.priceKg.split(',').join('.') * inputvalue.value * item.count).toFixed(2);
            item.initPrice = (item.priceKg.split(',').join('.') * inputvalue.value * item.count).toFixed(2);
            item.weight.forEach((weight) => {
              if (weight.split(" ")[1] === "кг" || weight.split(" ")[1] === "л") {
                item.weight = [`${inputvalue.value} ${weight.split(" ")[1]}`];
              }
            });
            localStorage.setItem("basket", JSON.stringify(basketValue));
            basketItemsUpdate(e)
          }
        }
      });
    });
  }
function basketItemsUpdate(e) {
  basketList.innerHTML = ''
  initBasketItem()
  basketItem = document.querySelectorAll(".basket__list-item");
  basketItem.forEach((item) => {
    item.addEventListener("click", (e) => {
      basketItems(e);
    })})
    personalWeightInit()
}
  personalWeightInit();
});
