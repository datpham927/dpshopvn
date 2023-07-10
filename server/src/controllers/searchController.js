const SearchHistory = require("../models/SearchHistory")
const Product = require("../models/Product")



const addHistory = async (req, res) => {
    try {
        const search = await SearchHistory.findOne({ text: req.body.text })
        if (search) {
            return res.status(200).json({
                success: false,
            })
        }
        const response = await SearchHistory.create({ user: req.userId, ...req.body })
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
        const response = await SearchHistory.find({ user: req.userId }).sort("-createdAt")
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

const deleteHistory=async (req, res) => {
    try {
        const response = await SearchHistory.findByIdAndDelete(req.params.tid) 
        res.status(200).json({
            success: response ? true : false,
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
        const response = await Product.find({ title: { $regex: `^${req.query.title}`, $options: 'i' } }).select("title _id slug").limit(10)
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

const searchResults = async (req, res) => {
    try {
        const response = await Product.find({ title: { $regex:`${req.query.title}`} }).limit(20)
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



module.exports = { searchHistory, addHistory, suggestResult, suggestResult ,deleteHistory,searchResults}