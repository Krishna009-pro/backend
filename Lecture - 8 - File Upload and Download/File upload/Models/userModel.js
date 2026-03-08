const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter your first name"]
    },
    lastName: String,
    email: {
        type: String,
        required: [true, "Please enter your email address"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"]
    },
    userType: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Home"
    }]
});

module.exports = mongoose.model("User", userSchema);