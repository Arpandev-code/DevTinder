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
    //Creating new instance of user model
    let user =new User(req.body)
try {
    await user.save();
    res.status(201).send({message: "User created successfully"})
} catch (error) {
    res.status(400).send({Error: "Something went wrong"})
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



