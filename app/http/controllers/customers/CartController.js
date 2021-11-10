function CartController() {
  return {
    index: function (req, res) {
      res.render("customers/cart");
    },
  };
}
module.exports = CartController;
