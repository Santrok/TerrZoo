let button = document.querySelectorAll(".add_old_order_for_basket");
let basket = JSON.parse(localStorage.getItem("basket")) || [];

for (let i of button) {
    let order_id = i.dataset.json;
    i.addEventListener("click", () => add_basket(order_id));
}


function add_basket(orderId) {
    fetch(`http://127.0.0.1:8000/api/get_old_order_for_basket/${orderId}/`)
        .then((response) => response.json())
        .then((data) => {
            basket.splice(basket.length-1, 0, ...data[0].order_item);
            localStorage.setItem("basket", JSON.stringify(basket));
        })
}
