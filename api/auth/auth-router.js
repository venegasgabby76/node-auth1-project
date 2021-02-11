const express = require("express")
const users = require("../users/users-model");
const bycrypt = require("bcryptjs");

const router = express.Router();

router.post("/register", async (req, res) => {
  let user = req.body;

  const hashPassword = bycrypt.hashSync(user.password, 10);
  user.password = hashPassword;

  try {
    const newUser = await users.add(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({
      message: "Could not register the user.",
    });
  }
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body;

  try {
    const user = await users.findBy({ username }).first();

    if (user && bycrypt.compareSync(password, user.password)) {
      res.status(200).json({
        message: `Welcome ${user.username}`,
      });
    } else {
      res.status(401).json({
        message: "You shall not pass!",
      });
    }
  } catch {
    res.status(500).json({
      message: "Error logging in.",
    });
  }
});

module.exports = router;
