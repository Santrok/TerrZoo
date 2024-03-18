const checkID = document.querySelector(".about__product-basket-btn").dataset.productId;
const comparisonList = JSON.parse(localStorage.getItem("comparisonList")) || [];
const addComparisonList = document.querySelector(".aboout__product-comprasion");

for (let i of comparisonList) {
  if (i === checkID) {
    addComparisonList.textContent = "Удалить из сравнения";
  }
}

addComparisonList.addEventListener("click", (e) => {
  if (addComparisonList.textContent.trim() === "Добавить в сравнение") {
    comparisonList.push(checkID);
    localStorage.setItem("comparisonList", JSON.stringify(comparisonList));
    addComparisonList.textContent = "Удалить из сравнения";
  } else {
    for (let i of comparisonList) {
      if (i === checkID) {
        comparisonList.splice(comparisonList.indexOf(i), 1);
      }
    }
    localStorage.setItem("comparisonList", JSON.stringify(comparisonList));
    addComparisonList.textContent = "Добавить в сравнение";
  }
});