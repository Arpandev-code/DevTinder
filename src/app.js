const express= require('express');
const app = express();
const cookieParser= require('cookie-parser');
const jwt= require('jsonwebtoken');


// app.get('/user/:id/:name', (req,res)=>{
//     console.log(req.query);
//     console.log(req.params);
    
//     res.send("Hello from Root");
// })

// app.get('/user',
//     (req,res,next)=>{
//         console.log("Hello from route Handler 1");
        
//         // res.send({userID:"1",userName:"Arpan"});
//         next();
//     },
//     (req,res,next)=>{
//         console.log("Hello from route Handler 2");
//        // res.send({userID:"2",userName:"Priyam"});
//         next()
//     },
//     (req,res,next)=>{
//         console.log("Hello from route Handler 3");
//         res.send({userID:"3",userName:"Shubham"});
//     },
//     (req,res,next)=>{
//         console.log("Hello from route Handler 4");
//         res.send({userID:"4",userName:"Arun"});
//     },
// )
 
// app.use("/",(req,res)=>{//it will check for 
//     res.send("Hello from Root");
// })
// app.use("/test",(req,res)=>{
//     res.send("Hello from the server");
// })
// app.use("/hello",(req,res)=>{
//     res.send("Hello Hello Hello");
// })
// const {adminAuthCheck, userAuthCheck}=require('./middleware/auth')
// app.use('/admin',adminAuthCheck)
// app.use('/',(err,req,res,next)=>{
//     if(err)
//     {
//         res.status(500).send("Something went wrong");
//     }
 
//  })

// app.get('/admin/getallusers', (req,res)=>{
//     res.send("All user data has been sent")
// })

// app.delete('/admin/deleteUser', (req,res)=>{
//     res.send("User has been deleted")
// })

// app.get('/user',userAuthCheck,(req,res)=>{
//    throw new Error("Something went wrong");
//     res.send("User Data has been sent");
// })
// app.use('/',(err,req,res,next)=>{
//     if(err)
//     {
//         res.status(500).send("Something went wrong");
//     }
 
//  })
//express.json()  converts json data to javascript object returned by req.body
app.use(express.json())
app.use(cookieParser())

const connection= require('./config/database')
const User=require('./models/user')
const {signupValidation,updateValidation}=require('./utils/validation')
const bcrypt=require('bcrypt')
const {userAuthCheck}=require('./middleware/auth');

app.post('/signup',async(req,res)=>{ 
try {
    const {firstName,lastName,emailID,password,age,gender,photoUrl,about,skills}=req.body
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
})

//get user by email
app.get('/user',async(req,res)=>{
    const email= req.body.emailID
    try {
        const user =await User.find({emailID:email})
        if(user.length>0)
        {
            res.status(201).send(user)
        }
        res.status(404).send({message: "User not found"})
    } catch (error) {
        res.status(500).send({Error: `ERROR: ${error.message}`})
    }
})
//Get All user in Feed
app.get('/feed',async(req,res)=>{
    try {
        const users=await User.find()
        res.status(201).send(users)
    } catch (error) {
        res.status(404).send("Something went wrong")
    }
})
//findById
app.get('/user/:id', async(req,res)=>{
    const id= req.params.id
    try {
        const user=await User.findById(id)
        res.status(201).send(user)
    } catch (error) {
        res.status(500).send({Error: `ERROR: ${error.message}`})
    }
})
//Delete a user
app.delete('/user',async (req,res)=>{
    const id= req.body.userID
    try {
        await User.findByIdAndDelete({_id:id})
        res.status(201).send({message: "User deleted successfully"})
        
    } catch (error) {
        res.status(500).send({Error: "Something went wrong"})
    }
})
//Update a user by ID
app.patch('/user/:userID',async(req,res)=>{
    const id =req.params?.userID
    const data =req.body
    console.log(req.body);
    
    try {
        //validation
        updateValidation(req)
        const user=await User.findByIdAndUpdate({_id:id},data,{
            returnDocument:"after",
            runValidators:true
        },)
        res.status(201).send({message: "User updated successfully",data:user})
    } catch (error) {
        res.status(500).send({Error: `ERROR: ${error.message}`})
    }
})
//Update a user by email id
app.patch('/user/:email',async(req,res)=>{
    const email =req.params.email
    const {password,age,gender,photoUrl,about,skills} =req.body
   try {
    //validation
    updateValidation(req)
    const user= await User.findOneAndUpdate({emailID:email},{
        password,
        age,
        gender,
        photoUrl,
        about,
        skills
    },{
        returnDocument:"after"
    })
    res.status(201).send({message: "User updated successfully",data:user})
   } catch (error) {
    res.status(500).send({Error: `ERROR: ${error.message}`})
   }
})

app.post('/login',async (req,res)=>{
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
})
app.get('/profile',userAuthCheck, async(req,res)=>{
    try {
        const user=  req.user;
        res.status(201).send({message: "Profile Data fetched Sucessfully",data:user})
    } catch (error) {
        res.status(401).send({Error: `${error.message}`})
    }
    
})
app.get('/sendconnectionRequest',userAuthCheck, async(req,res)=>{ 
    try {
        const user=req.user;
        res.status(200).send(`${user.firstName} has send a connection request`)
    } catch (error) {
        res.status(500).send({Error: `${error.message}`})
    }
  })

connection()
.then(()=>{
    console.log('Database Connected');
    app.listen(3000,()=>{
        console.log('Listening on port 3000');
    })
})
.catch((err)=>{
    console.log(err);
})



