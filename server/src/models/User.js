const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    followings: { type: Array, default: [] },
    followers: { type: Array, default: [] },
    cart: { type: Array, default: [] },
    isAdmin: { type: Boolean, default: false },
    address: { type: String },
    address_detail: { type: String },
    tablet: { type: String },
    avatar_url: { type: String },
    passwordChangedAt: { type: String },
    confirm: { type: Boolean, default: false },
    verificationEmailToken: { type: String },
    passwordResetToken: { type: String },
    totalProduct: { type: Number, default: 0 },
    passwordTokenExpires: { type: String },
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);