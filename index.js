const express = require('express')
const app = express() 
const port = process.env.PORT || 5000 
const mongoose = require('mongoose')
const  userRoute = require("./routes/userRoute")
const productRoute = require('./routes/ProductRoute')

mongoose.connect("mongodb+srv://karumuriudaisai002:ky9KEuzCnFcOPaku@cluster0.k5uzy.mongodb.net/").then(()=>{
    console.log("you are successfully connected to database...")
}).catch(e=>{
    console.log(e)
})

app.use(express.static('public/uploads/'))
app.use(express.json())

app.get('/' , (req , res)=>{
    res.send("welcome to express")
})

//user routers
app.use('/api/user' ,  userRoute)

//product routers
app.use('/api/products' , productRoute)


app.listen(port , ()=>{
    console.log(`listening at port http://localhost:${port}`);
})