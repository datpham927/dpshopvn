const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    image_url: { type: String, require: true },
    images: { type: Array, default: [], require: true },
    title: { type: String, require: true },
    brand: { type: String, require: true },
    brand_slug: { type: String, require: true },
    slug: {
        type: String, require: true,
        lowercase: true
    },
    star: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    userBought: { type: Array, default: [] },
    old_price: { type: Number, default: 0 },
    new_price: { type: Number, default: 0 },
    in_stock: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    category_code: { type: String, default: "", require: true },
    category_name: { type: String, default: "", require: true },
    infoProduct: [{
        name: String,
        value: String
    }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    views: { type: Number, default: 0 },// số lượng người truy cập
    description: { type: String, default: "" },
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema);