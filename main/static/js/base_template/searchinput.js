document.addEventListener("DOMContentLoaded", () => {
    // Получение элементов для событий

    const searchInput = document.querySelector("#search__input")
    searchInput.addEventListener('input', fetchQueryParams)
    searchInput.addEventListener('keyup', getPageCatalog)


    function getPageCatalog(e) {
        if (e.code === "Enter") {
            window.location.href = 'http://127.0.0.1:8000/search/'
        }
    }
    function fetchQueryParams(event) {
        if (searchInput.value.length >= 3) {
            fetch(`http://127.0.0.1:8000/api/get_search_product/?title=${searchInput.value}`)
                .then(resp => resp.json())
                .then(data => {
                    localStorage.setItem("result_search_objects", JSON.stringify(data.results))
                    let insertResultData = document.querySelector('.search__drop-down')
                    insertResultData.style.display = 'block'
                    insertResultData.innerHTML = ''
                    for (let item of data.results) {
                        insertResultData.innerHTML += `<a class="search__drop-down-item" href=http://127.0.0.1:8000/details/${item.id}>
                            <div class="search__drop-down-item-img">
                                <img src="${item.image_prev}" alt="item">
                            </div>
                            <p class="search__drop-down-item-title">${item.title}</p>
                        </a>`
                    }
                })
        } else {
            let insertResultData = document.querySelector('.search__drop-down')
            insertResultData.style.display = 'none'
            insertResultData.innerHTML = ''
        }
    }
})