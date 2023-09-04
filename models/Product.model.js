const {Schema, model} = require("mongoose");

const Product = new Schema({
    title: String,
    picture: String,
    price: Number,
    description: String
    
},
{
    timestamps: true
})

module.exports = model("Product", Product);