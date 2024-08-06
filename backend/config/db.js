import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
