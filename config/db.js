const mongoose=require("mongoose")

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URl);
        console.log("connect data base")
    }catch(error){
        console.log(`mongo not connect${error}`)

    }
}
module.exports=connectDB;