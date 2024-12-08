import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://raghuvanshirajnishsingh:Rajnish%40123@cluster0.u08xf.mongodb.net/swiggy-app?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
        console.log("DB Connected");
    })
}