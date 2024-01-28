const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const UserSchema = mongoose.Schema({

    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    blog_ids: {
        type: [mongoose.Types.ObjectId],
        default: []
    }

})

const User = mongoose.model("user", UserSchema);
module.exports = User
