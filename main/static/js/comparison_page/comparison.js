function getViewed(url) {
  fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("comparisonListItem", JSON.stringify(data.results));
    });
}
getViewed(
  `http://127.0.0.1:8000/api/get_products_list/?id__in=${JSON.parse(localStorage.getItem("comparisonList"))[0]}${
    localStorage.getItem("viewed").length > 1
      ? JSON.parse(localStorage.getItem("comparisonList"))
          .splice(1, JSON.parse(localStorage.getItem("comparisonList")).length)
          .map((item) => `&id__in=${item}`)
          .join("")
      : ``
  }`
);
