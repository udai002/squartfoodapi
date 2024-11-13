const mongoose = require('mongoose')

const ProductSchema =  new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true 
    },
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        requried:true 
    },
    imageUrl:{
        type:String,
    },
    category:{
        type:String,
        default:"ALL",
    }
})

const products = mongoose.model("products" , ProductSchema)

module.exports = products