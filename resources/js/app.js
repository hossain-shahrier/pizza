const axios = require("axios");
// Add to cart
let addToCart = document.querySelectorAll(".add-to-cart");
let cartCounter = document.querySelector(".cart-counter");
function updateCart(pizza) {
  axios.post("/update-cart", pizza).then((res) => {
    console.log(res);
    cartCounter.innerText = res.data.totalQty;
  });
}
addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
  });
});
