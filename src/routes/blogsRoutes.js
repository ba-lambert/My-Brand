import {Router} from "express"
import { createBlog, getAllBlogs, getSingleBlog, deleteBlog, updateBlog } from "../controllers/blogsController.js"
import cloudinary from "../utils/cloudinary.js"
import upload from "../utils/multer.js"
import validate from "../middleware/validation.js"
import blog_schema from "../validations/validation.js"
const router = Router()
// create blog

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
export default router