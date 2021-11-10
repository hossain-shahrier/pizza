const Menu = require("../../models/menu");

function HomeController() {
  return {
    index: async function (req, res) {
      const pizzas = await Menu.find();
      res.render("home", { pizzas: pizzas });
    },
  };
}
module.exports = HomeController;
