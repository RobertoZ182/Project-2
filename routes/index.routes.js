const express = require('express');
const router = express.Router();

const Product = require("../models/Product.model");
const isLoggedIn = require('../middleware/isLoggedIn');
const isLoggedOut = require('../middleware/isLoggedOut');
/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


module.exports = router;
