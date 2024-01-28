const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const BlogSchema = mongoose.Schema({

    title: {
        type: String
    },
    desc: {
        type: String
    },
    user_id: {
        type: mongoose.Types.ObjectId
    }

})

const Blog = mongoose.model("blog", BlogSchema);
module.exports = Blog
