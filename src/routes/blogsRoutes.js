import {Router} from "express"
import { createBlog, getAllBlogs, getSingleBlog, deleteBlog, updateBlog,createComment, readComments, createliked  } from "../controllers/blogsController.js"
import cloudinary from "../utils/cloudinary.js"
import upload from "../utils/multer.js"
import validate from "../middleware/validation.js"
import {blog_schema,commentSchema} from "../validations/validation.js"
import { isLoggedIn,isLoggedInAsAdmin } from "../middleware/isLogedin.js"
import passport from "passport"
const router = Router()
router.use(passport.initialize())
router.use(passport.session())
// create blog

router.post("/blogs",isLoggedIn,validate(blog_schema,{abortEarly: false }),upload.single("image"),createBlog)

//read all blogs
router.get("/blogs",getAllBlogs)

//read single blog
router.get("/blogs/:id",getSingleBlog)

//delete single blog
router.delete("/blogs/:id",isLoggedInAsAdmin,deleteBlog)

//update blog
router.put("/blogs/:id",isLoggedInAsAdmin,upload.single("image"),updateBlog)
// create a new comment
router.post("/blogs/:id/comments",isLoggedIn,createComment)
//get all comments
router.get("/blogs/:id/comments",readComments)
//liked
router.post("/blogs/:id/likes",isLoggedIn,createliked)

// router.get("/blog/:id/liked",isLoggedIn,readliked)

export default router