var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const config = require("../config/auth.config");
const db = require("../models");

const User = db.user;
const Role = db.role;


exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  try {
    if (req.body.roles) {
      console.log(req.body.roles)

      Role.find({ name: req.body.roles })
        .exec()
        .then(roles => {
          console.log(roles)
          user.roles = roles.map(role => role._id);
          user.save();
        })
    } else {

      Role.findOne({ name: "user" })
        .exec()
        .then(role => {
          user.roles = [role._id];
          user.save();
        })
    }

    res.send({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err });
    return;
  }
};

exports.signin = (req, res) => {
  User.findOne({ username: req.body.username })
    .populate("roles", "-__v")
    .exec()
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email
        },
        config.secret,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        }
      );

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err });
      return;
    })
};
