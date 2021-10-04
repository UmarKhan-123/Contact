const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const mainroute = require("./Routes/data");
const path = require("path");
const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 8080;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use(mainroute);

app.use("/", express.static(path.join(__dirname, "../client/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log("MongoDB Database Connected to Server");
    app.listen(process.env.PORT, () => {
      console.log(` is running on PORT : ${process.env.PORT} .`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection ERROR :", error);
  });
