const express = require('express')
const Users = require('../models/User.model')
const router = express.Router()
const jwt = require("jsonwebtoken")
require('dotenv').config({path:"./.env"})

const jwt_secret = process.env.JWT_SECRETE
console.log(jwt_secret) 

//create new user 
router.post('/signup' , async (req , res)=>{
    const {username , password , email , mobileNo , Admin} = req.body;
    const userId = `user${Date.now()}`
    if(!username , !password , !email , !mobileNo , !Admin){
        return res.status(404).send({msg:"Invalid Entries"})
    }
    const existingUser = await Users.findOne({email})
    if(existingUser){
        return res.status(400).json({msg:"user already exists"})
    }
    try{
        await Users.create({username , password , Admin , mobileNo , email , userId})
        jwt.sign({userId , username , Admin}, jwt_secret , (err , jwtToken)=>{
            if(err)console.log(err)
            return res.status(200).json({jwtToken , msg:"successfully logged in"})
        })
        
    }catch(e){
        res.status(500).send({msg:"Internal server Error" , e})
    }
})

//login existing user 
router.post('/login' , async (req , res)=>{
    const {username , password} = req.body
    try{
        const userDetails = await Users.findOne({username})
        if(!userDetails){
            return res.status(404).json({msg:"User not found"})
        }
        if(userDetails.password === password){
            console.log("password is correct")
            const {Admin , userId} = userDetails
            jwt.sign({userId , username , Admin}, jwt_secret , (err , jwtToken)=>{
                if(err)console.log(err)
                return res.status(200).json({jwtToken , msg:"successfully logged in"})
            })
        }
    }catch(e){
        res.status(500).json({msg:"Internal server error" , e})
    }
})


//retreve user details from jwttoken
router.get('/' , (req , res)=>{
        const tokenHeader = req.headers['authorization']
        const token = tokenHeader.split(' ')[1]
        try{
            const decode = jwt.verify(token , jwt_secret);
            return res.send(decode)
        }catch(e){
            return res.status(500).send({msg:"Internal server error"})
        }
 })



//retreive all the users from the database
router.get("/details" , async (req , res)=>{
    try{
        const users = await Users.find()
        res.status(200).send(users)
    }catch(e){
        res.status(400).json({msg:"Data Not found" , e})
    }
})

module.exports = router