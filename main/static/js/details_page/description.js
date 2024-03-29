const descriptionItem = document.querySelectorAll('.about__product-weight-list-item')

localStorage.setItem('buyOneClickModalCount', 1)

descriptionItem.forEach(item => {
    item.addEventListener('click', (e) => {
        descriptionItem.forEach(el => {
            if(el.classList.contains('about__product-weight-list-item-active')) {
                el.classList.remove('about__product-weight-list-item-active')
            }
            item.classList.add('about__product-weight-list-item-active')
        })    
        const aboutProductPrice = document.querySelector('.about__product-price')
        const aboutProductWeight = document.querySelector('.about__product-price-weight > span')
        const aboutProductActionInput = document.querySelector('.about__product-action input')
        aboutProductPrice.innerHTML = e.currentTarget.children[1].textContent.trim()
        aboutProductWeight.innerHTML = e.currentTarget.children[0].textContent.trim() + '.'
        aboutProductActionInput.value = 1;
        localStorage.setItem('initWeight', e.currentTarget.children[0].textContent.trim().split(',').join('.').split(' ').splice(0,1).join(''))
        localStorage.setItem('totalWeightDetail', e.currentTarget.children[0].textContent.trim().split(',').join('.').split(' ').splice(0,1).join(''))
        localStorage.setItem('buyOneClickModalCount', 1)
    })
})