document.addEventListener("DOMContentLoaded", wishListInDetails);

/**
 * Function that handles adding and removing items from the wishlist.
 * It is triggered when the DOMContentLoaded event is fired.
 */
function wishListInDetails() {
  // Retrieve the wishlist from localStorage and parse it as JSON
  const wishList = JSON.parse(localStorage.getItem("heartsProduct"));
  // Get the id of the current product from the dataset of the basket button
  const checkID = document.querySelector(".about__product-basket-btn").dataset.productId;
  // Get the add to wishlist button and the image source
  const addWishList = document.querySelector(".aboout__product-wish-list");
  const imgSrc = document.querySelectorAll('.about__product-img-list-item')[0].children[0].getAttribute('src');
  // Get the current URL
  const linkForItem = window.location.href;
  // Get the title of the product
  const title = document.querySelector('.about__product-title').textContent.trim()
  // Get the weights of the product
  const weightList = document.querySelectorAll('.about__product-item-weight')
  // Get the promotion element, if it exists
  const promotion = document.querySelector('about__product-title-promotion')
  // Get the promotional price element
  const promotionalPrice = document.querySelector('.about__product-price-promotion-wrap')

  // Loop through the wishlist and check if the current product is already in it
  for(let i of wishList){
      if (i.id === checkID) {
        // If it is, update the text of the add to wishlist button
        addWishList.textContent = "Удалить из избранного";
      }
  }

  // Add event listener to the add to wishlist button
  addWishList.addEventListener("click", (e) => {
    // Check if the current text of the button is "Добавить в избранное"
    if (addWishList.textContent === "Добавить в избранное") {
      // If it is, create a new object with the details of the product and add it to the wishlist
      wishList.push(
        {
            "id": checkID,
            "src": imgSrc,
            "link": linkForItem,
            "title": title,
            "weight": [...weightList].map(item => item.textContent.trim()),
            "price": promotionalPrice.children[0].classList.contains('about__product-price-promotion-noaction-price') 
                ?  {
                    old: promotionalPrice.children[0].children[0].textContent.trim(),
                    new: promotionalPrice.children[1].textContent.trim().split(' ')[0].trim()
                } : {
                    old: promotionalPrice.children[0].textContent.trim().split(' ')[0].trim()
                },
            "promotion": promotion !== undefined ? true : false
        }
      );
      // Update the wishlist in localStorage
      localStorage.setItem("heartsProduct", JSON.stringify(wishList));
      // Update the text of the add to wishlist button
      addWishList.textContent = "Удалить из избранного";
    } else {
      // If the current text of the button is "Удалить из избранного", remove the product from the wishlist
      for(let i of wishList){
        if (i.id === checkID) {
          wishList.splice(i, 1);
        }
      }
      // Update the wishlist in localStorage
      localStorage.setItem("heartsProduct", JSON.stringify(wishList));
      // Update the text of the add to wishlist button
      addWishList.textContent = "Добавить в избранное";
    }
  });
}
