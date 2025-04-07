import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB= async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MONGO DB connected successfully");
    }
    catch(error){
        console.error("Error in connecting with database", error);
        process.exit(1);
    }
}

