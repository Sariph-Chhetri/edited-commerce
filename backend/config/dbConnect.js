import mongoose from "mongoose";

const connectDb = async(URI) =>{

 await mongoose.connect(URI)
  
.then((data)=>{
    console.log("Connected to database")
})
.catch(err=>{
    console.log(err)
})

}

export default connectDb;


