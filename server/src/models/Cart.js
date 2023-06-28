const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    user: { type: String, require: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    shopId: { type: String },
    quantity: { type: Number, default: 1 },
    unitPrice: { type: Number, require: true },
    totalPrice: { type: Number, require: true }
}, {
    timestamps: true
})

module.exports = mongoose.model("Cart", cartSchema)