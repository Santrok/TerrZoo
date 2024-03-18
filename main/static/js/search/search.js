document.addEventListener("DOMContentLoaded", () => {
  const keyWord = localStorage.getItem('searchKeyWord') || '';
  const searchTitleKeyWord = document.querySelector('.catalog__title span')
  searchTitleKeyWord.textContent = keyWord.toLocaleLowerCase() 
});
