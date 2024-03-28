import mongoose from "mongoose";
import { Schema } from "mongoose";

import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    username :{
        type : String,
        required : true,
        unique : true,
        lowwercase : true,
        trim : true,
        index : true,
    },
    email :{
        type : String,
        required : true,
        unique : true,
        lowwercase : true,
        trim : true,
        
    },
    fullName :{
        type : String,
        required : true,
        trim: true,
        index : true,
    },
    avatar : {
        type : String, //cloudinary url
        required : true,
    },
    coverImage:{ 
        type : String, //cloudinary url
        required : true,

    },
    watchHistory :{
        type : Schema.Types.ObjectId,
        ref : "Video"
    },
    passowrd : {
        type : String,
        required : [true,'password is required']
    },
    refreshToken :{
        type : String
    }
},{
    timestamps : true
})

userSchema.pre("save", async function(next){

    if(!this.isModified("password")) return next();
    this.passowrd =bcrypt.hash(this.password , 10)
})
export const  user = mongoose.model("user", userSchema) ;