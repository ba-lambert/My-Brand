import {Router} from "express"
import { createBlog, getAllBlogs, getSingleBlog, deleteBlog, updateBlog } from "../controllers/blogsController.js"
import cloudinary from "../utils/cloudinary.js"
import upload from "../utils/multer.js"
import validate from "../middleware/validation.js"
import blog_schema from "../validations/validation.js"
import { isLoggedIn } from "../middleware/isLogedin.js"
import passport from "passport"
const router = Router()
router.use(passport.initialize())
router.use(passport.session())
// create blog

router.post("/blog/new",isLoggedIn,upload.single("image"),validate(blog_schema,{abortEarly: false }),createBlog)

//read all blogs
router.get("/blogs",getAllBlogs)

//read single blog
router.get("/blog/:id",getSingleBlog)

//delete single blog
router.delete("/blog/:id",isLoggedIn,deleteBlog)

//update blog
router.put("/blog/:id",isLoggedIn,upload.single("image"),updateBlog)
// get all messages
export default router