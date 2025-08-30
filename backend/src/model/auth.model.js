const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNum: {
        type: String,
        required: false,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
