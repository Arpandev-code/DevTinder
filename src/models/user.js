const mongoose= require('mongoose')
const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50    
    },
    lastName:{
        type:String,
        required:true
    },
    emailID:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:18,
        max:50
    },
    gender:{
        type:String,
        validate(value){
            if(!['male','female','others'].includes(value))
            {
                throw new Error('Invalid Gender')
            }
        }
    },
    photoUrl:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    about:{
        type:String,
        default:"This is a sample description!Please update it later on!"
   },
   skills:{
       type: [String],
   }
},{
    timestamps:true
})

module.exports= mongoose.model('User',userSchema)