
const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
    products: [ {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number }
      }],
    is_pay: { type: Boolean, require: true, default: false },
    totalPrice: { type: Number, require: true, default: 0 },
    paymentMethod: { type: String, require: true },
    is_confirm: { type: Boolean, default: false },
    is_confirm_delivery: { type: Boolean, default: false },
    is_delivering: { type: Boolean, default: false },
    is_canceled: { type: Boolean, default: false },
    is_success: { type: Boolean, default: false },
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
    timestamps: true
})

module.exports = mongoose.model("Order", orderSchema)