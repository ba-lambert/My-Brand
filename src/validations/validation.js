import joi from "joi"
import errorMessage from "../utils/validationError.js"
const blog_schema = joi.object({
    blogTitle : joi.string().min(10).max(100).messages(errorMessage('Blog Title')),
    blogContent :joi.string().min(10).messages(errorMessage('Blog Content')),  
    author : joi.string().min(10).messages(errorMessage('author')),
})
export default blog_schema