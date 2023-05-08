const Cart = require("../models/Cart")
const Product = require("../models/Product")



const addToCart = async (req, res) => {
    try {
        const cart = await Cart.findOneAndUpdate({ userId: req.userId },
            { userId: req.userId, $push: { productId: req.body.productId } }, { new: true })
        res.status(200).json({
            success: cart ? true : false,
            message: cart ? "success" : 'failed'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateCart = async (req, res) => {
    try {
        const cart = await Cart.findOneAndDelete(req.params.pid)
        res.status(200).json({
            success: cart ? true : false,
            message: cart ? "Update success!" : "Update failed!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const getProductCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.userId })
        const product = await Promise.all(
            cart.productId.map(pid => {
                return Product.findById(pid)
            })
        )
        res.status(200).json({
            success: product ? true : false,
            products: product ? product : null
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
module.exports = { addToCart, updateCart, getProductCart }