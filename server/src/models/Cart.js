const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    user: { type: String, require: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    shopId: { type: String },
    quantity: { type: Number, default: 1 },
    totalPrice: { type: Number, require: true },
    image_url: { type: String },
}, {
    timestamps: true
})

module.exports = mongoose.model("Cart", cartSchema)