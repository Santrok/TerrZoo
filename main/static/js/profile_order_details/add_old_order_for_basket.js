
let button = document.querySelector(".button");
let jsonData = button.dataset.json;

let basket = JSON.parse(localStorage.getItem("basket"));

console.log(jsonData, basket)

obr_sob.addEventListener("click", get_level_1);







// function auth(data){
//     let url = null
//     'password2' in data ? url = 'http://127.0.0.1:8000/api/v1/profile/register/': url = 'http://127.0.0.1:8000/api/v1/profile/login/'
//     const csrftoken = getCookie('csrftoken')
//     data['csrftoken'] = csrftoken
//     async function postData(url, data) {
//         const response = await fetch(url, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 'X-CSRFToken': csrftoken,
//                 mode: 'same-origin',
//                 // 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//             body: JSON.stringify(data),
//         });
//         return await response.json();
//     }