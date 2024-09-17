const adminAuthCheck=(req,res,next)=>{
    const token="xyz"
    let isAdmin=token==="xyz"
    if(!isAdmin){
        res.status(401).send("Unauthorized")
    }else{
        next()
    }    
}
const userAuthCheck=(req,res,next)=>{
    const token="xyz"
    let isAdmin=token==="xyz"
    if(!isAdmin){
        res.status(401).send("Unauthorized")
    }else{
        next()
    }    
}
module.exports={
    adminAuthCheck,
    userAuthCheck
}