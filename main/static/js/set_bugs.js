

fetch("http://127.0.0.1:8000/main/get_bugs/")
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


let body = document.querySelector('[href="https://catalog-zoo.vercel.app/"]')
console.log(body)
// for (let i = 0; i < document.body.childNodes.length; i++) {
//      console.log( document.body.childNodes[i] ); // Text, DIV, Text, UL, ..., SCRIPT
//    }