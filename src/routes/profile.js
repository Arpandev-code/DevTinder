const express=require('express')
const profileRouter=express.Router()
const {userAuthCheck}=require('../middleware/auth')

profileRouter.get('/profile',userAuthCheck, async(req,res)=>{
    try {
        const user=  req.user;
        res.status(201).send({message: "Profile Data fetched Sucessfully",data:user})
    } catch (error) {
        res.status(401).send({Error: `${error.message}`})
    }
    
})

module.exports=profileRouter