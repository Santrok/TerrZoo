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
                    let insertResultData = document.querySelector('.ARTEM_ARET')


                    for (let item of data.results) {
                        insertResultData.innerHTML += `<a href=http://127.0.0.1:8000/details/${item.id} style=color:red>${item.title}</p>`
                    }
                })
        } else {
            let insertResultData = document.querySelector('.ARTEM_ARET')
            insertResultData.innerHTML = ''
        }
    }
})