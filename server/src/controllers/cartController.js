const Cart = require("../models/Cart")



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

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { addToCart, updateCart }