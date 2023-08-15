const mongoose = require("mongoose")

const notificationSchema = mongoose.Schema({
    user: { type: String, require: true },
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    user_name: { type: String, require: true },
    title: { type: String, require: true },
    subtitle: { type: String, require: true },
    image_url: { type: String },
    link: { type: String },
    is_watched: { type: Boolean, default: true },
}, {
    timestamps: true
})

module.exports = mongoose.model("Notification", notificationSchema)