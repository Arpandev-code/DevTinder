const express= require('express');
const app = express();


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
const connection= require('./config/database')
const User=require('./models/user')
app.post('/signup',async(req,res)=>{ 
try {
    let data=req.body
    let ALLOWED_FIELDS_FOR_CREATE = ["firstName", "lastName", "emailID", "password", "age", "gender", "photoUrl", "about", "skills"];
    let isValidOperation=Object.keys(data).every((key)=>ALLOWED_FIELDS_FOR_CREATE.includes(key))
        if( !isValidOperation)
        {
            return res.status(400).send({Error: "Invalid Operation"})
        }
        if (!data.firstName || !data.lastName || !data.emailID || !data.password) {
            return res.status(400).send({ Error: "Missing required fields" });
        }


        if(data.skills?.length>10)
        {
            return res.status(400).send({Error: "Maximum 10 skills allowed"})
        }
    //Creating new instance of user model
    let user =new User(data)
    
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
        res.status(400).send({Error: "Something went wrong"})
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
        res.status(500).send({Error: "Something went wrong"})
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
    try {
        const ALLOWED_FIELDS_FOR_UPDATE=["password","age","gender","photoUrl","about","skills"]
        const isValidOperation= Object.keys(data).every((key)=>ALLOWED_FIELDS_FOR_UPDATE.includes(key))
        if(!isValidOperation)
        {
            return res.status(400).send({Error: "Invalid Operation"})
        }
        if(data.skills.length>10)
        {
            return res.status(400).send({Error: "Maximum 10 skills allowed"})
        }
        const user=await User.findByIdAndUpdate({_id:id},data,{
            returnDocument:"after",
            runValidators:true
        },)
        res.status(201).send({message: "User updated successfully",data:user})
    } catch (error) {
        res.status(500).send({Error: "Something went wrong"})
    }
})
//Update a user by email id
app.patch('/user/email',async(req,res)=>{
    const email =req.body.emailID
    const data =req.body
   try {
    const user= await User.findOneAndUpdate({emailID:email},data,{
        returnDocument:"after"
    })
    res.status(201).send({message: "User updated successfully",data:user})
   } catch (error) {
    res.status(500).send({Error: "Something went wrong"})
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



