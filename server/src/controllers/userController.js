const User = require("../models/User")


const updateUser = async (req, res) => {
    try {
        const userId = req.userId
        if (!userId || Object.keys(req.body)?.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Missing inputs"
            })
        }
        const user = await User.findByIdAndUpdate({ _id: userId }, req.body)
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "The user is not defined",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Update successful",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
const currentUserDetail = async (req, res) => {
    try {
        if (!req.userId) return res.status(401).json({
            success: false,
            message: "id not found"
        })
        const user = await User.findById(req.userId).select("-password -verificationEmailToken -passwordTokenExpires -confirm")
        if (!user) return res.status(401).json({
            success: false,
            message: "User not found"
        })
        return res.status(200).json({
            success: true,
            message: "successful",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const adminUserDetail = async (req, res) => {
    try {
        const { cid } = req.params
        if (!cid) return res.status(401).json({
            success: false,
            message: "id not found"
        })
        const user = await User.findById(id)
        if (!user) return res.status(401).json({
            success: false,
            message: "User not found"
        })
        const { password, verificationEmailToken, ...dataUser } = user.toObject()
        return res.status(200).json({
            success: true,
            message: "successful",
            data: dataUser
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
const detailShop = async (req, res) => {
    try {
        const { sid } = req.params
        const shop = await User.findById(sid).select("-password -verificationEmailToken -passwordTokenExpires -confirm")
        if (!shop) return res.status(401).json({
            success: false,
            message: "User not found"
        })
        return res.status(200).json({
            success: true,
            message: "successful",
            data: shop
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//following
const following = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const currentUser = await User.findById(req.userId)
        await user.updateOne({ $push: { followers: req.userId } })
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json({
            success: true,
            message: "user has been followed",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
//unfollowing
const unFollowing = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const currentUser = await User.findById(req.userId)
        await user.updateOne({ $pull: { followers: req.userId } })
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json({
            success: true,
            message: "user has been unfollowed",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
//   admin
const updateUserByAdmin = async (req, res) => {
    try {
        const { userId } = req.body
        if (!userId || Object.keys(req.body)?.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Missing inputs"
            })
        }
        const user = await User.findByIdAndUpdate({ _id: userId }, req.body, { new: true })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "The user is not defined",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Update successful",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
// get all users

const getAllUsers = async (req, res) => {
    try {
        const option = "-passwordTokenExpires -password -verificationEmailToken"
        const allUser = await User.findOne().select(option)
        res.status(200).json({
            success: allUser ? true : false,
            data: allUser ? allUser : null
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.body
        if (userId === req.userId) return res.status(401).json({
            success: false,
            message: "You can not delete your account"
        })
        const user = await User.findByIdAndDelete(userId)
        if (!user) return res.status(401).json({
            success: false,
            message: "User not found"
        })
        return res.status(200).json({
            success: true,
            message: "Account has been deleted",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


module.exports = {
    updateUser, updateUserByAdmin, currentUserDetail,
    adminUserDetail, deleteUser, following, unFollowing, getAllUsers,detailShop
}