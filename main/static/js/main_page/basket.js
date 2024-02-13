const sliderItemBasketBtn = document.querySelectorAll('.slider__item-basket');
const headerBottomBasketCount = document.querySelector('.header__bottom-basket > p')



let count = 0;
headerBottomBasketCount.textContent = count
const basketArrayObj = []   

sliderItemBasketBtn.forEach(item => {
    item.addEventListener('click', (e) => {
        let array = []
        for(let i of Array.from(e.currentTarget.parentElement.parentElement.children[2].children)){
            array.push(i.textContent.trim())
        }
        basketArrayObj.push({
            src : e.currentTarget.parentElement.parentElement.children[0].children[0].src,
            title : e.currentTarget.parentElement.parentElement.children[1].textContent.trim(),
            weight : array,
            price:e.currentTarget.parentElement.parentElement.children[3].children[0].textContent.trim()
        })     
        localStorage.setItem('basket', JSON.stringify(basketArrayObj));
        count++
        headerBottomBasketCount.textContent = count
    })
})