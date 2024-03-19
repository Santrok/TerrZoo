const filterLiListItem = document.querySelectorAll('.filter__type-list-item')


filterLiListItem.forEach(item => {
    item.addEventListener('click', (e) => {
        window.location.href = `${localStorage.getItem('baseUrl')}/catalog/${e.currentTarget.children[0].dataset.animal}`
    })
})