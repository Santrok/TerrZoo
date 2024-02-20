const basketList = document.querySelector(".basket__list");
const headerBottomBasketCount = document.querySelector(".header__bottom-basket > p");
const hoverList = document.querySelector(".header__bottom-basket-hover-list");
function initBasketItem() {
  if (localStorage.getItem("basket") === null) {
    return;
  }
  for (let i of JSON.parse(localStorage.getItem("basket"))) {
    const li = document.createElement("li");
    li.classList.add("basket__list-item");
    li.dataset.id = i.id;
    li.innerHTML = `
    <div class="basket__list-item-promotion">Акция</div>
        <div class="basket__list-item-img-wrap">
            <div class="basket__list-item-img">
                <img src="${i.src}" alt="${i.title}" />
            </div>
            <div class="basket__list-item-wrap">
            <a href="#" class="basket__list-item-title">
                ${i.title}
            </a>
            <ul class="basket__list-item-weight-list">
                ${i.weight.map(
                  (item) =>
                    `<li class='basket__list-item-weight-list-item slider__item-weight-list-item-active'>${item}</li>`
                )}
            </ul>
            ${i.weight.map((item) => {
              if (item.split(" ")[1] !== "шт.") {
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
    if (basketList.children[0].classList.contains("basket__list-item-empty")) {
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

const basketItem = document.querySelectorAll(".basket__list-item");
let basketArrayObj = [];

basketItem.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (e.target.classList.contains("minus")) {
      basketArrayObj = JSON.parse(localStorage.getItem("basket"));
      for (let i of basketArrayObj) {
        if (i.id === e.currentTarget.dataset.id) {
          if (i.count <= 1) {
            e.currentTarget.remove();
            basketArrayObj.includes(i) ? basketArrayObj.splice(basketArrayObj.indexOf(i), 1) : "";
          }
          i.count -= 1;
          i.initPrice === 0 ? (i.initPrice = i.price) : 0;
          i.price = Number(i.price - i.initPrice);
          e.target.parentElement.parentElement.children[1].textContent =
            (Math.floor(i.price * 100) / 100).toFixed(2) + " BYN";
          e.target.parentElement.children[1].textContent = i.count;
          localStorage.setItem("basket", JSON.stringify(basketArrayObj));
        }
      }
    } else if (e.target.classList.contains("plus")) {
      basketArrayObj = JSON.parse(localStorage.getItem("basket"));
      for (let i of basketArrayObj) {
        if (i.id === e.currentTarget.dataset.id) {
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
  });
});


new MutationObserver((mutation) => {
  const list = document.querySelectorAll('.header__bottom-basket-hover-list-item');
  console.log(list.length > list.length + 1);
  if(list.length > list.length + 1) {
    initBasketItem()
  }
  list.forEach((item) => {
    console.log(event?.currentTarget?.children[1]?.children[1].children[1].children[0].textContent.trim(), 'event');
    console.log(item.children[0].children[1].children[1].children[0].textContent.trim(), 'item');
    if(event.currentTarget.classList === 'header__bottom-basket-hover') {
      if(event?.currentTarget?.dataset.id === item.dataset.id && event?.currentTarget?.children[1]?.children[1].children[1].children[0].textContent.trim() === item.children[0].children[1].children[1].children[0].textContent.trim()) {
        item.children[0].children[2].children[0].children[1].textContent = event.currentTarget.children[2].children[0].children[0].children[1].textContent.trim()
        item.children[0].children[2].children[1].textContent = event.currentTarget.children[2].children[0].children[1].textContent.trim()
        if(Number(item.children[0].children[2].children[0].children[1].textContent.trim()) === 0) {
          item.remove()
          setCountInBasket()
        }
      }
    }else {
      
    }
    
  })
}).observe(basketList, {
  childList: true,  
  subtree: true,
});

new MutationObserver((mutation) => {
  const list = document.querySelectorAll('.basket__list-item');;
  list.forEach((item) => {
    if(event?.target.parentElement.parentElement.parentElement.parentElement.dataset.id === item.dataset.id && event?.currentTarget?.children[1]?.children[1].children[1].children[0].textContent.trim() === item.children[0].children[1].children[1].children[0].textContent.trim()) {
      item.children[2].children[0].children[0].children[1].textContent = event?.target.parentElement.children[1].textContent.trim();
      item.children[2].children[0].children[1].textContent = event?.target.parentElement.parentElement.children[1].textContent.trim();
      if(Number(item.children[2].children[0].children[0].children[1].textContent.trim()) === 0) {
        item.remove();
        setCountInBasket()
      }
    }
  })
}).observe(hoverList, {
  childList: true,  
  subtree: true,
});


