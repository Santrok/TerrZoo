document.querySelector("#pay_online").oninput = (ev) => {
    if (ev.target.checked){
        document.querySelector("#num_paycard_1_4").disabled = false;
        document.querySelector("#num_paycard_5_8").disabled = false;
        document.querySelector("#num_paycard_9_12").disabled = false;
        document.querySelector("#num_paycard_13_16").disabled = false;
        document.querySelector("#date").disabled = false;
        document.querySelector("#CVV").disabled = false;
    }
}

//-----------------------------------------------------------------------
const form_payment = document.querySelector(".info_about_client_form")
const button_order = document.querySelector(".button_order")
      button_order.addEventListener("click", send_form)
const order_price = document.querySelector(".order_price")
const product_count = document.querySelector(".product_count")
const data_storage =JSON.parse(localStorage.getItem("basket"))
let price =0
let count =0
for(let i of data_storage){
                             price=price+i.price
                             count = count+i.count
                             }
order_price.innerHTML=price
product_count.innerHTML=count


function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function send_form(){
    let data =  new FormData(form_payment)
        data.append("basket",JSON.stringify(data_storage))
        data.append("order_price",JSON.stringify(price))
        data.append("product_count",JSON.stringify(count))
    if(document.querySelector("#cash").checked || document.querySelector("#pay_online").checked){
     fetch("http://127.0.0.1:8000/placing_an_order/",{
                                                        method:"POST",
                                                        headers:{
                                                                 "X-CSRFToken":getCookie("csrftoken")
                                                                 },
                                                        body:data
                                  })
                                  .then(resp=>resp.json())
                                  .then(data=>{
                                                console.log(data.order_number)
                                                if(data.error){
                                                let er=document.querySelector(".error")
                                                el.innerHTML=`<p style="color:red">${data.error}</p>`
                                                }else{
                                                  if(document.querySelector("#cash").checked){
                                                      let happy= document.querySelector(".block_placing_an_order")
                                                      happy.innerHTML = `<h1 style='color:black; font-family: SF Pro Text;font-size:30px;font-weight:500;'>Заказ №${data.order_number}  оформлен, оплата на пункте выдачи</h1>`
                                                  }else{
                                                      let happy= document.querySelector(".block_placing_an_order")
                                                      happy.innerHTML = `<h1 style='color:black; font-family: SF Pro Text;font-size:30px;font-weight:500;'>Заказ № ${data.order_number}оформлен, чек отправлен на email</h1>`
                                                  }
                                                  }
                                  })
                                    }


}
//-----------------------------------------------------------