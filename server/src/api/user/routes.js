const router = require('express').Router();
const jwt = require("jsonwebtoken")

const User = require("../../database/Model/User")
const Blog = require("../../database/Model/Blog")

const authentication = require("../../middlewares/authentication")


router.post("/register", async(req,res)=>{
    const new_user = req.body;
    try {
        await User.create(new_user);
        res.status(200).json({message: "User is registered successfully", success: true})
    } catch (error) {
        res.status(501).json({message: "Internal server error!", success: false})
    }
})

router.post("/login",  async(req,res)=>{
    const data = req.body;
    // console.log(data);
    try {
        const user = await User.findOne({email: data.email});
        // console.log(user);
        if(!user){
            return res.status(401).json({message:"Email does not exists"})
        }
        // user exists with data.email
        const newPass = data.password;
        const storedPass = user.password;
        if(newPass !== storedPass){
            return res.status(403).send({message: 'Password is incorrect'});
        }
        //password is correct
        //generate token

        const tokenData = {
            id: user._id,
            exp: Math.floor(Date.now() / 1000) + 60*60*24
        }
        // console.log(tokenData);

        const token = jwt.sign(tokenData, process.env.JWT_SECRET);
        // console.log(token);


        res.status(200).json({success: true, message: "Logged in successfully", token});

    } catch (error) {
        res.status(501).json({message: "Internal server error!"})
    }
})

router.get("/profile", authentication, async (req,res)=>{
    const userId = req.mongoId;
    try {
        const userDoc = await User.findById(userId).select('-password -_id ');
        const blogIds = userDoc.blog_ids;
        const blogs = await Blog.find({ _id: { $in: blogIds } }).exec();
        const newUserDoc = {name: userDoc.name, email: userDoc.email};
        res.status(200).json({success: true, userDoc: newUserDoc, blogs});
    } catch (error) {
        res.status(501).json({message: "Internal server error!"})
    }

})




module.exports = router;