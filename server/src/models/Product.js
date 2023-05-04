const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    image: { type: Array, default: [], require: true },
    title: { type: String, require: true },
    slug: {
        type: String, require: true,
        lowercase: true
    },
    Star: { type: Number },
    sold: { type: Number },
    userBought: { type: Array, default: [] },
    price: { type: Number },
    inStock: { type: String },
    discount: { type: Number },
    category: { type: String },
    details: {
        brand: { type: String },
        brandOrigin: { type: String },
        origin: { type: String },
    },
    userId: { type: String },
    view: { type: Array, default: [] },// số lượng người truy cập
    description: { type: Array, default: [] },
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema);