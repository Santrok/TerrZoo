const filterItem = document.querySelectorAll('.filter__type-list-item > ul')


filterItem.forEach(item => {
    if(filterItem){
        for(let i of item.children) {
            // i.classList.replace('filter__type-list-item','filter__item-inner')   
            i?.children[1].classList.replace('filter__type-list-item-label','brand__list-item-label')
            i?.children[1].classList.add('checkbox__category')
            i?.children[0].classList.add('filter__inner')
            i?.children[0].setAttribute('type', 'checkbox')
            i?.children[0].setAttribute('name', 'subtype')
        }    
    }
    
})



