import mongoose from "mongoose";
import { MONGODB_NAME, MONGODB_URI } from "./env.ts";

const connectDB = async () => { 
    try {
        const connectionInstance = await mongoose.connect(`${MONGODB_URI}/${MONGODB_NAME}`)
        console.log(`\n MongoDB Connected ! \n DB host : ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDb Connection error",error)
        process.exit(1)
    }
 }

 export default connectDB