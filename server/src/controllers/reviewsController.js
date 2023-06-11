const Reviews = require("../models/Reviews")


const createComment = async (req, res) => {
    try {
        const { pid } = req.params
        if (!pid || Object.keys(req.body)?.length === 0) return res.status(401).json({ success: false, message: "Input required!" })
        const comment = await Reviews.create({ userId: req.userId, productId: pid, ...req.body })
        return res.status(201).json({
            success: comment ? true : false,
            message: comment ? "Created success" : "Created failed",
            comment: comment ? comment : null
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const deleteComment = async (req, res) => {
    try {
        const { cid } = req.params
        if (!cid) return res.status(401).json({ success: false, message: "cid required!" })
        const comment = await Reviews.findByIdAndDelete(cid)
        return res.status(201).json({
            success: comment ? true : false,
            message: comment ? "Delete success" : "Delete failed",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const getComment = async (req, res) => {
    try {
        const { pid } = req.params
        if (!pid) return res.status(401).json({ success: false, message: "productId required!" })
        const option = "-verificationEmailToken -passwordTokenExpires -updatedAt -password -cart"
        const comment = await Reviews.find({ productId: pid }).populate("userId", option).sort("-createdAt")
        return res.status(201).json({
            success: comment ? true : false,
            data: comment ? comment : null
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const editComment = async (req, res) => {
    try {
        const { cid } = req.params
        if (Object.keys(req.body)?.length === 0) return res.status(401).json({ success: false, message: "Input required!" })
        const comment = await Reviews.findByIdAndUpdate(cid, req.body, { new: true })
        return res.status(201).json({
            success: comment ? true : false,
            message: comment ? "Update successfully" : "Update failed",
            data: comment ? comment : null
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const likeComment = async (req, res) => {
    try {
        const comment = await Reviews.findById(req.params.cid)
        comment.likes.push(req.userId)
        comment.save()
        res.status(200).json({
            success: true,
            message: "Comment has been like",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
const unlikeComment = async (req, res) => {
    try {
        const comment = await Reviews.findByIdAndUpdate(req.params.cid, { $pull: { likes: req.userId } })
        console.log(comment)
        res.status(200).json({
            success: true,
            message: "Comment has been unlike",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
module.exports = { createComment, getComment, editComment, likeComment, unlikeComment, deleteComment }