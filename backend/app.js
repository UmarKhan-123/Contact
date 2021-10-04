const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const mainroute = require("./Routes/data");
const path = require("path");
const app = express();

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
  .connect(
    "mongodb+srv://Khan:Khan-94871080@reactcluster.el2n9.mongodb.net/Contact?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    }
  )
  .then(() => {
    console.log("MongoDB Database Connected to Server");
    app.listen(8080, () => {
      console.log(` is running on PORT : 8080 .`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection ERROR :", error);
  });
