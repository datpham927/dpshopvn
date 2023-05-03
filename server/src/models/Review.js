const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: { type: Number, default: 0 },
    comment: { type: String, require: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
});

module.exports = mongoose.model('Review', reviewSchema);
