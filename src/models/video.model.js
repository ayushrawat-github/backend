import mongoose from "mongoose";
import { Schema } from "mongoose";

import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema({
    videoFile :{
        type : String, //cloudinary url
        required : true,
    },
    thumbnail : {
        type : String , // cloudinary url 
        required: true,
    },
    tittle : {
        type : String ,  
        required: true,
    },
    description : {
        type : String , 
        required: true,
    },
    duration : {
        type : number , // cloudinary url 
        required: true,
    },
    views : {
        type : number , 
        default : 0,
    },
    isPublished : {
        type : Boolean , 
        default : true, 
    },
    owner : {
        type : Schema.Types.ObjectId , 
        ref : "user"
        
    },

}, {timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video", videoSchema)