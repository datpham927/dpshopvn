const Conversation = require("../models/conversation")
const Message = require("../models/message")


const addMessage = async (req, res) => {
    try {
        const { conversationId } = req.params
        if (!conversationId) return res.status(403).json({
            success: false,
            message: "conversationId was required"
        })
        const response = await Message.create({ conversationId, sender: req.userId, ...req.body })
        await Conversation.findOneAndUpdate(
            { _id: conversationId, "members.user": req.body.receiver },
            { $set: { "members.$.isWatched": false } },
        )
        await Conversation.findOneAndUpdate(
            { _id: conversationId, "members.user": req.useId },
            { $set: { "members.$.isWatched": true } },
        )
        res.status(200).json({
            success: response ? true : false,
            data: response ? response : null
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getAllMessageByConversationId = async (req, res) => {
    try {
        const { conversationId } = req.params
        if (!conversationId) return res.status(403).json({
            success: false,
            message: "conversationId was required"
        })
        const messages = await Message.find({ conversationId })
        await Conversation.findOneAndUpdate(
            { _id: conversationId, "members.user": req.userId },
            { $set: { "members.$.isWatched": true } },
        )
        res.status(200).json({
            success: messages ? true : false,
            data: messages ? messages : null
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = {
    addMessage,
    getAllMessageByConversationId
}