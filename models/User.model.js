const mongoose = require('mongoose')

const User = new mongoose.Schema({
    username:{
        type:String , 
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    Admin:{
        type:Boolean,
        default:false,
    },
    mobileNo:{
        type:Number,
    },
    userId:{
        type:String , 
        required:true ,
        unique:true
    }
})

const Users = mongoose.model("User" , User);
module.exports = Users