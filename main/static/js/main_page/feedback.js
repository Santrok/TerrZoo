const feedbackProgress = document.querySelector('.feedback__progress-current')
const feedbackProgressTotal = document.querySelector('.feedback__progress-total')
const arrowNext = document.querySelector('.feedback__arrow-next')
const arrowPrev = document.querySelector('.feedback__arrow-prev')

arrowNext.addEventListener('click', (e) => {
    for(let i of e.currentTarget.parentElement.parentElement.children[1].children[0].children[0].children) {
        if(i.classList.contains('slick-active')) {
            feedbackProgress.innerText = Number(i.dataset.slickIndex) + 1
        }
    }
})

arrowPrev.addEventListener('click', (e) => {
    for(let i of e.currentTarget.parentElement.parentElement.children[1].children[0].children[0].children) {
        if(i.classList.contains('slick-active')) {
            feedbackProgress.innerText = Number(i.dataset.slickIndex) + 1
        }
    }
})