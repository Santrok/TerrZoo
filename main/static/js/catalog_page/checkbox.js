const filterItem = document.querySelector('.filter__type-list-item > ul')

if(filterItem){
    for(let i of filterItem.children) {
        i?.children[1].classList.replace('filter__type-list-item-label','brand__list-item-label')
        i?.children[0].classList.replace('filter__type-list-item-hide', 'brand__type-list-item-hdie')
        i?.children[0].setAttribute('name', 'subtype')
    }    
}


