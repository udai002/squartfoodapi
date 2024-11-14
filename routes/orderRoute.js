const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router()
const { v4 : uuidv4 } = require('uuid');
const orders = require('../models/Order.model');

const jwt_secret = process.env.JWT_SECRETE

//retreving orders
router.get('/' , async (req , res)=>{
    try{
        const orderDetails = await orders.find({})
        return res.status(200).send({orders:orderDetails , status:true})
    }catch(e){
        return res.status(500).send({msg:"Internal server error",status:false})
    }
})


//creating orders
router.post('/addOrder' , async (req ,res)=>{
    const {productId , quantity , tableNo} = req.body 
    const token = req.headers['authorization'].split(" ")[1]
    const user = jwt.verify(token , jwt_secret)
    const {userId} = user
    const status = "Getting ready"
    const orderId = `ORD${Date.now()}`;
    const orderAt = Date.now()
    if(!userId){
        return res.status(401).send({msg:"Not authorized" , status:false})
    }

    try{
        const orderDetails = await orders.create({id:orderId , quantity, orderAt , productId , userId , status , tableNo})
        console.log(orderDetails)
        return res.status(200).send({order:orderDetails , status:true })
    }catch(e){
        return res.status(500).send({msg:"Internal server error" , status:false , e})
    }

})

// retreving orders on specific user 
router.get('/details' , async (req ,res)=>{
    const token = req.headers['authorization'].split(" ")[1];
    const user = jwt.verify(token , jwt_secret);

    try{
        const orderDetails = await orders.find({userId:user.userId})
        return res.status(200).send({orders:orderDetails , status:true})
    }catch(e){
        return res.status(500).send({msg:"Internal server error" , status:false})
    }
})


//deleting order
router.delete('/delete/:id' , async (req , res)=>{
    const {id} = req.params
    const token = req.headers["authorization"].split(" ")[1]
    const user = jwt.verify(token , jwt_secret)
    try{
        const orderDetails = await orders.findOne({id})
        if(orderDetails.userId === user.userId || user.Admin === true){
            const deleteOrder = await orders.findOneAndDelete({id})
            return res.status(200).send({deleteOrder , status:true})
        }else{
            return res.status(401).send({msg:"Unauthorised user" , status:false})
        }
    }
    catch(e){
        return res.status(500).send({msg:"Internal server error" , status:false})
    }
})


module.exports = router 