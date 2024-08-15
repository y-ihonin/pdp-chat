const { authJwt } = require("../middlewares");
const controller = require("../controllers/account.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept, Authorization"
    );
    next();
  });

  app.get("/api/account/profile/me", [authJwt.verifyToken], controller.profileMe);
};
