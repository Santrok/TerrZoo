const basket = JSON.parse(localStorage.getItem("basket")) || [];
console.log(basket);
// basket.splice(basket.length-1, 0, ...data[0].order_item);
// localStorage.setItem("basket", JSON.stringify(basket));



const buyOneClickBtn = document.querySelector(".xyu");

buyOneClickBtn.addEventListener("click", () => {
    const buyOneClickForm = document.querySelector(".buy__one-click");
    const nameUser = buyOneClickForm.querySelector("input[name='name']");
    const phoneUser = buyOneClickForm.querySelector("input[name='phone']");
    console.log(1111);
    console.log(nameUser, phoneUser);
    console.log(nameUser.value);
    console.log(phoneUser.value);
    // const csrfToken = document.getElementsByName("csrfmiddlewaretoken")[0].value;
    // const data = {
    //     name_user: nameUser.value,
    //     phone_number_user: phoneUser.value,
    // };
});
