const mongoose = require("mongoose");

const productschema = mongoose.Schema({
    itemid: Number,
    itemname: String,
    halfprice: Number,
    fullprice: Number,
})

module.exports = new mongoose.model("Product",productschema);