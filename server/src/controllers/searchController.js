const SearchHistory = require("../models/Search")
const Product = require("../models/Product")



const addHistory = async (req, res) => {
    try {
        const search = await SearchHistory.findOne({ text: req.body.text })
        if (search) {
            return res.status(200).json({
                success: false,
            })
        }
        const response = await SearchHistory.create({ userId: req.userId, ...req.body })
        res.status(200).json({
            success: response ? true : false,
            data: response ? response : null
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const searchHistory = async (req, res) => {
    try {
        const response = await SearchHistory.find({ userId: req.userId }).sort("-createdAt")
        res.status(200).json({
            success: response ? true : false,
            data: response ? response : null
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const suggestResult = async (req, res) => {
    try {
        const response = await Product.find({ title: { $regex: `^${req.query.title}`, $options: 'i' } }).select("title _id").limit(10)
        res.status(200).json({
            success: response ? true : false,
            data: response ? response : null
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
module.exports = { searchHistory, addHistory, suggestResult, suggestResult }