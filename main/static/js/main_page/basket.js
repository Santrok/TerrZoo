const sliderItemBasketBtn = document.querySelectorAll(".slider__item-basket");
const productItemBtn = document.querySelectorAll(".products___item-basket");
const headerBottomBasketCount = document.querySelector(".header__bottom-basket > p");
const headerBottomHoverList = document.querySelector(".header__bottom-basket-hover-list");
const headerBottomHover = document.querySelector(".header__bottom-basket-hover");
const sliderItemWeightList = document.querySelectorAll(".slider__item-weight-list-item");

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

let count = localStorage.getItem("basket") ? JSON.parse(localStorage.getItem("basket")).length : 0;
headerBottomBasketCount.textContent = count;
let basketArrayObj = [];

function setCountInBasket() {
    count = JSON.parse(localStorage.getItem("basket")).length;
    headerBottomBasketCount.textContent = count;
}

function setCountItem(e) {
    if (e.target.tagName === "BUTTON") {
        if (e.target.classList.contains("minus")) {
            basketArrayObj = JSON.parse(localStorage.getItem("basket"));
            for (let i of basketArrayObj) {
                if (i.id === e.target.parentElement.parentElement.parentElement.parentElement.dataset.id) {
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
                if (i.id === e.target.parentElement.parentElement.parentElement.parentElement.dataset.id) {
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
    ).splice(0, 5);
    price.splice(price.indexOf(","), 1, ".");
    if (array.length !== 0) {
        basketArrayObj.push({
            count: 1,
            id: e.currentTarget.parentElement.parentElement.dataset.id,
            title: e.currentTarget.parentElement.parentElement.children[1].textContent.trim(),
            src: e.currentTarget.parentElement.parentElement.children[0].children[0].src,
            weight: array,
            initPrice: parseFloat(price.join("")),
            price: parseFloat(price.join("")),
        });
        localStorage.setItem("basket", JSON.stringify(basketArrayObj));
        setCountInBasket();
    }
}

function addBasketItemToHover() {
    const basketArray = JSON.parse(localStorage.getItem("basket"));
    const basketHoverListItem = document.querySelectorAll(".header__bottom-basket-hover-list-item-title");
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
            <h3 class="header__bottom-basket-hover-list-item-title">
                ${i.title}
            </h3>
            <ul class="header__bottom-basket-hover-list-item-weight-list">
                ${i.weight.map(
                    (item) =>
                        `<li class='header__bottom-basket-hover-list-item-weight-list-item slider__item-weight-list-item-active'>${item}</li>`
                )}}
            </ul>
            <div class="header__bottom-basket-hover-list-item-wrap-weight-wrap">
                <h4 class="header__bottom-basket-hover-list-item-wrap-weight-title">
                    Указать свой вес
                </h4>
                <div class="header__bottom-basket-hover-list-item-wrap-weight">
                    <input type="text" name="weight" id="" placeholder="Укажите вес">
                    <button type="button">
                        Применить
                    </button>
                </div>
            </div>
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

productItemBtn.forEach((item) => {
    item.addEventListener("click", (event) => {
        addBasketItemToLocalStorage(event);
        addBasketItemToHover();
    });
});
