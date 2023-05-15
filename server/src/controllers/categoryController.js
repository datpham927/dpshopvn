const { categories } = require("../ulits/const")
const Category = require("../models/Category")
const autoCode = require("../ulits/autoCode")




const insertCategory = async (req, res) => {
    try {
        const data = categories.map(async e => {
            return await Category({
                category: e.category,
                categoryCode: autoCode(e.category)
            }).save()
        })
        res.json({
            message: data ? data : "Failed"
        })
    } catch (error) {
        res.json(error.message)
    }
}
const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find()
        res.json({
            success: categories ? true : false,
            message: categories ? "success" : "Failed",
            categories
        })
    } catch (error) {
        res.json(error.message)
    }
}


module.exports = { insertCategory, getAllCategory }