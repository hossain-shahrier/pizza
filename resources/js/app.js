const axios = require("axios");
import notie from "notie";
import { initAdmin } from "./admin";
import moment from "moment";

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

// Remove alert message after 3 seconds
const alertMsg = document.querySelector("#success-alert");
if (alertMsg) {
  setTimeout(() => {
    alertMsg.remove();
  }, 3000);
}

// Change order status
let statuses = document.querySelectorAll(".status_line");
let hiddenInput = document.querySelector("#hiddenInput");
let order = hiddenInput ? hiddenInput.value : null;
order = JSON.parse(order);
let time = document.createElement("small");
function updateStatus(order) {
  statuses.forEach((status) => {
    status.classList.remove("step-completed");
    status.classList.remove("current");
  });
  let stepCompleted = true;
  statuses.forEach((status) => {
    let dataProp = status.dataset.status;
    if (stepCompleted) {
      status.classList.add("step-completed");
    }
    if (dataProp === order.status) {
      stepCompleted = false;
      time.innerText = moment(order.updated_at).format("hh:mm A");
      status.appendChild(time);
      if (status.nextElementSibling) {
        status.nextElementSibling.classList.add("current");
      }
    }
  });
}

updateStatus(order);
// Socket.io
let socket = io();

// Join
if (order) {
  socket.emit("join", `order_${order._id}`);
}
// Admin socket
let adminAreaPath = window.location.pathname;
if (adminAreaPath.includes("admin")) {
  initAdmin(socket);
  socket.emit("join", "adminRoom");
}
socket.on("orderUpdated", (data) => {
  const updatedOrder = { ...order };
  updatedOrder.updatedAt = moment().format("hh:mm A");
  updatedOrder.status = data.status;
  updateStatus(updatedOrder);
  notie.alert({
    position: "top",
    type: 1,
    text: `Order status updated`,
    time: 2,
  });
});
