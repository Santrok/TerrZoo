const payOnlineCheckbox = document.querySelector("#pay_online");

if (payOnlineCheckbox) {
  payOnlineCheckbox.oninput = (ev) => {
    if (ev.target.checked) {
      document.querySelector("#num_paycard_1_4").disabled = false;
      document.querySelector("#num_paycard_5_8").disabled = false;
      document.querySelector("#num_paycard_9_12").disabled = false;
      document.querySelector("#num_paycard_13_16").disabled = false;
      document.querySelector("#date").disabled = false;
      document.querySelector("#CVV").disabled = false;
    }
  };
}

//-----------------------------------------------------------------------
const form_payment = document.querySelector(".info_about_client_form");
const button_order = document.querySelector(".button_order");
const order_price = document.querySelector(".order_price");
const product_count = document.querySelector(".product_count");
const data_storage = JSON.parse(localStorage.getItem("basket"));
const sliderItemBasketBtn = document.querySelectorAll(".slider__item-basket");
const headerBottomBasketCount = document.querySelector(".header__bottom-basket > p");
const headerBottomBasketValueMob = document.querySelector('.header__bottom-basket-value')
let pricePayCard = 0;
let countPayCard = 0;
for (let i of data_storage) {
  pricePayCard += +parseFloat(i.price)
  countPayCard = countPayCard + i.count;
}
if(localStorage.getItem('oneClickItem')) {
  order_price.innerHTML = `${JSON.parse(localStorage.getItem('oneClickItem')).price} BYN`;
  product_count.innerHTML = JSON.parse(localStorage.getItem('oneClickItem')).count;
}else {
  order_price.innerHTML = `${pricePayCard.toFixed(2)} BYN`;
  product_count.innerHTML = countPayCard;
}

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}


function addBasketItemToHover() {
  const basketArray = JSON.parse(localStorage.getItem("basket"));
  let basketCount = 0;
  const headerBottomHoverList = document.querySelector(".header__bottom-basket-hover-list");
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

function setCountInBasket() {
  if(localStorage.getItem("basket") === null) {
      return
  }
  countFunc = JSON.parse(localStorage.getItem("basket"))?.length;
  headerBottomBasketCount.textContent = countPayCard;
  headerBottomBasketValueMobMain.textContent = countPayCard
}

//-----------------------------------------------------------
// фукнции заполения формы для доставки/самовывоза

const orderReceivingPickup = document.querySelector('#pickup')
const orderReceivingCourierDelivery = document.querySelector('#courier_deliver')
const storeForPickup = document.querySelector('#stores_for_pickup')
const addressForCourierDelivery = document.querySelector('#info_for_courier_deliver')

orderReceivingPickup.addEventListener('click',()  => {
  storeForPickup.style.display = 'flex';
  addressForCourierDelivery.style.display = 'none'
})
orderReceivingCourierDelivery.addEventListener('click',()  => {
  storeForPickup.style.display = 'none';
  addressForCourierDelivery.style.display = 'flex'
})