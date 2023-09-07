const express = require('express');
const router = express.Router();

const Product = require("../models/Product.model");
const isLoggedIn = require('../middleware/isLoggedIn');
const isLoggedOut = require('../middleware/isLoggedOut');
/* GET home page */

router.get("/", (req, res, next) => {
  Product.find({title: "Audi"})
   .then((products) => {
      res.render("index", {productsFromDB: products});
   })
   .catch(e => console.log(e))
});

/*router.get("/", isLoggedIn, (req, res, next) => {

})
*/
/*router.get("/", isLoggedIn, (req, res, next) => {
  res.render("index", data)
})*/


module.exports = router;
