document.querySelector("#pay_online").oninput = (ev) => {
  if (ev.target.checked) {
    document.querySelector("#num_paycard_1_4").disabled = false;
    document.querySelector("#num_paycard_5_8").disabled = false;
    document.querySelector("#num_paycard_9_12").disabled = false;
    document.querySelector("#num_paycard_13_16").disabled = false;
    document.querySelector("#date").disabled = false;
    document.querySelector("#CVV").disabled = false;
  }
};

//-----------------------------------------------------------------------
const form_payment = document.querySelector(".info_about_client_form");
const button_order = document.querySelector(".button_order");
button_order.addEventListener("click", send_form);
const order_price = document.querySelector(".order_price");
const product_count = document.querySelector(".product_count");
const data_storage = JSON.parse(localStorage.getItem("basket"));
const sliderItemBasketBtn = document.querySelectorAll(".slider__item-basket");
const headerBottomBasketCount = document.querySelector(".header__bottom-basket > p");
const headerBottomBasketValueMob = document.querySelector('.header__bottom-basket-value')
let pricePayCard = 0;
let countPayCard = 0;
for (let i of data_storage) {
  pricePayCard = (pricePayCard + i.price);
  
  
  countPayCard = countPayCard + i.count;
}
order_price.innerHTML = `${pricePayCard.toFixed(2)} BYN`;
product_count.innerHTML = countPayCard;

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function send_form() {
  let data = new FormData(form_payment);
  data.append("basket", JSON.stringify(data_storage));
  data.append("order_price", JSON.stringify(pricePayCard));
  data.append("product_count", JSON.stringify(countPayCard));
  let check = "";
  if (document.querySelector("#cash").checked) {
    check = document.querySelector("#cash").id;
  } else if (document.querySelector("#pay_online").checked) {
    check = document.querySelector("#pay_online").id;
  }
  data.append("check", check);
  if (document.querySelector("#cash").checked || document.querySelector("#pay_online").checked) {
    fetch("http://127.0.0.1:8000/placing_an_order/", {
      method: "POST",
      headers: {
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
      console.log(data)
        if (data.error) {

          let er = document.querySelector(".error");
          er.innerHTML = `<p style="color:red">${data.error}</p>`;
        } else {
          if (document.querySelector("#cash").checked) {
            let happy = document.querySelector(".block_placing_an_order");
            happy.innerHTML = `<h1 style='color:black; font-family: SF Pro Text;font-size:30px;font-weight:500;'>Заказ №${data.order_number} оформлен, оплата на пункте выдачи</h1>`;
            localStorage.setItem("basket", JSON.stringify([]));
            countPayCard=0
            setCountInBasket()
            addBasketItemToHover()
          } else {
            let happy = document.querySelector(".block_placing_an_order");
            happy.innerHTML = `<h1 style='color:black; font-family: SF Pro Text;font-size:30px;font-weight:500;'>Заказ №${data.order_number} оформлен, чек отправлен на email:${data.user_email}</h1>`;
            localStorage.setItem("basket", JSON.stringify([]));
            countPayCard =0
            addBasketItemToHover()
            setCountInBasket()
          }
        }
      });
  }
}
//-----------------------------------------------------------
// фукнции обновления счетчика в корзине и выпадающего меню

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
  headerBottomBasketValueMob.textContent = countPayCard
}
