const addToBasket = document.querySelector('.about__product-basket-btn')

addToBasket.addEventListener('click', (e) => {
    for(let i of e.currentTarget.parentElement.parentElement.children[0].children[0].children[1].children) {
        if (i.classList.contains('about__product-weight-list-item-active')) {
            const basket = JSON.parse(localStorage.getItem('basket')) !== null ? JSON.parse(localStorage.getItem('basket')) : []
            console.log(basket);
            basket.push({
                
            })
        }
    }
})