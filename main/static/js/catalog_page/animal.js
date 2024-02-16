const filterWrap = document.querySelector('.filter__wrap')
const catalogTitleAnimal = document.querySelector('.catalog__title > span')
const articleTitleAnimal = document.querySelector('.articles__title > span')
filterWrap.children[Number(window.location.href.split('').splice(window.location.href.split('').length- 2, 1).join('')) - 1].classList.add('filter__item-active')
const titleAnimal = []
for(let i of filterWrap.children){
    titleAnimal.push(i.children[1].textContent.toLowerCase())
}
catalogTitleAnimal.innerText = `для ${titleAnimal[Number(window.location.href.split('').splice(window.location.href.split('').length- 2, 1).join('')) - 1]}`
catalogTitleAnimal.innerText = `для ${titleAnimal[Number(window.location.href.split('').splice(window.location.href.split('').length- 2, 1).join('')) - 1]}`
