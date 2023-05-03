const Product = require("../models/Product")


const createProduct = async (req, res) => {
    try {
        if (Object.keys(req.body).length == 0) {
            return res.status(400).json({
                success: false,
                message: "Input required!"
            })
        }
        const newProduct = await Product.create({ userId: req.userId, ...req.body })
        return res.status(201).json({
            success: newProduct ? true : false,
            message: newProduct ? "Create success!" : 'Cannot create new product',
            createdProduct: newProduct ? newProduct : null
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const updateProduct = async (req, res) => {
    try {
        if (!req.params.id || Object.keys(req.body).length == 0) {
            return res.status(400).json({
                success: false,
                message: "Input required!"
            })
        }
        const newProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.status(201).json({
            success: newProduct ? true : false,
            message: newProduct ? "Update success!" : 'Cannot update product',
            createdProduct: newProduct ? newProduct : null
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({
                success: false,
                message: "Id required!"
            })
        }
        const product = await Product.findByIdAndDelete(req.params.id)
        return res.status(201).json({
            success: product ? true : false,
            message: product ? "Delete success!" : `Id:${req.params.id} not exists!`,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const detailProduct = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({
                success: false,
                message: "Id required!"
            })
        }
        const product = await Product.findById(req.params.id)
        return res.status(201).json({
            success: product ? true : false,
            message: product ? "Success!" : `Id:${req.params.id} not exists!`,
            product: product
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const getAllProduct = async (req, res) => {
    try {
        const product = await Product.find().select("-description -reviews")
        return res.status(201).json({
            success: product ? true : false,
            products: product ? product : null
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = { createProduct, updateProduct, deleteProduct, detailProduct, getAllProduct }