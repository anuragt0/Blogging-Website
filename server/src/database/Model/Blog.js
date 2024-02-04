const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const BlogSchema = mongoose.Schema({

    title: {
        type: String
    },
    description: {
        type: String
    },
    user_id: {
        type: mongoose.Types.ObjectId
    },
    createdBy: {
        type: String
    },
    time: {
        type: Date,
        default: Date.now(),
    }

})

const Blog = mongoose.model("blog", BlogSchema);
module.exports = Blog
