import mongoose, { model } from "mongoose";

const connetDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("db connected")
    }
    catch(e){

        console.log("error in db" , e)

    }
}

export default connetDB;
 
