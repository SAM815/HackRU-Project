const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    receiver: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required: [true, "Please enter message"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});



module.exports = mongoose.model("Message", messageSchema);