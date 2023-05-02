const User = require("../models/User")


const updateUser = async (req, res) => {
    try {
        const userId = req.userId
        if (!userId || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                err: false,
                message: "Missing inputs"
            })
        }
        const user = await User.findByIdAndUpdate({ _id: userId }, req.body)
        if (!user) {
            return res.status(401).json({
                err: false,
                message: "The user is not defined",
            })
        }
        return res.status(200).json({
            err: true,
            message: "Update successful",
        })
    } catch (error) {
        return res.status(500).json({
            err: false,
            message: error.message,
        })
    }
}

const updateUserByAdmin = async (req, res) => {
    try {
        const { id } = req.params
        console.log("id", id)
        if (!id || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                err: false,
                message: "Missing inputs"
            })
        }
        const user = await User.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        console.log("user", user)
        if (!user) {
            return res.status(401).json({
                err: false,
                message: "The user is not defined",
            })
        }
        return res.status(200).json({
            err: true,
            message: "Update successful",
        })
    } catch (error) {
        return res.status(500).json({
            err: false,
            message: error.message,
        })
    }
}
const detailUser = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.status(401).json({
            err: false,
            message: "id not found"
        })
        const user = await User.findById(id)
        if (!user) return res.status(401).json({
            err: false,
            message: "User not found"
        })
        const { password, verificationEmailToken, ...dataUser } = user.toObject()
        return res.status(200).json({
            err: true,
            message: "successful",
            data: dataUser
        })
    } catch (error) {
        return res.status(500).json({
            err: false,
            message: error.message,
        })
    }
}
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        if (id === req.userId) return res.status(401).json({
            err: false,
            message: "You can not delete your account"
        })
        const user = await User.findByIdAndDelete(id)
        if (!user) return res.status(401).json({
            err: false,
            message: "User not found"
        })
        return res.status(200).json({
            err: true,
            message: "Account has been deleted",
        })
    } catch (error) {
        return res.status(500).json({
            err: false,
            message: error.message,
        })
    }
}
//following
const following = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const currentUser = await User.findById(req.userId)
        if (currentUser.followings.includes(req.params.id)) {
            await user.updateOne({ $pull: { followers: req.userId } })
            await currentUser.updateOne({ $pull: { followings: req.params.id } });
            res.status(200).json({
                err: true,
                message: "user has been unfollowed",
            })
        } else {
            await user.updateOne({ $push: { followers: req.userId } })
            await currentUser.updateOne({ $push: { followings: req.params.id } });
            res.status(200).json({
                err: true,
                message: "user has been followed",
            })
        }
    } catch (error) {
        res.status(500).json({
            err: false,
            message: error.message,
        })
    }
}

module.exports = { updateUser, updateUserByAdmin, detailUser, deleteUser, following }