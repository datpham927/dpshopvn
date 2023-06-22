const Reviews = require("../models/Reviews")


const createReview = async (req, res) => {
    try {
        const { pid } = req.params
        if (!pid || Object.keys(req.body)?.length === 0) return res.status(401).json({ success: false, message: "Input required!" })
        const comment = await Reviews.create({ createdby: req.userId, productId: pid, ...req.body })
        return res.status(201).json({
            success: comment ? true : false,
            message: comment ? "Created success" : "Created failed",
            data: comment ? comment : null
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const deleteReview = async (req, res) => {
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
const getAllReviews = async (req, res) => {
    try {
        const { pid } = req.params
        if (!pid) return res.status(401).json({ success: false, message: "productId required!" })
        const newQuery = {
            productId: pid
        };
        if (req.query.rating) {
            newQuery.rating = req.query.rating
        }

        const option = "-verificationEmailToken -passwordTokenExpires -updatedAt -password -cart"
        let allReviews = Reviews.find(newQuery).populate("userId", option).sort("-createdAt")

        const limit = req.query.limit
        const page = req.query.page * 1 || 0
        const skip = page * limit
        allReviews = allReviews.limit(limit).skip(skip)
        const totalReviews = await Reviews.countDocuments(newQuery)
        const newAllReviews = await allReviews
        return res.status(201).json({
            success: newAllReviews ? true : false,
            totalPage: limit ? Math.ceil(totalReviews / limit) - 1 : 0,
            currentPage: page,
            total_reviews: totalReviews,
            data: newAllReviews ? newAllReviews : null,
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

const getRatingsProduct = async (req, res) => {
    try {
        const ratings = await Reviews.find({ productId: req.params.pid }).select("rating _id")
        res.status(200).json({
            success: ratings ? true : false,
            data: ratings ? ratings : null,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}





module.exports = { createReview, getAllReviews, editComment, likeComment, unlikeComment, deleteReview, getRatingsProduct }