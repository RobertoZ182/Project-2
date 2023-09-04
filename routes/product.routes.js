const express = require('express');
const router = express.Router();

const Product = require("../models/Product.model");

router.get("/products", (req, res, next) => {
    Product.find()
      .then(products => {
        console.log(products);
        res.render("products/products-list", {products})
      })
      .catch(e => console.log(e));
  })
  
  router.get("/products/:productId", (req, res, next) =>{
    Product.findById(req.params.productId)
      .then(productFromDB => {
        res.render("products/product", productFromDB)
      }) 
      .catch(e => console.log(e))
  })
  
  
  router.post("/products/:productId/delete", (req, res, next) => {
      Product.findByIdAndRemove(req.params.productId)
        .then(() => {
          res.redirect("/products");
        })
        .catch(e => console.log(e));
  })
  
  router.get("/create", (req, res, next) => {
    res.render("products/create-product");
  })
  
  router.post("/create", (req, res, next) => {
    const {title, price, description, picture} = req.body;
    Product.create({title, price, description, picture})
      .then(() => {
        res.redirect("/products");
      })
      .catch(e => console.log(e));
  })

  module.exports = router;