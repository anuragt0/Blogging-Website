const router = require('express').Router();

const User = require("../../database/Model/User")
const Blog = require("../../database/Model/Blog")

const jwt = require("jsonwebtoken")


router.post("/register", async(req,res)=>{
    const new_user = req.body;
    try {
        await User.create(new_user);
        res.status(200).json({message: "Usuário criado com sucesso!"})
    } catch (error) {
        res.status(501).json({message: "Internal server error!"})
    }
})

router.post("/login",  async(req,res)=>{
    const data = req.body;
    // console.log(data);
    try {
        const user = await User.findOne({email: data.email});
        console.log(user);
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
            id: user.id,
            exp: Math.floor(Date.now() / 1000) + 60*60*24
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRET);
        console.log(token);


        res.status(200).json({success: true, message: "Logged in successfully", token});

    } catch (error) {
        res.status(501).json({message: "Internal server error!"})
    }
})





module.exports = router;