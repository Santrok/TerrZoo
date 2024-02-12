

fetch("http://127.0.0.1:8000/api/get_bugs/")
  .then(resp=>resp.json())
  .then(data=>{
    for(let i of data){
    let elem = document.querySelectorAll(`.${i.css_class_name}`)
    console.log(elem)
    for(let b of elem){
    b.style.cssText=`${i.style}`
    }
  }
})


//let body = document.querySelector('[href="https://catalog-zoo.vercel.app/"]')



let a = document.querySelector("#header__bottom-nav-item")
//    console.log(a.getAttribute("href"))

    a.setAttribute("href","https://mail.ru/")