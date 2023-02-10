import mongoose  from "mongoose"
import blogs from "../models/blogsModel.js"
import commentSchema from "../models/commentSchema.js"
import  cloudinary  from "../utils/cloudinary.js"
//create a blog
const createBlog = async(req,res) =>{
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const newBlog = await blogs.create({
            blogTitle : req.body.blogTitle,
            blogContent:req.body.blogContent,
            author : req.body.author,
            name: req.body.name,
            photo : result.secure_url
        })
        const blogCreated =await newBlog.save()
        res.status(201).json(blogCreated)
    } catch (error) {
        res.status(404).json(error)
    }
}

//read all blogs
const getAllBlogs = async (req,res)=>{
    try {
        const blog = await blogs.find({}).sort({createdAt :-1})
        res.status(201).json(blog)
    } catch (error) {
        res.status(404).json(error)
    }
}

//get a single blog

const getSingleBlog = async (req,res)=>{
    const {id} = req.params 
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error :"there is no such blog"})
    }
    const blog1 = await blogs.findById(id);
    if( !blog1){
        return res.status(404).json({error: "there is no such blog"})
    }
    res.status(201).json(blog1)
}
//delete single blog 
const deleteBlog = async(req,res)=>{
    try {
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(404).json({error:"there is no such blog"})
        }
        const blog = await blogs.findOneAndDelete({_id:id});
        res.status(201).json(blog)
    } catch (error) {
        console.log(error);
    }
}
const updateBlog = async (req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid){
        res.status(404).json({error:"there is no such blog"})
    }
    // const result = await cloudinary.uploader.destroy(blogs.cloudinary_id)
    const result = await cloudinary.uploader.upload(req.file.path);
    const updateB = await blogs.findOneAndUpdate({_id :id },{
        blogTitle : req.body.blogTitle,
        blogContent:req.body.blogContent,
        author : req.body.author,
        name: req.body.name,
        photo : result.secure_url
        
    })
    if(!updateB){
        res.status(404).json({error:"there is no such blog"})
    }
    res.status(201).json(updateB)
}
const createComment = async (req,res)=>{
    const id = req.params.id;
    const user = req.user._id
    // get the comment text and record post id
    const comment = await commentSchema({
        text: req.body.comment,
        Blog: id,
        userName: user 
    })
              // save comment
    await comment.save();
           res.status(201).json(comment)
           const blogRelated = await blogs.findById(id);
           blogRelated.comment.push(comment);
           await blogRelated.save()
}
const readComments = (req,res)=>{
    blogs.findOne({ _id: req.params.id  }, (err, blog) => {
        if (blog) {
            commentSchema.find({ Blog: req.params.id }, (err, data) => {
                if (data) {
                    res.status(201).json({
                        code: 201,
                        Comments: data
                    })
                }
            })   
        }
        if (err) {
            res.status(404).json({
                code: 404,
                Error: err
            })
        }
    })
    
}
const createliked = (req,res,err) => {
    // if(err){res.status(404).json({Message:"first login"})}
    // else{
    let userId = req.user._id
    blogs.find({ "_id": req.params.id, "liked" : userId }, async (err, data) => {
        if(data) {
            if (data.length == 0 ) {
                blogs.updateOne(
                    { _id: req.params.id }, 
                    { $push: { "liked" : userId } },
                    (err, tru) => {
                        if (tru) {
                            res.status(200).json({
                                Message: "liked",
                            })
                        }
                        if (err) {
                            res.status(500).json({
                                Message: "Not liked",
                                data: err
                            })
                        }
                    });
            }
            else {
                blogs.findOne({ _id: req.params.id, liked: { $in: userId }}, (err, wow) => {
                    if (!err) {
                        blogs.updateOne({ _id: req.params.id } , { $pull: { liked : userId  } }, (error, wow1) => {
                            if (!err) {
                                res.status(200).json({
                                    Message: "Unliked",
                                })  
                            }
                            else{
                                res.status(500).json({
                                    Message: "Failed",
                                    Error: error
                                }) 
                            }
                        })
                    }
                    else{
                        res.status(400).json({
                            Message: "User not added in liked",
                            Error: err
                        }) 
                    }
                })
            }
        }
        if (err) {
            res.status(400).json({
                Message: "Blog is invalid",
            })
        }
    });
    }
// }
// const readliked =async (req,res)=>{
//     const id= req.body.params
//     const blogRelated = await blogs.findById(id);
//     let count = 0
//     for(let i=0 ;i <= blogRelated;i++){

//         res.status(201).json()
//     }
// }
export {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    deleteBlog,
    updateBlog,
    createComment,
    readComments,
    createliked,
}
