
const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
    products: [ {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number }
      }],
    totalPrice: { type: Number, require: true, default: 0 },
    paymentMethod: { type: String, require: true },
    isConfirm: { type: Boolean, default: false },
    isConfirmDelivery: { type: Boolean, default: false },
    isDelivering: { type: Boolean, default: false },
    isCanceled: { type: Boolean, default: false },
    isSuccess: { type: Boolean, default: false },
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