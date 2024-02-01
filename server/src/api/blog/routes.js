const router = require('express').Router();
const authenticate = require("../../middlewares/authentication");
const Blog = require("../../database/Model/Blog")
const User = require("../../database/Model/User")

router.get("/all", authenticate, async (req,res)=>{
    try {
        const blogs = await Blog.find();
        res.status(200).json({blogs, message: "Blogs retrieved successfully"});
    } catch (error) {
        res.status(501).json({message: "Internal server error", success:  false, errors: error});
    }
})

router.post("/create", authenticate, async (req, res)=>{
    const userId = req.mongoId;
    const blog = req.body;
    blog.user_id = userId;
    
    try {
        // Step 1: Create Blog and take blog ID
        const newBlog = await Blog.create(blog);
        console.log(newBlog);
        const blogId = newBlog._id;

        //step2: Update the user, append blogId in user.blog_ids
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $push: { blog_ids: blogId } },
            { new: true }
          );
          console.log(updatedUser);

        res.status(200).json({message: "Blog created successfully", success: true});
        
    } catch (error) {
        res.status(501).json({message: "Internal server error", success:  false, errors: error});
    }
});

router.put("/update/:blog_id", authenticate, async (req,res)=>{
    const {blog_id} = req.params;
    const newBlog = req.body;
    // get the userID, then get blog_ids of that user
    // now check if blog_id is present in blog_ids of logged in user.
    // This is done to check that user is not doing operations on blogs of other users.
    let userId= req.mongoId;
    try {
        const result = await User.findOne({
            _id: userId, 
            blog_ids: { $in: (blog_id) }
          });

        if(!result){
            return res.status(401).json({message: "Unauthorized access", success: false});
        }
        await Blog.findOneAndUpdate({_id: blog_id}, newBlog, {new: true});
        res.status(200).json({message: "Blog updated successfully", success: true});

    } catch (error) {
        res.status(501).json({message: "Internal server error", success:  false, errors: error});
    }  
})

router.delete("/delete/:blog_id", authenticate, async (req, res)=>{
    const {blog_id} = req.params;
    const userId = req.mongoId;
    try {
        const result = await User.findOne({
            _id: userId, 
            blog_ids: { $in: (blog_id) }
          });

        if(!result){
            return res.status(401).json({message: "Unauthorized access", success: false});
        }

        await Blog.findByIdAndDelete(blog_id);

        //Next step is to remove this blog_id from blog_ids arrays of the user

        await User.updateOne(
            { _id: userId },
            { $pull: { blog_ids: blog_id } },
          );

        res.status(200).json({message: "Blog deleted successfully", success: true});

    } catch (error) {
        res.status(501).json({message: "Internal server error", success:  false, errors: error});
    }
})



module.exports = router;