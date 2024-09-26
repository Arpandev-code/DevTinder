const express=require('express')
const profileRouter=express.Router()
const {userAuthCheck}=require('../middleware/auth')
const {validateEditProfileData}=require('../utils/validation')
const bycrypt=require('bcrypt')

profileRouter.get('/profile/view',userAuthCheck, async(req,res)=>{
    try {
        const user=  req.user;
        res.status(201).send({message: "Profile Data fetched Sucessfully",data:user})
    } catch (error) {
        res.status(401).send({Error: `${error.message}`})
    }
    
})
profileRouter.patch('/profile/edit',userAuthCheck, async(req,res)=>{
    try {
        if(!validateEditProfileData)
        {
            throw new Error("Invalid Data for update")
        }
        const loggedInUser=  req.user
        const dataForUpdate=req.body
        Object.keys(dataForUpdate).forEach((key)=>{
            loggedInUser[key]=dataForUpdate[key]
        })
        console.log("User Updated sucessfully");
        await loggedInUser.save()
        res.status(201).send(
            {
                message: `${loggedInUser.firstName} Profile Updated Sucessfully`,
                data:loggedInUser
            }
        );
        

    } catch (error) {
        res.status(401).send({Error: `${error.message}`})
    }

})

profileRouter.patch('/profile/password',userAuthCheck, async(req,res)=>{
    try {
        const loggedInUser=  req.user
        const {oldPassword,newPassword}=req.body
        //DON'T TRUSR REQ.BODY CHECK
        if(!oldPassword || !newPassword)
        {
            throw new Error("Old Password and New Password are required")
        }else if(oldPassword===newPassword)
        {
            throw new Error("Old and New Password should not be same")
        }

        //bcrypt validation from utill 
        const isMatch= await loggedInUser.validatePassword(oldPassword)
        if(!isMatch)
        {
            throw new Error("Old Password is not correct")
        }
        const newPasswordHash=await bycrypt.hash(newPassword,10)
        loggedInUser.password=newPasswordHash
        await loggedInUser.save()                
        res.status(201).send({message: "Password Changed Sucessfully"})                 
    } catch (error) {  
        res.status(401).send({Error: `${error.message}`})
    }
}
)

module.exports=profileRouter