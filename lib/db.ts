import mongoose, { Connection } from "mongoose";

let isConnected: Connection | boolean = false;

const connectDB = async () => {
    if (isConnected) {
        console.log("MongoDB already connected.");
        return isConnected;
    }
    try {
        const db = await mongoose.connect(process.env.MONGO_URI!);
        isConnected = db.connection; // Use the returned connection object from mongoose.connect
        console.log("MongoDB Connected.");
        return isConnected;
    } catch (error) {
        console.error("Database connection error:", error);
        throw new Error("Failed to connect to MongoDB");
    }
};

export default connectDB;
