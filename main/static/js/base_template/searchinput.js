document.addEventListener("DOMContentLoaded", () => {
  // Получение элементов для событий
  const searchInput = document.querySelector("#search__input");
  const insertResultData = document.querySelector(".search__drop-down");
  searchInput.addEventListener("input", fetchQueryParams);
  searchInput.addEventListener("keyup", (e) => getPageCatalog(e, searchInput));


  function getPageCatalog(e, input) {
    if (e.code === "Enter") {
      window.location.href = `${localStorage.getItem("baseUrl")}/search/`;
      localStorage.setItem("searchKeyWord", input.value.trim());
    }
  }

  searchInput.addEventListener("focusout", (e) => {
    console.log(e.target)
    if(searchInput.value.length < 3){
        insertResultData.style.display = 'none'
        insertResultData.innerHTML = ''
    }
  });

  function fetchQueryParams(event) {
    if (searchInput.value.length >= 3) {
      fetch(`${localStorage.getItem("baseUrl")}/api/get_search_product/?title=${searchInput.value}`)
        .then((resp) => resp.json())
        .then((data) => {
          localStorage.setItem("result_search_objects", JSON.stringify(data.results));

          insertResultData.style.display = "block";
          insertResultData.innerHTML = "";
          for (let item of data.results) {
            insertResultData.innerHTML += `<a class="search__drop-down-item" href="${localStorage.getItem(
              "baseUrl"
            )}/details/${item.id}">
                            <div class="search__drop-down-item-img">
                                <img src="${item.image_prev}" alt="item">
                            </div>
                            <p class="search__drop-down-item-title">${item.title}</p>
                        </a>`;
          }
          if (data.results.length === 0) {
            insertResultData.innerHTML = `<div class="search__drop-down-item">
                        <p class="search__drop-down-item-title">По вашему запросу ничего не найдено</p>
                    </в>`;
          }
        });
    } else {
      let insertResultData = document.querySelector(".search__drop-down");
      insertResultData.style.display = "none";
      insertResultData.innerHTML = "Ничего не найдено";
    }
  }
  const inputMob = document.querySelector(".header__up-search input");
  inputMob.addEventListener("input", fetchQueryParams);
  inputMob.addEventListener("keyup", (e) => getPageCatalog(e, inputMob));
});
