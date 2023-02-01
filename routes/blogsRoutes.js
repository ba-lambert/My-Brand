const router = require("express").Router()
const {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    deleteBlog,
    updateBlog
} = require("../controllers/blogsController")
const {getAllQuerries,newMessage} = require("../controllers/userControler")
const cloudinary  = require("../utils/cloudinary")
const upload = require("../utils/multer")
const validate = require("../middleware/validation")
const joi = require('joi')
const errorMessage = require("../utils/validationError")
// create blog
const blog_schema = joi.object({
    blogTitle : joi.string().min(10).max(100).messages(errorMessage('Blog Title')),
    blogContent :joi.string().min(10),  
    author : joi.string().min(10),
})
router.post("/blog/new",upload.single("image"),validate(blog_schema,{abortEarly: false }),createBlog)

//read all blogs
router.get("/blogs",getAllBlogs)

//read single blog
router.get("/blog/:id",getSingleBlog)

//delete single blog
router.delete("/blog/:id",deleteBlog)

//update blog
router.put("/blog/:id",upload.single("image"),updateBlog)
// get all messages
module.exports = router