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
// create blog
router.post("/blog",upload.single("image"),createBlog)

//read all blogs
router.get("/blogs",getAllBlogs)

//read single blog
router.get("/:id",getSingleBlog)

//delete single blog
router.delete("/:id",deleteBlog)

//update blog
router.put("/:id",upload.single("image"),updateBlog)
// get all messages
module.exports = router