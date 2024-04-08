const callback = document.querySelector(".header__up-button");
const modal = document.querySelector(".modal__wrap");
const callbackForm = document.querySelector(".callback");
const callbackBtn = document.querySelector(".callback > button");
const accessCallback = document.querySelector(".access__callback");
const accessCallbackButton = document.querySelector(".access__callback > button");
const errorCallback = document.querySelector(".error__callback");
const errorCallbackButton = document.querySelector(".error__callback > button");
const footerButtonCallcallback = document.querySelector(".footer__bottom-button");
const cross = document.querySelectorAll(".cross");
const buyOneClick = document.querySelector(".buy__one-click");
let sliderButton = document.querySelectorAll(".slider__item-btn");
const buyOneClickImg = document.querySelector(".buy__one-click-list-item-img > img");
const buyOneClickTitle = document.querySelector(".buy__one-click-list-item-title");
const buyOneClickWeightList = document.querySelector(".buy__one-click-list-item-weight-list");
const buyOneClickPrice = document.querySelector(".buy__one-click-list-item-quantity > p");
const weightButton = document.querySelector(".buy__one-click-list-item-wrap-weight-title");
const youWeight = document.querySelector(".buy__one-click-list-item-wrap-weight");
const buyOneClickModal = document.querySelector(".buy__one-click-list-item-quantity-wrap");
const buyOneClickModalCountInit = document.querySelector(".buy__one-click-list-item-quantity-wrap div");
const newWeightBtn = document.querySelector(".buy__one-click-list-item-wrap-weight button");
const newWeightInput = document.querySelector(".buy__one-click-list-item-wrap-weight input");
const aboutProductBuy = document.querySelector(".about__product-buy");
const aboutProductInput = document.querySelector(".about__product-action input");
const nameInputCallback = document.querySelector('.callback__field-item input[name="name"]');
const phoneInputCallback = document.querySelector('.callback__field-item input[name="phone"]');
const nameInputOneClick = document.querySelector('.buy__one-click-list-item-field input[name="name"]');
const phoneInputOneClick = document.querySelector('.buy__one-click-list-item-field input[name="phone"]');
const oneClickSend = document.querySelector('.button_buy_one_click')
const productsListWishList = document.querySelector('.products__list')
// regexp for name input
nameInputCallback.oninput = (e) => {
  e.currentTarget.value = e.currentTarget.value.replace(/[^\sа-яё]/gi, '')
}
// regexp for name input
nameInputOneClick.oninput = (e) => {
  e.currentTarget.value = e.currentTarget.value.replace(/[^\sа-яё]/gi, '')
}
// regexp for phone input
phoneInputOneClick.oninput = () => {
  phoneInputOneClick.value = phoneInputOneClick.value.replace(/[^0-9()+\s-]/g, "");
  phoneInputOneClick.addEventListener('keydown', (e) => {
      const key = e.key
      if (key !== 'Backspace' && key !== 'Delete') {
        if (phoneInputOneClick.value.length === 4) {
          phoneInputOneClick.value += ' ('
        }
        if (phoneInputOneClick.value.length === 8) {
          phoneInputOneClick.value += ') '
        }
        if (phoneInputOneClick.value.length === 13) {
          phoneInputOneClick.value += '-'
        }
        if (phoneInputOneClick.value.length === 16) {
          phoneInputOneClick.value += '-'
        }
      } 
  })
}
// regexp for phone input
phoneInputCallback.oninput = () => {
  phoneInputCallback.value = phoneInputCallback.value.replace(/[^0-9()+\s-]/g, "");
  phoneInputCallback.addEventListener('keydown', (e) => {
      const key = e.key
      if (key !== 'Backspace' && key !== 'Delete') {
        if (phoneInputCallback.value.length === 4) {
          phoneInputCallback.value += ' ('
        }
        if (phoneInputCallback.value.length === 8) {
          phoneInputCallback.value += ') '
        }
        if (phoneInputCallback.value.length === 13) {
          phoneInputCallback.value += '-'
        }
        if (phoneInputCallback.value.length === 16) {
          phoneInputCallback.value += '-'
        }
      } 
  })
}
newWeightInput.oninput = () => {
  newWeightInput.value = newWeightInput.value.replace(/[^0-9/.]/, "");
};

newWeightBtn.addEventListener("click", (e) => {
  if (newWeightInput.value !== "") {
    localStorage.setItem(
      "buyOneClickPrice",
      (parseFloat(localStorage.getItem("pricePerOneKg").split(",").join(".")) * newWeightInput.value).toFixed(2)
    );
    e.currentTarget.parentElement.parentElement.parentElement.children[1].children[0].textContent =
      newWeightInput.value + " кг.";
    e.currentTarget.parentElement.parentElement.parentElement.parentElement.children[2].children[1].textContent =
      (parseFloat(localStorage.getItem("pricePerOneKg").split(",").join(".")) * newWeightInput.value).toFixed(2) +
      " BYN";
      let obj = JSON.parse(localStorage.getItem('oneClickItem'))
      obj.weight = newWeightInput.value + " кг."
      obj.price = (parseFloat(localStorage.getItem("pricePerOneKg").split(",").join(".")) * newWeightInput.value).toFixed(2)
      localStorage.setItem('oneClickItem', JSON.stringify(obj))
  }
});
localStorage.setItem("buyOneClickPrice", buyOneClickPrice.textContent);
localStorage.setItem("buyOneClickModalCount", 1);

modal.addEventListener("click", (e) => {
  if (e.target !== e.currentTarget) return;
  else {
    for (let i of e.target.children) {
      i.classList.remove("modal__active");
    }
    e.target.children[0].classList.remove("modal__active");
    e.target.classList.remove("modal__active");
    document.body.style.overflow = "auto";
    buyOneClickModalCountInit.textContent = JSON.parse(localStorage.getItem("buyOneClickModalCount"));
    youWeight.style.display = "none";
  }
});

buyOneClickModal.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    let count = localStorage.getItem("buyOneClickModalCount");
    if (e.target.textContent.trim() === "+") {
      let obj = JSON.parse(localStorage.getItem('oneClickItem'))
      localStorage.setItem("buyOneClickModalCount", ++count);
      e.target.parentElement.children[1].textContent = localStorage.getItem("buyOneClickModalCount");
      e.currentTarget.parentElement.children[1].textContent =
        parseFloat(
          localStorage.getItem("pricePerOneKg").split(",").join(".") * localStorage.getItem("initWeight").split(",").join(".") * count
        ).toFixed(2) + " BYN";
        obj.price = parseFloat(
          localStorage.getItem("pricePerOneKg").split(",").join(".") * localStorage.getItem("initWeight").split(',').join('.') * count
        ).toFixed(2)

        obj.count = count
        localStorage.setItem('oneClickItem', JSON.stringify(obj))
    } else {
      if (count > 1) {
        let obj = JSON.parse(localStorage.getItem('oneClickItem'))
        localStorage.setItem("buyOneClickModalCount", --count);
        e.target.parentElement.children[1].textContent = localStorage.getItem("buyOneClickModalCount");
        e.currentTarget.parentElement.children[1].textContent =
          parseFloat(
            localStorage.getItem("pricePerOneKg").split(",").join(".") * localStorage.getItem("initWeight").split(',').join('.') * count
          ).toFixed(2) + " BYN";
          obj.price = parseFloat(
            localStorage.getItem("pricePerOneKg").split(",").join(".") * localStorage.getItem("initWeight").split(',').join('.') * count
          ).toFixed(2)
          obj.count = localStorage.getItem("buyOneClickModalCount", --count);
          localStorage.setItem('oneClickItem', JSON.stringify(obj))
      }
    }
  }
});

callback.addEventListener("click", () => {
  document.body.style.overflow = "hidden";
  modal.classList.add("modal__active");
  callbackForm.classList.add("modal__active");
});

footerButtonCallcallback.addEventListener("click", () => {
  document.body.style.overflow = "hidden";
  modal.classList.add("modal__active");
  callbackForm.classList.add("modal__active");
});

cross.forEach((item) => {
  item.addEventListener("click", () => {
    item.parentElement.classList.remove("modal__active");
    item.parentElement.parentElement.classList.remove("modal__active");
    document.body.style.overflow = "auto";
  });
});

const porductListInModals = document.querySelector(".products__list");

if (porductListInModals) {
  new WebKitMutationObserver((mutation) => productListBuyOneClick()).observe(porductListInModals, {
    childList: true,
    subtree: true,
  });
}


function productListBuyOneClick() {
  const btn = document.querySelectorAll(".products___item-btn");
  btn.forEach((item) => {
    item.addEventListener("click", (e) => {
      for (let i of e.currentTarget.parentElement.children[2].children) {
        if (i.classList.contains("slider__item-weight-list-item-active")) {
          document.body.style.overflow = "hidden";
          modal.classList.add("modal__active");
          buyOneClick.classList.add("modal__active");
          buyOneClickWeightList.innerHTML = "";
          buyOneClickImg.setAttribute(
            "src",
            e.currentTarget.parentElement.children[0].children[0].children[0].getAttribute("src")
          );
          buyOneClickTitle.textContent = e.currentTarget.parentElement.children[1].textContent.trim();
          localStorage.setItem('initWeight', i.textContent.trim().split(' ').splice(0,1).join(''));
          for (let i of e.currentTarget.parentElement.children[2].children) {
            if (i.classList.contains("slider__item-weight-list-item-active")) {
              buyOneClickWeightList.innerHTML += `<li class="buy__one-click-list-item-weight-list-item slider__item-weight-list-item-active">${i.textContent}</li>`;
            }
          }
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
        }
      }
      buyOneClickModalEvent(e)
    });
  });
}

if(window.location.href === `${localStorage.getItem('baseUrl')}/wishlist/`) {
  productListBuyOneClick()
}

sliderButton.forEach((item) => {
  item.addEventListener("click", (e) => {
    for (let i of e.currentTarget.parentElement.children[2].children) {
      if (i.classList.contains("slider__item-weight-list-item-active")) {
        document.body.style.overflow = "hidden";
        modal.classList.add("modal__active");
        buyOneClick.classList.add("modal__active");
        buyOneClickWeightList.innerHTML = "";
        buyOneClickImg.setAttribute("src", e.currentTarget.parentElement.children[0].children[0].children[0].getAttribute("src"));
        buyOneClickTitle.textContent = e.currentTarget.parentElement.children[1].textContent.trim();
        buyOneClickModalCountInit.textContent = 1;
        buyOneClickWeightList.innerHTML += `<li class="buy__one-click-list-item-weight-list-item slider__item-weight-list-item-active">${i.textContent}</li>`;
        localStorage.setItem('initWeight', i.textContent.trim().split(' ').splice(0,1).join(''));
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
      }
    }
    buyOneClickModalEvent(e)
  });
});

weightButton.addEventListener("click", () => {
  if (youWeight.style.display !== "flex") {
    youWeight.style.display = "flex";
  } else {
    youWeight.style.display = "none";
  }
});

callbackBtn.addEventListener("click", () => {
  const form = document.querySelector(".callback");
  const nameUser = form.querySelector("input[name='name']");
  const phoneUser = form.querySelector("input[name='phone']");
  const csrfToken = document.getElementsByName("csrfmiddlewaretoken")[0].value;
  const data = {
    name_user: nameUser.value,
    phone_number_user: phoneUser.value,
  };
  fetch(`${localStorage.getItem('baseUrl')}/manager_tasks/callback/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then((errorData) => {
          throw new Error(errorData.message);
        });
      }
    })
    .then((data) => {
      callbackForm.classList.remove("modal__active");
      accessCallback.classList.add("modal__active");
      nameUser.value = "";
      phoneUser.value = "";
    })
    .catch((error) => {
      callbackForm.classList.remove("modal__active");
      errorCallback.classList.add("modal__active");
    });
});

accessCallbackButton.addEventListener("click", () => {
  document.body.style.overflow = "auto";
  modal.classList.remove("modal__active");
  accessCallback.classList.remove("modal__active");
});

errorCallbackButton.addEventListener("click", () => {
  document.body.style.overflow = "auto";
  modal.classList.remove("modal__active");
  errorCallback.classList.remove("modal__active");
});

aboutProductBuy?.addEventListener("click", (e) => {
  for (let i of e.currentTarget.parentElement.parentElement.children[0].children[0].children[1].children) {
    if (i.classList.contains("about__product-weight-list-item-active")) {
      document.body.style.overflow = "hidden";
      modal.classList.add("modal__active");
      buyOneClick.classList.add("modal__active");
      buyOneClickWeightList.innerHTML = "";
      buyOneClickImg.setAttribute(
        "src",
        e.currentTarget.parentElement.parentElement.parentElement.children[0].children[0].children[0].getAttribute(
          "src"
        )
      );
      buyOneClickTitle.textContent =
        e.currentTarget.parentElement.parentElement.parentElement.parentElement.children[0].children[0].textContent.trim();
      buyOneClickWeightList.innerHTML += `<li class="buy__one-click-list-item-weight-list-item slider__item-weight-list-item-active">${i.children[0].textContent.trim()}</li>`;
      let pricePerOneKg;
      // Checking for DOM items, because choosing your weight goes away
      if (e.currentTarget?.parentElement?.parentElement?.children[3].classList?.contains("about__product-price-wrap")) {
        // Cheking for DOM items because there are stocks
        if (
          e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].classList.contains(
            "about__product-price-promotion-noaction-price"
          )
        ) {
          buyOneClickPrice.textContent =
            parseFloat(
              e.currentTarget.parentElement.parentElement.children[3].children[0].children[1].dataset.priceperonekg *
                localStorage.getItem("totalWeightDetail")
            ).toFixed(2) + " BYN";
          pricePerOneKg =
            e.currentTarget.parentElement.parentElement.children[3].children[0].children[1].dataset.priceperonekg;
          buyOneClickModalCountInit.textContent = aboutProductInput.value;
          localStorage.setItem("buyOneClickModalCount", buyOneClickModalCountInit.textContent.trim());
        } else {
          buyOneClickPrice.textContent =
            parseFloat(
              e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].dataset.priceperonekg
                .split(",")
                .join(".") * localStorage.getItem("totalWeightDetail")
            ).toFixed(2) + " BYN";
          pricePerOneKg =
            e.currentTarget.parentElement.parentElement.children[3].children[0].children[0].dataset.priceperonekg;
          buyOneClickModalCountInit.textContent = aboutProductInput.value;
          localStorage.setItem("buyOneClickModalCount", buyOneClickModalCountInit.textContent.trim());
        }
        // ----
      } else {
        // Cheking for DOM items because there are stocks
        if (
          e.currentTarget.parentElement.parentElement.children[2].children[0].children[0].classList.contains(
            "about__product-price-promotion-noaction-price"
          )
        ) {
          buyOneClickPrice.textContent =
            parseFloat(
              e.currentTarget.parentElement.parentElement.children[2].children[0].children[1].dataset.priceperonekg *
                localStorage.getItem("totalWeightDetail")
            ).toFixed(2) + " BYN";
          pricePerOneKg =
            e.currentTarget.parentElement.parentElement.children[2].children[0].children[1].dataset.priceperonekg;
          buyOneClickModalCountInit.textContent = aboutProductInput.value;
          localStorage.setItem("buyOneClickModalCount", buyOneClickModalCountInit.textContent.trim());
        } else {
          buyOneClickPrice.textContent =
            parseFloat(
              e.currentTarget.parentElement.parentElement.children[2].children[0].children[0].dataset.priceperonekg
                .split(",")
                .join(".") * localStorage.getItem("totalWeightDetail")
            ).toFixed(2) + " BYN";
          pricePerOneKg =
            e.currentTarget.parentElement.parentElement.children[2].children[0].children[0].dataset.priceperonekg;
          buyOneClickModalCountInit.textContent = aboutProductInput.value;
          localStorage.setItem("buyOneClickModalCount", buyOneClickModalCountInit.textContent.trim());
        }
      }
      //----
      localStorage.setItem("pricePerOneKg", pricePerOneKg);
    }
  }
});

function buyOneClickModalEvent(e) {
  let array = [];
  for (let i of Array.from(e.currentTarget.parentElement.children[2].children)) {
    if (i.classList.contains("slider__item-weight-list-item-active")) {
      array.push(i.textContent.trim());
    }
  }
  // Get the basket array from local storage, or initialize an empty array
  let oneClickItemArr = JSON.parse(localStorage.getItem("oneClickItem")) || {};
  console.log(111);
  // Get the price of the item, considering promotion and weight options
  let price = Array.from(
    e.currentTarget.parentElement.children[4]?.classList.contains("slider__item-promotion") ||
      e.currentTarget.parentElement.children[4]?.classList.contains("products___item-promotion")
      ? e.currentTarget.parentElement.children[3].children[0].children[0].children[1].children[0].textContent.trim()
      : e.currentTarget.parentElement.children[3].children[0].textContent.trim()
  ).splice(0, 6);
  // If weight options are selected, add the item to the basket
    oneClickItemArr = {
      count: 1, // The initial count of the item
      id: e.currentTarget.parentElement.dataset.id, // The ID of the item
      title: e.currentTarget.parentElement.children[1].textContent.trim(), // The title of the item
      src: e.currentTarget.parentElement.children[0].children[0].children[0].src, // The src of the item's image
      weight: array, // The selected weight options
      initPrice: +parseFloat(price.join("")).toFixed(2), // The initial price of the item
      price: +parseFloat(price.join("")).toFixed(2), // The current price of the item
      promotion:
        e.currentTarget.parentElement.children[4]?.classList.contains("slider__item-promotion") ||
        e.currentTarget.parentElement.children[4].classList.contains("products___item-promotion")
          ? true
          : false, // Whether the item is on promotion
      href: e.currentTarget.parentElement.children[1].href, // The href of the item's link
    };
    if(oneClickItemArr.weight[0].split(" ").splice(1, 1).join("") === 'шт') {
      weightButton.style.display = "none";
    }else {
      weightButton.style.display = "flex";
    }
    localStorage.setItem("oneClickItem", JSON.stringify(oneClickItemArr));
}

oneClickSend.addEventListener('click', () => {
  let storage = JSON.parse(localStorage.getItem("oneClickItem"));
  storage.name = nameInputOneClick.value
  storage.phone = phoneInputOneClick.value
  localStorage.setItem("oneClickItem", JSON.stringify(storage))
})



