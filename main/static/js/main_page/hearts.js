const hearts = document.querySelectorAll('.slider__item-hearts') 
const heartsArr = []
hearts.forEach(item => {
    item.addEventListener('click', (e) => {
        item.classList.toggle('slider__item-hearts-active')
        if (item.classList.contains('slider__item-hearts-active')) {
            heartsArr.push({
 
            })
        }
        localStorage.setItem('heartsProduct', JSON.stringify(heartsArr))
    })
})