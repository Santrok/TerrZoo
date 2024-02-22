const hearts = document.querySelectorAll('.slider__item-hearts') 
const heartsArr = []
hearts.forEach(item => {
    for(let i of JSON.parse(localStorage.getItem('heartsProduct'))) {
        if(i.id === item.parentElement.dataset.id) {
            item.classList.add('slider__item-hearts-active')
        }
    }
    item.addEventListener('click', (e) => {
        item.classList.toggle('slider__item-hearts-active')
        const heartsProduct = JSON.parse(localStorage.getItem('heartsProduct'))
        for(let i of heartsProduct) {
            if(i.id === e.currentTarget.parentElement.dataset.id) {
                heartsArr.splice(heartsProduct.indexOf(i), 1)
                localStorage.setItem('heartsProduct', JSON.stringify(heartsArr))
                return
            }
        }
        if (item.classList.contains('slider__item-hearts-active')) {
            let heartsWeight = []            
            for(let i of e.currentTarget.parentElement?.children[2]?.children){
                heartsWeight.push(i.textContent.trim())
            }
            
            heartsArr.push({
                id: e.currentTarget.parentElement.dataset.id,
                src: e.currentTarget.parentElement.children[0].children[0].src,
                link: e.currentTarget.parentElement.children[1].href,
                title: e.currentTarget.parentElement.children[1].textContent,
                weight: heartsWeight,
                price: {
                    old: e.currentTarget?.parentElement?.children[3]?.children[0]?.children[0]?.children[0]?.textContent,
                    new:e.currentTarget?.parentElement?.children[3]?.children[0]?.children[0]?.children[1]?.children[0]?.textContent
                }
            })
        }
        localStorage.setItem('heartsProduct', JSON.stringify(heartsArr))
    })
})