const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
    {
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
        isWatched: { type: Boolean, default: false }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);