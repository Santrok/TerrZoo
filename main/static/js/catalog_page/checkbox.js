const filterItem = document.querySelector('.filter__type-list-item > ul')

// let observer = new MutationObserver(mutations => {
//     console.log(mutations);
// })

// console.log(observer);

// observer.observe(filterItem, {
//     type:"attributes",
//     subtree: true, 
//     childList: true
// })

for(let i of filterItem.children) {
    console.log(i);
    i.children[1].classList.replace('filter__type-list-item-label','brand__list-item-label')
    i.children[0].classList.replace('filter__type-list-item-hide', 'brand__type-list-item-hdie')
    i.children[0].setAttribute('name', 'subtype')
    console.log(i.children[0].checked);
}



