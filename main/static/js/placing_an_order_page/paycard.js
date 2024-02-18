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
const data_storage =JSON.parse(localStorage.getItem("basket"))


function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}


function send_form(){
    let data =  new FormData(form_payment)
        data.append("basket",JSON.stringify(data_storage))

      fetch("http://127.0.0.1:8000/placing_an_order/",{
                                                        method:"POST",
                                                        headers:{
                                                                 "X-CSRFToken":getCookie("csrftoken")
                                                                 },
                                                        body:data
  })

}
//-----------------------------------------------------------