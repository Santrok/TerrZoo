const formButton = document.querySelector('#button')
formButton.addEventListener('click',getValuesForm)


function getValuesForm(){
    const form = document.querySelector('#info_order')
    const orderPrice = document.querySelector('.order_price')
    const basketArray = localStorage.getItem("basket") || null
    const oneClickItem = localStorage.getItem('oneClickItem') || null
    console.log(oneClickItem)
    let valuesToFetch = new FormData()
    valuesToFetch.append('basket',basketArray)
    valuesToFetch.append('oneClickItem',oneClickItem)
    valuesToFetch.append('order_price',orderPrice.innerText)

    for (let i of form){
        if (i.id !== 'pickup' && i.id !== 'courier_deliver' && i.className !== 'stores_for_pickup' && i.className !== 'input_item_active'
        && i.className !== 'input_item_active_num_paycard' && i.name !=='payment_method' && i.className !== 'input_item_active_CVV_paycard'
        && i.className !== 'info_for_courier_deliver' && i.className !== 'input_item_active_date_paycard' && i.className !== 'button_order'
        && i.className !== 'paycard'){
            valuesToFetch.append(i.name,i.value)
        }
        if (i.id ==='pickup' && i.checked){
            let selectData = document.querySelector('#stores_for_pickup')
            valuesToFetch.append(i.name,i.id)
            valuesToFetch.append('address',selectData.value)
        }
        if (i.id === 'courier_deliver' && i.checked){
            let fieldsetData = document.querySelector('#info_for_courier_deliver')
            valuesToFetch.append(i.name, i.id)
            for ( let i of fieldsetData.children){
                if( i.name !== undefined ) {
                    valuesToFetch.append(i.name,i.value)
                }
            }
        }
        if (i.id === 'pay_online' && i.checked) {
            valuesToFetch.append(i.name,i.id)
            let paymentOnline = document.querySelector('.paycard')
            for (let i of paymentOnline.children) {
               for (let a of i.children){
                   valuesToFetch.append(a.name,a.value)
               }
            }
        }
        if (i.id === 'cash' && i.checked) {
            valuesToFetch.append(i.name,i.id)
        }
    }
    fetch(`${localStorage.getItem('baseUrl')}/placing_an_order/`, {
      method: "POST",
      headers: {
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: valuesToFetch
    })
      .then((resp) => resp.json())
        .then(data=>{
            if (data.error) {
                          let er = document.querySelector(".error");
                          er.innerHTML = `<p style="color:red; margin-top: 10px">${data.error}</p>`;
                        } else {
                          if (document.querySelector("#cash").checked) {
                            let happy = document.querySelector(".block_placing_an_order");
                            happy.innerHTML = `<h1 style='color:black; font-family: SF Pro Text;font-size:30px;font-weight:500;'>Заказ №${data.order_number} оформлен, оплата при получение заказа</h1>
                            <div style='display:flex; align-items:center; justify-content: center; margin-top: 40px'>
                            <a href='${localStorage.getItem('baseUrl')}/catalog/'
                            style='
                            border-radius: 4px;
                            box-shadow: inset 0px -1px 0px 0px rgba(0, 0, 0, 0.2),0px 1px 0px 0px rgba(0, 0, 0, 0.08);
                            background: rgb(0, 160, 172);
                            padding: 12px 24px;
                            color: rgb(255, 255, 255);
                            font-family: SF Pro Text;
                            font-size: 14px;
                            font-weight: 500;
                            line-height: 20px;
                            letter-spacing: 0px;
                            text-align: center;
                            max-width: 800px;
                            max-height: 44px;
                            margin: 0 auto;'>
                            Продолжить покупки</a>
                            </div>`;
                            if (oneClickItem  !== null) {
                                localStorage.setItem("oneClickItem", JSON.stringify([]));
                            } else {
                                localStorage.setItem("basket", JSON.stringify([]));
                            }
                            countPayCard=0
                            setCountInBasket()
                            addBasketItemToHover()
                          } else {
                            let happy = document.querySelector(".block_placing_an_order");
                            happy.innerHTML = `<h1 style='color:black; font-family: SF Pro Text;font-size:30px;font-weight:500;'>Заказ №${data.order_number} оформлен, чек отправлен на email:${data.user_email}</h1>
                            <div style='display:flex; align-items:center; justify-content: center; margin-top: 40px'>
                            <a href='${localStorage.getItem('baseUrl')}/catalog/'
                            style='
                            border-radius: 4px;
                            box-shadow: inset 0px -1px 0px 0px rgba(0, 0, 0, 0.2),0px 1px 0px 0px rgba(0, 0, 0, 0.08);
                            background: rgb(0, 160, 172);
                            padding: 12px 24px;
                            color: rgb(255, 255, 255);
                            font-family: SF Pro Text;
                            font-size: 14px;
                            font-weight: 500;
                            line-height: 20px;
                            letter-spacing: 0px;
                            text-align: center;
                            max-width: 800px;
                            max-height: 44px;
                            margin: 0 auto;'>
                            Продолжить покупки</a>
                            </div>`;
                            if (oneClickItem  !== null) {
                                localStorage.setItem("oneClickItem", JSON.stringify([]));
                            } else {
                                localStorage.setItem("basket", JSON.stringify([]));
                            }
                            countPayCard =0
                            addBasketItemToHover()
                            setCountInBasket()
                          }
                        }
        });
}

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}


const dataItem = document.querySelector('.input_item_active_date_paycard')
if (dataItem) {
    dataItem.oninput = (e) => {
        dataItem.value = e.currentTarget.value.replace(/[^0-9\/]/, '')
        dataItem.addEventListener('keydown', (e) => {
            const key = e.key
            if (key === 'Backspace' || key === 'Delete') {
                dataItem.value = dataItem.value.slice(0, dataItem.value.length)
            } else {
                if (dataItem.value.length === 2) {
                    dataItem.value += ' /'
                }
            }
        })
    }
}

document.addEventListener('DOMContentLoaded', function() {
  const payOnlineRadio = document.getElementById('pay_online');
  const payCash = document.getElementById('cash');
  const onlinePaymentFields = document.getElementById('online_payment_fields');
  if (payOnlineRadio) {
      payOnlineRadio.addEventListener('change', function () {
          if (payOnlineRadio.checked) {
              onlinePaymentFields.style.display = 'flex';
          }
      });
      payCash.addEventListener('change', function () {
          if (payCash.checked) {
              onlinePaymentFields.style.display = 'none';
          }
      });
  }
});