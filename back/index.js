const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const users = require("./app/users");
const offices = require("./app/offices");
const config = require("./config");
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const run = async () => {
  await mongoose.connect(config.db.url + "/" + config.db.name, {useNewUrlParser: true});

  app.use("/users", users);
  app.use("/offices", offices);

  console.log("Connected to mongo DB");

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
};

run().catch(console.log);

