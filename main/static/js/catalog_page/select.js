const select = document.querySelector('.catalog__sort-select')
const selectList = document.querySelector('.catalog__sort-select-list')
const selectListItem = document.querySelectorAll('.catalog__sort-select-list-item')
const catalogSelectActive = document.querySelector('.catalog__sort-select-active')

select.addEventListener('click', () => {
    selectList.classList.toggle('catalog__sort-select-list-active')
})

selectListItem.forEach(item => {
    item.addEventListener('click', () => {
        catalogSelectActive.innerText = item.innerText
        catalogSelectActive.setAttribute("data-order",item.dataset.order)
    })
})