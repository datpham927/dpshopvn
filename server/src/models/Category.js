const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    category: { type: String, require: true },
    category_code: { type: String, require: true },
    category_image:{ type: String, require: true },
    category_slug:{ type: String, require: true },
}, {
    timestamps: true
})

module.exports = mongoose.model("Category", categorySchema)