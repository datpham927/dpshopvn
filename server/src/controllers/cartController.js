const Cart = require("../models/Cart")
const Order = require("../models/Order")
const Product = require("../models/Product")



const addToCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ productId: req.body.productId })
        if (cart) {
            cart.quantity = req.body.quantity
            cart.price == req.body.price
            cart.save()
            return res.status(200).json({
                success: cart ? true : false,
                message: cart ? "success" : 'failed',
                cart
            })
        }
        const newCart = await Cart.create({ userId: req.userId, ...req.body })
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
        const product = await Cart.find({ userId: req.userId }).populate("productId", option)
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