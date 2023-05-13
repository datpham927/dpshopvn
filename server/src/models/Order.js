
const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    totalPrice: { type: Number, require: true, default: 0 },
    paymentMethod: { type: String, require: true },
    isHandle: { type: Boolean, default: false },
    isConfirm: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    isCanceled: { type: Boolean, default: false },
    shopId: { type: String, require: true },
    shippingAddress: {
        fullName: { type: String, require: true },
        detailAddress: { type: String, require: true },
        village: { type: String, require: true },
        district: { type: String, require: true },
        city: { type: String, require: true },
        phone: { type: Number, require: true },
    },
    shippingPrice: { type: Number, require: true },
    dateShipping: { type: String }
}, {
    timestamp: true
})

module.exports = mongoose.model("Order", orderSchema)