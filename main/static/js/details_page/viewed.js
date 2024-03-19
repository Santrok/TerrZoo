document.addEventListener("DOMContentLoaded", () => {
  const id = document.querySelector(".about__product-basket-btn").dataset.productId;
  const view = localStorage.getItem("viewed") !== null ? JSON.parse(localStorage.getItem("viewed")) : [];
  console.log(!view.includes(+id));
  if (!view.includes(+id)) view.push(+id);
  localStorage.setItem("viewed", JSON.stringify(view));
  function getViewed(url) {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("viewedProducts", JSON.stringify(data.results));
      });
  }
  getViewed(
    `${localStorage.getItem('baseUrl')}/api/get_products_list/?id__in=${JSON.parse(localStorage.getItem("viewed"))[0]}${
      localStorage.getItem("viewed").length > 1
        ? JSON.parse(localStorage.getItem("viewed")).splice(1, JSON.parse(localStorage.getItem("viewed")).length).map((item) => `&id__in=${item}`).join('')
        : ``
    }`
  );
});
