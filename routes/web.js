// WEB Routes

function initRoutes(app) {
  // Home route
  app.get("/", (req, res) => {
    res.render("home");
  });
  // Cart route
  app.get("/cart", (req, res) => {
    res.render("customers/cart");
  });
  // Login route
  app.get("/login", (req, res) => {
    res.render("auth/login");
  });
  // Register route
  app.get("/register", (req, res) => {
    res.render("auth/register");
  });
}

module.exports = initRoutes;
