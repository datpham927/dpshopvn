const mongoose = require("mongoose")

const searchHistorySchema = mongoose.Schema({
    text: { type: String, require: true, unique: true },
    createdby: { type: String, require: true },
}, {
    timestamps: true
})

module.exports = mongoose.model("SearchHistory", searchHistorySchema)