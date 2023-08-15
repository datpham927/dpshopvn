const mongoose = require("mongoose")


const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: String
    },
    sender: {
        type: String
    },
    receiver: {
        type: String
    },
    text: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("message", MessageSchema)