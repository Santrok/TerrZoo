document.addEventListener("DOMContentLoaded", () => {
  const catalogFilter = document.querySelector(".catalog__filter-mob");
  catalogFilter.addEventListener('click', (e) => {
    if(e?.target?.classList?.contains('checked__div') || e?.target.tagName === 'P') {
      if(e.target.parentElement.parentElement.classList.contains('filter__type-list-item')) {
        console.log(e.target.parentElement.parentElement.children[2]);
        if(e.target.parentElement.parentElement.children[2]) {
          const filterInner = document.querySelectorAll('.filter__inner')
          for(let i of filterInner) {
            i.checked = false;
          }
          for(let i of e.target.parentElement.parentElement.children[2].children) {
            i.children[0].checked = true
          }
        }else {
          const filterInner = document.querySelectorAll('.filter__inner')
          for(let i of filterInner) {
            i.checked = false;
          }
        }
      }
    }
  })
});
