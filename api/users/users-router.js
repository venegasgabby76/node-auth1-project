const express = require("express");

const Users = require("./users-model.js");
const authorization = require("../auth/auth-middleware");


const router = express.Router();

router.get("/", authorization, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
        res.status(401).json({
          message: "You shall not pass!!",
        });
      });
});

module.exports = router;
