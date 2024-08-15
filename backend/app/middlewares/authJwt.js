const jwt = require("jsonwebtoken");

const config = require("../config/auth.config.js");
const db = require("../models/index.js");

const User = db.user;
const Role = db.role;

verifyToken = async  (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, config.secret); // Use your JWT secret key

    const user = await User.findOne({ _id: decoded.id });

    if (!token) {
      return res.status(403).send({ message: "Please authenticate!" });
    }

    if (!user) {
      return res.status(403).send({ message: "User not found!" });
    }

    req.token = token;
    req.user = user;
    next();

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).send({ error: "Token expired", isTokenExpired: true });
    }

    res.status(401).send({ error: "Please authenticate." });
  }
};

isAdmin = (req, res, next) => {
  User.findById(req.userId)
    .exec()
    .then(user => {
      Role.find({ _id: { $in: user.roles }})
        .exec()
        .then(roles => {
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "Require Admin Role!" });
          return;
        })
    })
    .catch(err => {
      res.status(500).send({ message: err });
      return;
    })
};

isModerator = (req, res, next) => {
  User.findById(req.userId)
    .exec()
    .then(user => {
      Role.find({ _id: { $in: user.roles } })
        .exec()
        .then(roles => {
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "Require Moderator Role!" });
          return;
        })
    })
    .catch(err => {
      res.status(500).send({ message: err });
      return;
    })
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};
module.exports = authJwt;
