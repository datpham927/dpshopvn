const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    userId: { type: String, require: true },
    productId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
}, {
    timestamps: true
})

module.exports = mongoose.model("Cart", cartSchema)