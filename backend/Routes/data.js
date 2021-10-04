const express = require("express");

const router = express.Router();

const Controller = require("../Controller/controller");

router.post("/PostForm", Controller.PostForm);

module.exports = router;
