
const validator=require('validator')

const signupValidation=(req)=>{
    let data=req.body
    let ALLOWED_FIELDS_FOR_CREATE = ["firstName", "lastName", "emailID", "password", "age", "gender", "photoUrl", "about", "skills"];
    let isValidOperation=Object.keys(data).every((key)=>ALLOWED_FIELDS_FOR_CREATE.includes(key))
        if( !isValidOperation)
        {
            throw new Error("Invalid Operation")
        } else if (!data.firstName || !data.lastName || !data.emailID || !data.password) {
            return new Error("First Name is required")
        } else if(data.skills?.length>10)
        {
            throw new Error("Maximum 10 skills allowed")
        }
        if(!validator.isEmail(data.emailID))
        {
            throw new Error("Invalid Email")
        }
        if(!validator.isStrongPassword(data.password))
        {
            throw new Error("Password is not strong enough")
        }
}

const updateValidation=(req)=>{   
    let data =req.body
    const ALLOWED_FIELDS_FOR_UPDATE=["age","gender","photoUrl","about","skills"]
    const isValidOperation= Object.keys(data).every((key)=>ALLOWED_FIELDS_FOR_UPDATE.includes(key))
    if(!isValidOperation)
    {
        throw new Error("Invalid Operation")
    }
    if(data.skills.length>10)
    {
        throw new Error("Maximum 10 skills allowed")
    }
    if(!validator.isURL(data.photoUrl))
    {
        throw new Error("Invalid URL")
    }
}

const validateEditProfileData=(req)=>{
    let data=req.body
    const allowedFieldtoEditUser=["firstName","lastName","","emailID","age","gender","photoUrl","about","skills"]
    const isAllowedToEdit =Object.keys(data).every((key)=>allowedFieldtoEditUser.includes(key))

    return isAllowedToEdit;
}
module.exports={
    signupValidation,
    updateValidation,
    validateEditProfileData
}