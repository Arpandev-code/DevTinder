const mongoose= require('mongoose');

const connectDB=async()=>{
  await  mongoose.connect('mongodb+srv://hiitsarpandev:u4MXPf2UBnwWXqWV@namastenodedb.bwj3x.mongodb.net/devTinder')
}

module.exports=connectDB