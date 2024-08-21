const controller = require("../controllers/analytics.controller");

module.exports = function(app) {
  app.use(function(_, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Access-Control-Allow-Credentials, Access-Control-Allow-Methods, Access-Control-Allow-Origin",
    );
    next();
  });

  app.post("/api/analytics/open-create-room-modal", [], controller.openCreateRoomModal);
};
