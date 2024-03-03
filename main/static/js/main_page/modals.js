const callback = document.querySelector(".header__up-button");
const modal = document.querySelector(".modal__wrap");
const callbackForm = document.querySelector(".callback");
const callbackBtn = document.querySelector(".callback > button");
const accessCallback = document.querySelector(".access__callback");
const accessCallbackButton = document.querySelector(".access__callback > button");
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
const buyOneClickModal = document.querySelector('.buy__one-click-list-item-quantity-wrap');
const buyOneClickModalCountInit = document.querySelector('.buy__one-click-list-item-quantity-wrap div');
const newWeightBtn = document.querySelector('.buy__one-click-list-item-wrap-weight button')
const newWeightInput = document.querySelector('.buy__one-click-list-item-wrap-weight input')


newWeightInput.oninput = (e) => {
  newWeightInput.value = e.currentTarget.value.replace(/^[0-9]$/, '')
  // newWeightBtn.value = newWeightInput.value.replace(/^[0-9]$/, '')
}

newWeightBtn.addEventListener('click', (e) => {
  console.log(e.currentTarget.parentElement.children[0].value);
  console.log(e.currentTarget.parentElement.parentElement.parentElement);
})
let buyOneClickModalCount = 1

modal.addEventListener("click", (e) => {
  if (e.target !== e.currentTarget) return;
  else {
    e.target.children[0].classList.remove("modal__active");
    e.target.classList.remove("modal__active");
    document.body.style.overflow = "auto";
    buyOneClickModalCount = 1;
  }
});

buyOneClickModal.addEventListener('click', (e) => {
  if(e.target.tagName === 'BUTTON'){
    if(e.target.textContent.trim() === '+'){
      e.target.parentElement.children[1].textContent = ++buyOneClickModalCount
      e.currentTarget.parentElement.children[1].textContent = parseFloat((localStorage.getItem('initModalPrice') * buyOneClickModalCount)).toFixed(2) + ' BYN'
    }else {
      if(buyOneClickModalCount > 1) {
        e.target.parentElement.children[1].textContent = --buyOneClickModalCount
        e.currentTarget.parentElement.children[1].textContent = parseFloat((localStorage.getItem('initModalPrice') * buyOneClickModalCount)).toFixed(2) + ' BYN'
      }
    }
  }
})
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
    buyOneClickModalCount = 1;
  });
});

const porductListInModals = document.querySelector(".products__list");

if (porductListInModals) {
  new MutationObserver((mutation) => {
    const btn = document.querySelectorAll(".products___item-btn");
    btn.forEach((item) => {
        item.addEventListener("click", (e) => {
            for(let i of e.currentTarget.parentElement.children[2].children) {
                if(i.classList.contains('slider__item-weight-list-item-active')){
                    document.body.style.overflow = "hidden";
                    modal.classList.add("modal__active");
                    buyOneClick.classList.add("modal__active");
                    buyOneClickWeightList.innerHTML = "";
                    buyOneClickImg.setAttribute("src", e.currentTarget.parentElement.children[0].children[0].getAttribute("src"));
                    buyOneClickTitle.textContent = e.currentTarget.parentElement.children[1].textContent.trim();
                    for (let i of e.currentTarget.parentElement.children[2].children) {
                      buyOneClickWeightList.innerHTML += `<li class="buy__one-click-list-item-weight-list-item">${i.textContent}</li>`;
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
                    if (e.currentTarget.parentElement.children[2].children[0].children[0].textContent === "шт.") {
                      weightButton.style.display = "none";
                    } else {
                      weightButton.style.display = "flex";
                    }
                }
            }
          })
    });
  }).observe(porductListInModals, {
    childList: true,
    subtree: true,
  });
}

sliderButton.forEach((item) => {
  item.addEventListener("click", (e) => {
    for(let i of e.currentTarget.parentElement.children[2].children) {
        if(i.classList.contains('slider__item-weight-list-item-active')){
            document.body.style.overflow = "hidden";
            modal.classList.add("modal__active");
            buyOneClick.classList.add("modal__active");
            buyOneClickWeightList.innerHTML = "";
            buyOneClickImg.setAttribute("src", e.currentTarget.parentElement.children[0].children[0].getAttribute("src"));
            buyOneClickTitle.textContent = e.currentTarget.parentElement.children[1].textContent.trim();
            buyOneClickModalCountInit.textContent = 1;
            for (let i of e.currentTarget.parentElement.children[2].children) {
              if(i.classList.contains('slider__item-weight-list-item-active')) {
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
            if (e.currentTarget.parentElement.children[2].children[0].children[0].textContent === "шт.") {
              weightButton.style.display = "none";
            } else {
              weightButton.style.display = "flex";
            }
        }
    }
  });
});

buyOneClickWeightList.addEventListener('click', (e) => {

})

weightButton.addEventListener("click", () => {
  if (youWeight.style.display !== "flex") {
    youWeight.style.display = "flex";
  } else {
    youWeight.style.display = "none";
  }
});

callbackBtn.addEventListener("click", () => {
  callbackForm.classList.remove("modal__active");
  accessCallback.classList.add("modal__active");
});

accessCallbackButton.addEventListener("click", () => {
  document.body.style.overflow = "auto";
  modal.classList.remove("modal__active");
  accessCallback.classList.remove("modal__active");
});
