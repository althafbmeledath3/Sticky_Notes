import mongoose from "mongoose";



const userSchema = new mongoose.Schema({

    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},

    notes:[{
        title:{type:String,default:null},
        content:{type:String,default:null}
    }]
})

export default mongoose.models.Users || mongoose.model("Users", userSchema);



