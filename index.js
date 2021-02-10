require("dotenv").config();

const server = require("./api/server");

const PORT = process.env.PORT || 6666;

server.listen(PORT, () => console.log(`\n** Running on ${PORT} **\n`));