const filterWrap = document.querySelector('.filter__wrap')
const articleTitleAnimal = document.querySelector('.articles__title > span')
console.log(filterWrap.children[Number(window.location.href.split('').splice(window.location.href.split('').length- 1, 1).join('')) - 1]);
filterWrap.children[Number(window.location.href.split('').splice(window.location.href.split('').length- 1, 1).join('')) - 1].classList.add('filter__item-active')
const titleAnimal = []
for(let i of filterWrap.children){
    // i.style.opacity = '0.5'
    titleAnimal.push(i.children[1].textContent.toLowerCase())
}
console.log(titleAnimal);
console.log(articleTitleAnimal);
articleTitleAnimal.innerText = `для ${titleAnimal[Number(window.location.href.split('').splice(window.location.href.split('').length - 1, 1).join('')) - 1]}`
