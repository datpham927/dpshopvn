const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
    {
        members: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, isWatched: { type: Boolean, default: true } }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);