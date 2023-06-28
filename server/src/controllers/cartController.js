const Cart = require("../models/Cart")




const addToCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ productId: req.body.productId })
        if (cart) {
            const cart = await Cart.findOneAndUpdate({ productId: req.body.productId }, { ...req.body }, { new: true })
            return res.status(200).json({
                success: cart ? true : false,
                message: cart ? "success" : 'failed',
                data: cart ? cart : null
            })
        }
        const newCart = await Cart.create({ user: req.userId, ...req.body })
        res.status(200).json({
            success: newCart ? true : false,
            message: newCart ? "success" : 'failed',
            cart: newCart
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
        const option = "-userBought -description"
        const product = await Cart.find({ user: req.userId }).populate("productId", option)
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