import mongoose from "mongoose";

const SignUpSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:200,
        trim:true
    },
    email:{
        type:String,
        required:true,
        maxLength:200,
        trim:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    address:{
        type:String,
        required:true,
        maxLength:2000
    },
},
{timestamps:true}
)

export default mongoose.models.SignUp || mongoose.model("SignUp",SignUpSchema)