const mongoose = require("mongoose")
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
    photo :String,
    public_id: { type: String, required: true },
},{timestamps:true})

module.exports = mongoose.model("Blogs",blogSchema)