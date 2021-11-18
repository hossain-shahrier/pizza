const Order = require("../../../models/order");
const moment = require("moment");
function OrderController() {
  return {
    index: async (req, res) => {
      const orders = await Order.find({ customerId: req.user._id }, null, {
        sort: { createdAt: -1 },
      });
      res.header(
        "Cache-Control",
        "no-cache,private,no-store,must-revalidate,max-stale=0,post-check=0,pre-check=0"
      );
      res.render("customers/orders", { orders: orders, moment: moment });
    },
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
        .then((new_order) => {
          req.flash("success", "Order placed successfully");
          delete req.session.cart;
          // Emit
          const eventEmitter = req.app.get("eventEmitter");
          eventEmitter.emit("orderPlaced", new_order);
          res.redirect("customer/orders");
        })
        .catch((err) => {
          console.log(err);
          req.flash("error", "Something went wrong");
          return res.redirect("/cart");
        });
    },
    show: async (req, res) => {
      const order = await Order.findById(req.params.id);
      // Authorize user
      if (req.user._id.toString() === order.customerId.toString()) {
        return res.render("customers/single-order", { order });
      }
      res.redirect("/");
    },
  };
}
module.exports = OrderController;
