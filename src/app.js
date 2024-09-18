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
const {adminAuthCheck, userAuthCheck}=require('./middleware/auth')
app.use('/admin',adminAuthCheck)
app.use('/',(err,req,res,next)=>{
    if(err)
    {
        res.status(500).send("Something went wrong");
    }
 
 })

app.get('/admin/getallusers', (req,res)=>{
    res.send("All user data has been sent")
})

app.delete('/admin/deleteUser', (req,res)=>{
    res.send("User has been deleted")
})

app.get('/user',userAuthCheck,(req,res)=>{
   throw new Error("Something went wrong");
    res.send("User Data has been sent");
})
app.use('/',(err,req,res,next)=>{
    if(err)
    {
        res.status(500).send("Something went wrong");
    }
 
 })


app.listen(3000,()=>{
    console.log('Listening on port 3000');
})