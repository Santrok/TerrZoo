let button = document.querySelector("#add_old_order_for_basket");
let order_id = button.dataset.json;
let basket = JSON.parse(localStorage.getItem("basket"));

button.addEventListener("click", add_basket);

function add_basket() {
    fetch(`http://127.0.0.1:8000/api/get_old_order_for_basket/${order_id}/`)
        .then((response) => response.json())
        .then((data) => {
            basket.splice(basket.length-1, 0, ...data[0].order_item);
            console.log(basket);
            localStorage.setItem("basket", JSON.stringify(basket));
        })
}
