const express = require('express')
const router = express.Router()
const multer = require('multer')
const products = require('../models/Products.model')
const { v4 : uuidv4 } = require('uuid');

//defining storage in multer
const storage = multer.diskStorage({
    destination:function(req , file , cb){
        return cb(null , 'public/uploads/')
    },
    filename:function(req , file , cb){
        return cb(null , `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({storage})

//create products
router.post('/addProduct' , upload.single('product-image') ,  async (req , res)=>{
    const {name , price , category ,} = req.body 
    const imageUrl = req.file.filename;
    const id = uuidv4()
    try{
        const savedProducts = await products.create({id , name , price , imageUrl , category})
        console.log(savedProducts)
        return res.status(200).send({product:savedProducts , status:true , msg:"successfully saved"})

    }catch(e){
        console.log(e)
        return res.status(500).send({msg:"Internal server error" , status:false , e})
    }    
})

//retreive products
router.get('/' , async (req,res)=>{
    try{
        const allProducts = await products.find({})
        res.status(200).send({productsAll:allProducts , status:true })
    }catch(e){
        res.status(500).send({msg:"Internal server error" , status:false,e})
    }
})

//edit product
router.put('/editProducts/:id' , async (req , res)=>{
    const {id} = req.params
    const {name , price , category} = req.body
    try{
        if(name && price && category){
            const updateProduct = await products.findOneAndUpdate({id},{name , price , category})
            return res.status(200).send({action:updateProduct , msg:"update successfull" ,status:true})
        }else{
            throw new Error("All Fields are mandatory")
        }
    }catch(e){
        return res.status(500).send({msg:"something went wrong" , status:false , e})
    }
})

//delete product 
router.delete('/deleteProduct/:id' , async (req , res)=>{
    const {id} = req.params
    try{
        const deleteProduct = await products.findOneAndDelete({id});
        res.status(200).send({action:deleteProduct , msg:"Product deleted successfully" , status:true})
    }catch(e){
        res.status(500).send({msg:"Internal server error" , status:false , e})
    }
})

module.exports = router