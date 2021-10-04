const express=require('express');

const router = express.Router();

const Controller = require('../controller/controller');

router.post('/PostForm' , Controller.PostForm);

module.exports = router;