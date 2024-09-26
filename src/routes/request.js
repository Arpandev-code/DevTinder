const express = require('express')
const {userAuthCheck}=require('../middleware/auth')
const requestRouter = express.Router()

requestRouter.get('/sendconnectionRequest',userAuthCheck, async(req,res)=>{ 
    try {
        const user=req.user;
        res.status(200).send(`${user.firstName} has send a connection request`)
    } catch (error) {
        res.status(500).send({Error: `${error.message}`})
    }
  })

  module.exports=requestRouter