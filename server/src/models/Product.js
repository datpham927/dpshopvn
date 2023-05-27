const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    images: { type: Array, default: [], require: true },
    title: { type: String, require: true },
    brand: { type: String, require: true },
    slug: {
        type: String, require: true,
        lowercase: true
    },
    size: { type: Array, default: ["2XL,L,M,XL"] },
    star: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    userBought: { type: Array, default: [] },
    oldPrice: { type: Number, default: 0 },
    newPrice: { type: Number, default: 0 },
    inStock: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    categoryCode: { type: String, default: "", require: true },
    details: [{
        name: String,
        value: String
    }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    views: { type: Array, default: [] },// số lượng người truy cập
    description: { type: Array, default: [] },
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema);