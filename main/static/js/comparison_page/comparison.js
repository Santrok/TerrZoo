function getComparison(url) {
  fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      let productsList = document.querySelector(".product__list");
      productsList.innerHTML = "";
      for (let i of data.results) {
        let li = document.createElement("li");
        li.classList.add("product__list-item");
        li.innerHTML = `
        <div class="product__item-img">
            <img src="${i.image_prev}" alt="${i.image_prev}">
        </div>
        <a href="/details/${i.id}" class="product__item-title">
            ${i.title}
        </a>
        <p class="product__item-title-brand">
            Бренд:
        </p>
        <p class="product__item-brand">
            ${i.brand.name}
        </p>
        <p class="product__item-title-price">
            Стоимость <span>${i.countitemproduct_set[0].unit}</span>:
        </p>
        <p class="product__item-price">${i.price}</p>
        <p class="product__item-title-compound">Состав: </p>
        <p class="product__item-compound">${i.compound}</p>
        <p class="product__item-title-supplements">Добавки: </p>
        <p class="product__item-supplements">${i.nutritional_supplements}</p>
    `;
        productsList.append(li);
      }
    })
    .catch((error) => {
      productsList.innerHTML = "";
    });
}

getComparison(
  `${localStorage.getItem('baseUrl')}/api/get_products_list/?id__in=${JSON.parse(localStorage.getItem("comparisonList"))[0]}${
    localStorage.getItem("viewed").length > 1
      ? JSON.parse(localStorage.getItem("comparisonList"))
          .splice(1, JSON.parse(localStorage.getItem("comparisonList")).length)
          .map((item) => `&id__in=${item}`)
          .join("")
      : ``
  }`
);
