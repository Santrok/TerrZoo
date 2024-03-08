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
const buyOneClickModal = document.querySelector('.buy__one-click-list-item-quantity-wrap');
const buyOneClickModalCountInit = document.querySelector('.buy__one-click-list-item-quantity-wrap div');
const newWeightBtn = document.querySelector('.buy__one-click-list-item-wrap-weight button')
const newWeightInput = document.querySelector('.buy__one-click-list-item-wrap-weight input')

newWeightInput.oninput = () => {
  newWeightInput.value = newWeightInput.value.replace(/[^0-9/.]/, '')
}

newWeightBtn.addEventListener('click', (e) => {
  if(newWeightInput.value !== '') {
    console.log(newWeightInput.value);
    localStorage.setItem('buyOneClickPrice', (parseFloat(localStorage.getItem('pricePerOneKg').split(',').join('.')) * newWeightInput.value).toFixed(2))
    e.currentTarget.parentElement.parentElement.parentElement.children[1].children[0].textContent = newWeightInput.value + ' кг.'
    e.currentTarget.parentElement.parentElement.parentElement.parentElement.children[2].children[1].textContent = (parseFloat(localStorage.getItem('pricePerOneKg').split(',').join('.')) * newWeightInput.value).toFixed(2) + ' BYN'
  }
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
      e.currentTarget.parentElement.children[1].textContent = (parseFloat(localStorage.getItem('buyOneClickPrice')) * buyOneClickModalCount).toFixed(2) + ' BYN'
    }else {
      if(buyOneClickModalCount > 1) {
        e.target.parentElement.children[1].textContent = --buyOneClickModalCount
        e.currentTarget.parentElement.children[1].textContent = (parseFloat(localStorage.getItem('buyOneClickPrice')) * buyOneClickModalCount).toFixed(2) + ' BYN'
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
    const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    const data = {
        name_user: nameUser.value,
        phone_number_user: phoneUser.value
    };
    fetch(`http://127.0.0.1:8000/manager_tasks/callback/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then((errorData) => {
                    throw new Error(errorData.message);
                });
        }})
        .then((data) => {
            callbackForm.classList.remove("modal__active");
            accessCallback.classList.add("modal__active");
            nameUser.value='';
            phoneUser.value='';
            console.log(data.message)
        })
        .catch((error) => {
            callbackForm.classList.remove("modal__active");
            errorCallback.classList.add("modal__active");
            console.log('Ошибка: ' + error.message)
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
