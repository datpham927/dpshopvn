const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
    rating: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comment: { type: String, require: true },
    image: { type: Array, default: [] },
    like: { type: Number, default: 0 },
    productID: { type: String, require: true },
});

module.exports = mongoose.model('Reviews', reviewsSchema);
