const basketList = document.querySelector(".basket__list");


function initBasketItem() { 

    for(let i of JSON.parse(localStorage.getItem('basket'))){
        const li = document.createElement("li");
        li.classList.add('basket__list-item')
    }

}

initBasketItem()

console.log(basketList);