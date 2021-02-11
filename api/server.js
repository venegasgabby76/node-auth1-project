const express = require("express");
const helmet = require("helmet");
const cors = require("cors");


const usersRouter = require("./users/users-router");
const authRouter = require("./auth/auth-router")


const server= express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);


server.get("/", (req, res) => {
    res.json({
        api: 'You are up and running, now get to it'
    });
});

module.exports = server; 
