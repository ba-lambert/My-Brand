import mongoose from "mongoose"
const blogSchema = new mongoose.Schema({
    blogTitle : {
        type:String,
        required : true
    },
    blogContent : {
        type : String,
        required: true,
    },
    author : {
        type:String,
        required :true
    },
    name : {type:String},
    
    photo :String,
},{timestamps:true})

export default mongoose.model("Blogs",blogSchema)
