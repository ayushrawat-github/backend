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
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullName : this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : ACCESS_TOKEN_EXPIRY
        }    
    )
}

userSchema.methods.genrateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : REFRESH_TOKEN_EXPIRY
        }
    )
}
export const  user = mongoose.model("user", userSchema) ;