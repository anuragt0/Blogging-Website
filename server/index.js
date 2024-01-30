const express = require("express")
const dotenv = require('dotenv');
dotenv.config();

const app = express()

const connectToMongoDB = require("./src/database/config")
connectToMongoDB()

app.use(express.json())


app.use("/api/user", require("./src/api/user/routes.js"));
app.use("/api/blog", require("./src/api/blog/routes.js"));



app.listen(4000,()=>{
    console.log('Server is running on port 4000')
})