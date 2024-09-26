const express = require('express')
const authRouter= express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const {signupValidation}=require('../utils/validation')

authRouter.post('/signup',async(req,res)=>{ 
    try {
        const {firstName,lastName,emailID,password}=req.body
        //Validation of user Data
        signupValidation(req)
        //Hashing the password
        const hashedPassoword= await bcrypt.hash(password,10)
        //Creating new instance of user model
        let user =new User({
            firstName,
            lastName,
            emailID,
            password:hashedPassoword,
        })
        
        await user.save();
        res.status(201).send({message: "User created successfully"})
    } catch (error) {
        res.status(400).send({Error: "Something went wrong"+error.message})
    }
    }
)

authRouter.post('/login',async (req,res)=>{
    const {emailID,password}=req.body

    try {
        if(!emailID || !password)
            {
                throw new Error("Email and Password are required")
            }
        const user= await User.findOne({emailID : emailID})
        if(!user)
        {
            throw new Error("Oops!Invalid Credentials")
        }
        const isMatch= await user.validatePassword(password)
        if(!isMatch){
            throw new Error("Oops!Invalid Credentials")
        }
        if(isMatch)
        {
            const token=await user.getJWT();
            res.cookie("token",token)
        }
        res.status(201).send({message: "Login Successful"})
    } catch (error) {
        res.status(401).send({Error: `${error.message}`})
    }
}
)

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),})
    res.send("Logout Successful")
})

module.exports=authRouter

