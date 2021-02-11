const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require('express-session')
const knexSession = require("connect-session-knex")(session);


const usersRouter = require("./users/users-router");
const authRouter = require("./auth/auth-router")


const server= express();

//this is going to create a session and store the cookie into the database
const sessionConfig = {
    name: 'cookies',
    secret: 'keep it secret keep it dark',
    cookie: {
      maxAge: 60 * 60 * 1000,
      secure: false,
      httpOnly: true,
    }, 
    resave: false,
    saveUninitialized: false,
    store: new knexSession({
      knex: require("../database/dbConfig"),
      tablename: "sessions",
      sidfieldname: 'sid',
      createtable: true,
      clearInterval: 60 * 60 * 1000
    })
  }

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);


server.get("/", (req, res) => {
    res.json({
        api: 'You are up and running, now get to it'
    });
});

module.exports = server; 
