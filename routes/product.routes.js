const express = require('express');
const router = express.Router();

const fileUploader = require('../config/cloudinary.config');
const Product = require("../models/Product.model");
const isLoggedIn = require('../middleware/isLoggedIn');
const isLoggedOut = require('../middleware/isLoggedOut');

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
      .populate('seller')
      .then(productFromDB => {
        res.render("products/product", productFromDB)
      }) 
      .catch(e => console.log(e))
  })
  
  
  router.post("/products/:productId/delete",isLoggedIn, (req, res, next) => {
      Product.findByIdAndRemove(req.params.productId)
        .then(() => {
          res.redirect("/products");
        })
        .catch(e => console.log(e));
  })
  router.get("/products/:productId/update",isLoggedIn, (req, res, next) => {
        Product.findById(req.params.productId)
        .then((productFromDB) => {
          res.render("products/update", {productFromDB});
        })
        .catch(e => console.log(e))
          
  })

  router.post("/products/:productId/update",isLoggedIn, fileUploader.single('picture'), (req, res, next) => {
    console.log(req.body);
    console.log(req.params);
    const seller = req.session.currentUser._id;
    const picture = req.file.path; 
    const {title, price, description, location} = req.body;

    if(!title || !price || !description || !picture || !location){
      res.send("All the fields are mandatory. Please enter all the required information!");
    }
    
    Product.findByIdAndUpdate(req.params.productId, {title, price, description, picture, seller, location}, {new: true})
      .then(() => {
        res.redirect("/products");
      })
      .catch(e => console.log(e))
  })
  router.get("/create",isLoggedIn, (req, res, next) => {
    res.render("products/create-product");
  })
  
  router.post("/create",isLoggedIn, fileUploader.single('picture'), (req, res, next) => {
    const {title, price, description, location} = req.body;
    const seller = req.session.currentUser._id;
    Product.create({title, price, description, picture: req.file.path, seller, location})
      .then(() => {
        res.redirect("/products");
      })
      .catch(e => console.log(e));
  })

  module.exports = router;