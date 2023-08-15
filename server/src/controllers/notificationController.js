const Notification = require("../models/notification")






const createNotification = async (req, res) => {
    try {
        const notification = await Notification.create({ userId: req.userId, ...req.body })
        return res.status(201).json({
            success: notification ? true : false,
            message: notification ? "Created success" : "Created failed",
            data: notification ? notification : null
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getNotifications = async (req, res) => {
    try {
        const currentDate = new Date();
        const oneWeekAgo = new Date(currentDate - 7 * 24 * 60 * 60 * 1000);
        const notifications = await Notification.find({ shopId: req.userId, createdAt: { $gte: oneWeekAgo } }).sort('-createdAt')
        return res.status(201).json({
            success: notifications ? true : false,
            message: notifications ? "Success" : "Failed",
            data: notifications ? notifications : null
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const confirmIsWatched = async (req, res) => {
    try {
        const notification = await Notification.updateMany(
            { shopId: req.userId },
            { $set: { is_watched: false } })

        return res.status(201).json({
            success: notification ? true : false,
            message: notification ? "Success" : "Failed",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    createNotification,
    getNotifications, confirmIsWatched
}