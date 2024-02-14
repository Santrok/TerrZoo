const eventItem = document.querySelectorAll('.catalog__filter-mob  li')
let queryStr = "?"
for (let i of eventItem) {
    i.addEventListener("change", (e) => {
        const eventItem1 = document.querySelectorAll('.catalog__filter-mob  li')
        if (e.target.checked == true || e.target.checked == false) {
            let count = 0
            for (let li of eventItem1) {
                if (li.children[0].checked) {
                    if (li.children[0].dataset.sale) {
                        queryStr += `sale=${li.children[0].dataset.sale}&`
                    }
                    if (li.children[0].dataset.category) {
                        queryStr += `category_id=${li.children[0].dataset.category}&`
                    }
                    if (li.children[0].dataset.brand) {
                        count += 1
                        queryStr += `brand_id__in=${li.children[0].dataset.brand}&`
                    }
                }
            }
        }

        fetch(`http://127.0.0.1:8000/api/get_products_filter/${queryStr}`)
            .then(resp => console.log(resp.status))
        queryStr = '?'
    })

}

