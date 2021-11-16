const Order = require("../../../models/order");

function AdminOrderController() {
  return {
    index: async (req, res) => {
      await Order.find()
        .populate("customerId", "-password")
        .exec((err, orders) => {
          if (req.xhr) {
            return res.json(orders);
          } else {
            return res.render("admin/orders");
          }
        });
    },
  };
}
module.exports = AdminOrderController;

// { status: { $ne: "completed" } }, null, {
//   sort: { createdAt: -1 },
// }
