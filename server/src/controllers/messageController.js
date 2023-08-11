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
        const conversation = await Message.find({ conversationId })
        const s = await Conversation.findByIdAndUpdate(conversationId, { $set: { isWatched: true } }, { new: true });
        res.status(200).json({
            success: conversation ? true : false,
            data: conversation ? conversation : null
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