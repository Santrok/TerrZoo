const productsListWish = document.querySelector(".products__list");
let wishList = JSON.parse(localStorage.getItem("heartsProduct"));
const wishListCount = document.querySelector('.wishlist__title p span')

new WebKitMutationObserver(() => {
    wishList = JSON.parse(localStorage.getItem("heartsProduct"))
    wishListCount.textContent = wishList?.length
}).observe(productsListWish,{
    childList: true,
    subtree: true
})

for (let i of wishList) {
  let li = document.createElement("li");
  li.classList.add("products__list-item");
  li.innerHTML += `
  <article class="products___item" data-id="${i.id}">
                <a href="${localStorage.getItem('baseUrl')}/details/${i.id}" class="products___item-img-link">
                    <div class="products___item-img">
                        <img src="${i.src}" alt="${i.title}" />
                    </div>
                </a>
               <a href="${localStorage.getItem('baseUrl')}/details/${
                 i.id
               }" class="products___item-title">
                   ${i.title}
               </a>
               <ul class="slider__item-weight-list">
                       ${i.weight
                         ?.map(
                           (item) =>
                             `<li class="slider__item-weight-list-item" data-weight-id="${
                               i.id
                             }" data-weight-price="${
                               i.price?.new ? parseFloat((item?.split(' ').splice(0, 1).join('').split(',').join('.')) * i?.price?.new?.split(',').join('.')).toFixed(2) : i?.price?.old
                             }">${item.split(" ").splice(0,1).join('')}<span> ${item.split(" ").splice(1).join("")}</span></li>`
                         )
                         .join("")}
               </ul>
               <div class="products___item-price-basket">
                   <div class="products___item-price-basket-wrap">
                       ${
                         i.price?.new
                           ? `<div class="products___item-price-wrap">
                       <p class="products___item-price-promotion">
                       ${i.price.old}
                       </p>
                       <div class="products___item-price-currency-wrap">
                           <p class="products___item-price" data-pricePerOneKg="${i.price.new}">${i.price.new}</p>
                       <p class="products___item-currency">
                           BYN
                       </p>
                       </div>
                   </div>`
                           : ""
                       }
                       ${
                         i.price?.new
                           ? ``
                           : `<div class="products___item-price-wrap">
                       <p class="products___item-price" data-pricePerOneKg="${i.price.old}">${i.price.old}</p>
                       <p class="products___item-currency">BYN</p>
                   </div>
                   `
                       }
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
               ${
                 i.promotion
                   ? `<div class="products___item-promotion">
                   Акция
               </div>`
                   : ""
               }
               <button type="button" class="products___item-btn">Купить в 1 клик</button>
               <div class="slider__item-hearts">
              <div class="slider__item-hearts-wrap">
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  data-testid="icon"
                  class=""
                  >
                  <path
                      xmlns="http://www.w3.org/2000/svg"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.30845 6.64165C6.00566 5.805 7.02478 5.19995 8.23072 5.19995C10.0058 5.19995 11.0834 5.94938 11.923 6.72841C12.7626 5.94938 13.8403 5.19995 15.6153 5.19995C16.8213 5.19995 17.8404 5.805 18.5376 6.64165C19.2314 7.47416 19.6461 8.57744 19.6461 9.69226C19.6461 10.4698 19.3137 11.2349 18.8738 11.9333C18.4267 12.643 17.8152 13.3666 17.1428 14.0773C16.3226 14.9444 15.3422 15.8607 14.4 16.7413C13.8267 17.2772 13.2675 17.7999 12.7671 18.2902C12.2983 18.7496 11.5478 18.7496 11.0789 18.2902C10.5786 17.7999 10.0194 17.2772 9.44602 16.7413C8.50383 15.8607 7.52343 14.9444 6.70323 14.0773C6.03085 13.3666 5.41934 12.643 4.97226 11.9333C4.5323 11.2349 4.19995 10.4698 4.19995 9.69226C4.19995 8.57744 4.61469 7.47416 5.30845 6.64165Z"
                      fill="#e6e8eb"
                  ></path>
                  </svg>
              </div>
              </div>
           </article>
`;
productsListWish.append(li)
}
