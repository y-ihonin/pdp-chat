const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({ username: req.body.username })
    .exec()
    .then(user => {
      if (user) {
        res.status(400).send({ message: "Failed! Username is already in use!" });
        return;
      }
  
      // Email
      User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
          if (user) {
            res.status(400).send({ message: "Failed! Email is already in use!" });
            return;
          }
    
          next();
        })
        .catch(err => {
          res.status(500).send({ message: err });
          return;
        })
    })
    .catch(err => {
      res.status(500).send({ message: err });
      return;
    })
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    if (!ROLES.includes(req.body.roles)) {
      res.status(400).send({
        message: `Failed! Role ${req.body.roles} does not exist!`
      });
      return;
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;
