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
        if (!id || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                err: false,
                message: "Missing inputs"
            })
        }
        const user = await User.findByIdAndUpdate({ _id: id }, req.body)
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

module.exports = { updateUser, updateUserByAdmin }