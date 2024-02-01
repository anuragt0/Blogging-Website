const express = require("express")
const dotenv = require('dotenv');
const userRoutes = require('./src/api/user/routes.js');

dotenv.config();

const app = express()

const connectToMongoDB = require("./src/database/config")
connectToMongoDB()

app.use(express.json())



app.use("/api/user", userRoutes);
app.use("/api/blog", require("./src/api/blog/routes.js"));



app.listen(4000,()=>{
    console.log('Server is running on port 4000')
})