const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
    rating: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comment: { type: String, require: true },
    images: { type: Array, default: [] },
    likes:  { type: Array, default: [] },
    productId: { type: String, require: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('Reviews', reviewsSchema);
