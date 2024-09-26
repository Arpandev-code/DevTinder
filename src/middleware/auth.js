// const adminAuthCheck=(req,res,next)=>{
//     const token="xyz"
//     let isAdmin=token==="xyz"
//     if(!isAdmin){
//         res.status(401).send("Unauthorized")
//     }else{
//         next()
//     }    
// }
// const userAuthCheck=(req,res,next)=>{
//     const token="xyz"
//     let isAdmin=token==="xyz"
//     if(!isAdmin){
//         res.status(401).send("Unauthorized")
//     }else{
//         next()
//     }    
// }
const jwt=require('jsonwebtoken')
const User=require('../models/user')

const userAuthCheck= async(req,res,next)=>{
try {
    const {token}= req.cookies;
    console.log("auth middleware: "+token);
    
    if(!token)
    {
       throw new Error("Login to access this resource")
    }
    const decodedData= jwt.verify(token,"DEVKEY#$%7686")
    console.log(decodedData);
    
    const {_id}=decodedData
    const user=await User.findById(_id);
    if(!user)
    {
        throw new Error("User not found")
    }
    req.user=user
    next()
} catch (error) {
    res.status(500).send({Error: ` Middleware ERROR: ${error.message}`})
}
}
module.exports={
   // adminAuthCheck,
    userAuthCheck
}