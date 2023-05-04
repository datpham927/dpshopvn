const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    followings: { type: Array, default: [] },
    followers: { type: Array, default: [] },
    cart: { type: Array, default: [] },
    isAdmin: { type: Boolean, default: false },
    address: { type: String },
    mobile: { type: String },
    avatar_url: { type: String },
    passwordChangedAt: { type: String },
    confirm: { type: Boolean, default: false },
    verificationEmailToken: { type: String },
    passwordResetToken: { type: String },
    passwordTokenExpires: { type: String },
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);