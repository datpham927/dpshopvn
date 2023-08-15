const Cart = require("../models/Cart")




const addToCart = async (req, res) => {
    try {
        if(!req.userId)return  res.status(404).json({
            success: false,
            message: "false"
        })
        const cart = await Cart.findOne({ productId: req.body.productId })
        const option = "-userBought -description -infoProduct -star -images"
        if (cart) {
            const cart = await Cart.findOneAndUpdate({ productId: req.body.productId }, { ...req.body }, { new: true }).populate("productId", option)
            return res.status(200).json({
                success: cart ? true : false,
                message: cart ? "success" : 'failed',
                data: cart ? cart : null
            })
        }
        const newCart = await Cart.create({ user: req.userId, ...req.body })
        const populatedCart = await newCart.populate("productId",option)
        res.status(200).json({
            success: populatedCart ? true : false,
            message: populatedCart ? "success" : 'failed',
            data: populatedCart ? populatedCart : null
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const removeProductInCart = async (req, res) => {
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
module.exports = { addToCart, getProductCart, removeProductInCart }