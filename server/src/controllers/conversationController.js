const User = require("../models/User")
const Conversation = require("../models/conversation")


const createConversation = async (req, res) => {
    try {
        const { receiver } = req.body
        if (!receiver) return res.status(403).json({
            success: false,
            message: "receiver was required"

        })
        const conversation = await Conversation.findOne({ members: { $in: [receiver] }, members: { $in: [req.userId] } })
        if (conversation) return res.status(404).json({
            success: false
        })
        const response = await Conversation.create({ members: [receiver, req.userId] })
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

const getAllConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find({ members: { $in: [req.userId] } })
        if (!conversations) return res.status(404).json({
            success: false
        })
        const option = "_id firstName lastName avatar_url userId email"
        const conversationsNew = await Promise.all(conversations.map(async conversation => {
            const members = await Promise.all(conversation?.members.map(user => {
                return User.findById(user).select(option)
            }))

            return {
                ...conversation.toObject(),
                members
            }
        }))
        res.status(200).json({
            success: conversationsNew ? true : false,
            data: conversationsNew ? conversationsNew : null
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = {
    createConversation,
    getAllConversations
}