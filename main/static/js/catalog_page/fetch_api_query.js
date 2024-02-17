document.addEventListener("DOMContentLoaded", () => {
    const selectActive = document.querySelector('.catalog__sort-select-active')
    const eventItem = document.querySelectorAll(".catalog__filter-mob li");
    const filterInner = document.querySelectorAll('.filter__inner');
    let k = document.querySelectorAll(".johan")



function fn(e){

    console.log(e.currentTarget)
//    e.currentTarget.children[0].classList.toggle("filter__brand-active")
  }


    for(let i of filterInner) {
        i.addEventListener('click', fn)
        console.log(i)
    }
    let queryStr = "?";
    for (let i of eventItem) {
        i.addEventListener("change", (e) => {
            const eventItem1 = document.querySelectorAll(".catalog__filter-mob li");
            if (e.target.checked == true || e.target.checked == false) {
                let count = 0;
                for (let li of eventItem1) {
                    if (li.children[0].checked) {
                        if (li.children[0].dataset.sale) {
                            queryStr += `sale__percent__gt=${li.children[0].dataset.sale}&`;
                        }
                        if (li.children[0].dataset.category) {
                            // проверку нужно добавить на удаление из строки category_id, когда чекбокс отжимаешь или переходишь на другой товар, без дополнителного выбора
                            queryStr += `category_id__in=${li.children[0].dataset.category}&`;
                        }
                        if (li.children[0].dataset.brand) {
                            count += 1;
                            queryStr += `brand_id__in=${li.children[0].dataset.brand}&`;
                        }
//                        if(e.currentTarget.children[2]) {
//                            for(let j = 0;  j < e.currentTarget.children[2].children[0].children.length; j++) {
//                                e.currentTarget.children[2].children[j].children[0].setAttribute('checked', true)
//                            }
//                        }else {
//                            const filterIner = document.querySelectorAll('.filter__inner')
//                            for(let i of filterIner) {
//                                console.log(i.value);
//                                i.removeAttribute('checked')
//                            }
//                        }
                    }
                     console.log(queryStr)
                }

                // таска: собрать с инпута сортировки данные, ключ order_by=
            }

            fetch(`http://127.0.0.1:8000/api/get_products_filter/${queryStr}`)
                .then((resp) => resp.json())
                .then((data) => {
                    // console.log(data.results);
                    if (data) {
                        const productList = document.querySelector(".products__list");
                        productList.innerHTML = "";
                        for (let i of data.results) {
                            const li = document.createElement("li");
                            li.classList.add("product__list-item");
                            li.innerHTML = `
                            <article class="products___item" data-id="${i.id}">
                            <div class="products___item-img">
                                <img src="${i.image_prev}" alt="item" />
                            </div>
                            <a href="http://127.0.0.1:8000/details/${i.id}" class="products___item-title">
                                ${i.title}
                            </a>
                            <ul class="slider__item-weight-list">
                                {% for count in product.countitemproduct.all %}
                                    ${i.countitemproduct?.map(item => `<li class="slider__item-weight-list-item" data-weight-id="${i.id}">${item.value} <span>${item.unit}</span></li>`).join('')} 
                                {% endfor %}
                            </ul>
                            <div class="products___item-price-basket">
                                <div class="products___item-price-basket-wrap">
                                    ${i.sale?.percent ?
                                `<div class="products___item-price-wrap">
                                    <p class="products___item-price-promotion">
                                        ${i.sale.percent}
                                    </p>
                                    <div class="products___item-price-currency-wrap">
                                        <p class="products___item-price">${i.price}</p>
                                    <p class="products___item-currency">
                                        BYN
                                    </p>
                                    </div>
                                </div>` 
                                : ''}
                                    ${i.sale?.percent ?
                                        `` 
                                        : 
                                `<div class="products___item-price-wrap">
                                    <p class="products___item-price">${i.price}</p>
                                    <p class="products___item-currency">BYN</p>
                                </div>
                                `}
                                </div>
                                <div class="products___item-basket">
                                    <div class="products___item-basket-text">+</div>
                                    <div class="products___item-basket-img">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M1 1C1 0.447715 1.44932 0 2.00358 0H3.50894C4.34034 0 5.01431 0.671572 5.01431 1.5V2.06055L17.5883 2.96818C18.4651 3.02278 19.1089 3.81081 18.9846 4.67739L18.1194 10.7121C18.0135 11.4511 17.3783 12 16.6292 12H5.01431V14H15.0572C16.72 14 18.068 15.3431 18.068 17C18.068 18.6569 16.72 20 15.0572 20C13.3945 20 12.0465 18.6569 12.0465 17C12.0465 16.6494 12.1069 16.3128 12.2178 16H6.85015C6.9611 16.3128 7.02147 16.6494 7.02147 17C7.02147 18.6569 5.67352 20 4.01073 20C2.34795 20 1 18.6569 1 17C1 15.6938 1.83779 14.5825 3.00716 14.1707V3.00923C3.00711 3.00372 3.00711 2.99821 3.00716 2.99268V2H2.00358C1.44932 2 1 1.55228 1 1ZM5.01431 4.06445V10H16.194L16.9208 4.93051L5.01431 4.06445ZM14.0537 17C14.0537 16.4477 14.503 16 15.0572 16C15.6115 16 16.0608 16.4477 16.0608 17C16.0608 17.5523 15.6115 18 15.0572 18C14.503 18 14.0537 17.5523 14.0537 17ZM3.00716 17C3.00716 16.4477 3.45647 16 4.01073 16C4.56499 16 5.01431 16.4477 5.01431 17C5.01431 17.5523 4.56499 18 4.01073 18C3.45647 18 3.00716 17.5523 3.00716 17Z"
                                                fill="#5C5F62"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            ${i.sale?.percent 
                            ? 
                            `<div class="products___item-promotion">
                                Акция
                            </div>` :
                            ''}
                            <button type="button" class="products___item-btn">Купить в 1 клик</button>
                        </article>
                        `;
                            productList.append(li);
                        }
                    }
                });
            queryStr = "?";
        });
    }
});
