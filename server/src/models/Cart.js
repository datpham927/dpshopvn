const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    userId: { type: String, require: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    shopId: { type: String },
    quantity: { type: Number, default: 1 },
    price: { type: Number, require: true }
}, {
    timestamps: true
})

module.exports = mongoose.model("Cart", cartSchema)