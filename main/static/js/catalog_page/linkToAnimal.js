const filterItem = document.querySelectorAll('.filter__type-list-item')


filterItem.forEach(item => {
    item.addEventListener('click', (e) => {
        window.location.href = `http://127.0.0.1:8000/catalog/${e.currentTarget.children[0].dataset.category}`
    })
})