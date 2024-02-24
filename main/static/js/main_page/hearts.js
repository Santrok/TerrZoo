let hearts = document.querySelectorAll(".slider__item-hearts");
const heartsArr = JSON.parse(localStorage.getItem("heartsProduct")) || [];
const productList = document.querySelector(".products__list");
if(localStorage.getItem("heartsProduct") === null) {
    localStorage.setItem("heartsProduct", JSON.stringify(heartsArr));
}
hearts?.forEach((item) => {
  for (let i of JSON.parse(localStorage.getItem("heartsProduct"))) {
    if (i.id === item.parentElement.dataset.id) {
      item.classList.add("slider__item-hearts-active");
    }
  }
});

function heartFunc(e, item) {
  item.classList.toggle("slider__item-hearts-active");
  const heartsProduct = JSON.parse(localStorage.getItem("heartsProduct"));
  for (let i of heartsProduct) {
    if (i.id === e.currentTarget.parentElement.dataset.id) {
      heartsArr.splice(heartsProduct.indexOf(i), 1);
      if(window.location.href === 'http://127.0.0.1:8000/wishlist/') {
        item.parentElement.parentElement.remove()
      }
      localStorage.setItem("heartsProduct", JSON.stringify(heartsArr));
      return;
    }
  }

  if (item.classList.contains("slider__item-hearts-active")) {
    let heartsWeight = [];
    for (let i of e.currentTarget.parentElement?.children[2]?.children) {
      heartsWeight.push(i.textContent.trim());
    }
    heartsArr.push({
      id: e.currentTarget.parentElement.dataset.id,
      src: e.currentTarget.parentElement.children[0].children[0].src,
      link: e.currentTarget.parentElement.children[1].href,
      title: e.currentTarget.parentElement.children[1].textContent.trim(),
      weight: heartsWeight,
      price: {
        old: e.currentTarget?.parentElement?.children[3]?.children[0]?.children[0]?.children[0]?.textContent.trim(),
        new: e.currentTarget?.parentElement?.children[3]?.children[0]?.children[0]?.children[1]?.children[0]
          ?.textContent.trim(),
      },
      promotion:
        e.currentTarget.parentElement?.children[4]?.classList.contains("products___item-promotion") ||
        e.currentTarget.parentElement.children[4].classList.contains("slider__item-promotion")
          ? true
          : false,
    });
  }
  localStorage.setItem("heartsProduct", JSON.stringify(heartsArr));
}

if(window.location.href === 'http://127.0.0.1:8000/wishlist/') {
    hearts.forEach((item) => {
        item.addEventListener("click", (e) => heartFunc(e, item));
      });
}


if (!productList) {
  hearts.forEach((item) => {
    item.addEventListener("click", (e) => heartFunc(e, item));
  });
}

if (productList && window.location.href !== 'http://127.0.0.1:8000/wishlist/') {
  new MutationObserver((mutation) => {
    hearts = document.querySelectorAll(".slider__item-hearts");
    hearts.forEach((item) => {
      item.addEventListener("click", (e) => {
        heartFunc(e, item);
      });
      for (let i of JSON.parse(localStorage.getItem("heartsProduct"))) {
        if (i.id === item.parentElement.dataset.id) {
          item.classList.add("slider__item-hearts-active");
        }
      }
    });
  }).observe(productList, {
    childList: true,
    subtree: true,
  });
}
