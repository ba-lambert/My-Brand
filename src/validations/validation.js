import joi from "joi"
import errorMessage from "../utils/validationError.js"
const blog_schema = joi.object({
    blogTitle : joi.string().min(10).max(100).messages(errorMessage('Blog Title')),
    blogContent :joi.string().min(10).messages(errorMessage('Blog Content')),  
    author : joi.string().min(10).messages(errorMessage('author')),
})
const commentSchema = joi.object({
    userNames : joi.string().min(5).max(30).required().messages(errorMessage('names')),
    email : joi.string().email().required().messages(errorMessage('email')),
    message : joi.string().min(15).required().messages(errorMessage('message'))
})
export {blog_schema,commentSchema}