import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URL;

const connectDB = async ()=>{
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error: ",error.essage);
    res.status(500).json({"message": "Database not connected"});
  }
}

export default connectDB