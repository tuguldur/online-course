const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express();
const port = 8002;
// get database config
const db = config.get("mongoURI");
// connect to mongodb

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .catch(err => console.log(err));

app.use(express.json());

const router = require("./api/routes");
app.use("/api", router);

app.all("*", (req, res) => {
  res.status(404).send("Some Thing Went Wrong");
});
app.listen(port, () => console.log(`Hi!`));
