const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    productId:{
        type:String,
        requried:true
    },
    userId:{
        type:String , 
        requried:true,
    },
    quantity:{
        type:Number,
        default:1 ,
    },
    orderAt:{
        type:Date ,
        Default:Date.now()
    },
    status:{
        type:String,
    },
    tableNo:{
        type:Number,
        Default:1,
    }
})

const orders = mongoose.model('orders' , orderSchema);

module.exports = orders