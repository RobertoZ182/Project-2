const {Schema, model} = require("mongoose");

const Product = new Schema({
    title: String,
    picture: String,
    price: Number,
    description: String,
    location: String,
    seller: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    timestamps: true
})

module.exports = model("Product", Product);