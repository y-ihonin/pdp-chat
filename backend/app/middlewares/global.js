const isEmpty = require("lodash/isEmpty");

checkBodyEmpty = (req, res, next) => {
  if (isEmpty(req.body)) {
    res.status(400).send({ message: "Content can not be empty!" });

    return;
  }

  next();
};

const globalMiddlewares = {
  checkBodyEmpty
};

module.exports = globalMiddlewares;
