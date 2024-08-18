const { authJwt } = require("../middlewares");
const controller = require("../controllers/conversion.controller");

module.exports = function(app) {
  app.use(function(_, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/conversion/room/:id/messages", [authJwt.verifyToken], controller.getMessagesByRoomId);
  
  app.post("/api/conversion/room", [authJwt.verifyToken], controller.createRoom);
};
