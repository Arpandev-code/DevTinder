const mongoose= require('mongoose')
const validator= require('validator')
const jwt= require('jsonwebtoken')
const bcrypt= require('bcrypt')
const connectionRequestSchema= new mongoose.Schema({
    fromUserID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:String,
        enum:{
            values:["pending","accepted","rejected"],
            message:"Invalid Status"
        },
    }
})