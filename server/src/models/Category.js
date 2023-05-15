const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    category: { type: String, require: true },
    categoryCode: { type: String, require: true },
}, {
    timestamps: true
})

module.exports = mongoose.model("Category", categorySchema)