const Order = require("../../models/order");
function OrderController() {
  return {
    store: function (req, res) {
      // Validate request
      const { phone, address } = req.body;
      if (!phone || !address) {
        req.flash("error", "All fields are required");
        return res.redirect("/cart");
      }

      const order = new Order({
        customerId: req.user._id,
        items: req.session.cart.items,
        phone,
        address,
      });
      order
        .save()
        .then((order) => {
          req.flash("success", "Order placed successfully");
          req.session.cart = {};
          res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
          req.flash("error", "Something went wrong");
          return res.redirect("/cart");
        });
    },
  };
}
module.exports = OrderController;
