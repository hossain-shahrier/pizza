const axios = require("axios");
import notie from "notie";
import "@pnotify/core/dist/BrightTheme.css";

// Add to cart
let addToCart = document.querySelectorAll(".add-to-cart");
let cartCounter = document.querySelector(".cart-counter");
function updateCart(pizza) {
  axios
    .post("/update-cart", pizza)
    .then((res) => {
      cartCounter.innerText = res.data.totalQty;
      notie.alert({
        position: "top",
        type: 1,
        text: `${pizza.name} added to the cart.`,
        time: 1,
      });
    })
    .catch((err) => {
      notie.alert({
        position: "top",
        type: 3,
        text: "Something went wrong!",
        time: 2,
      });
    });
}
addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
  });
});
