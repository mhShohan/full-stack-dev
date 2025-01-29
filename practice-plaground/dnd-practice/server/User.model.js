const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    index: Number,
    name: String,
    email: String,
},{timestamps: true, autoIndex: true})

const User = mongoose.model("User", userSchema);
module.exports = User
