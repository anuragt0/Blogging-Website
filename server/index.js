const express = require("express")
const connectToMongoDB = require("./src/database/config")

connectToMongoDB()
const app = express()

const User = require("./src/database/Model/User")
const Blog = require("./src/database/Model/Blog")

app.use(express.json())

app.post("/register", async(req,res)=>{
    const new_user = req.body;
    try {
        await User.create(new_user);
        res.status(200).send({message: "Usuário criado com sucesso!"})
    } catch (error) {
        res.status(501).send({message: "user exist!"})
    }
})

app.listen(4000,()=>{
    console.log('Server is running on port 4000')
})