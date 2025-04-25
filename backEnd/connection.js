import mongoose from "mongoose";

export default async function connection(){


    const db = await mongoose.connect("mongodb://localhost:27017/Sticky")
    console.log("Database connected")

    return db
}