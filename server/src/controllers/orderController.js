const Order = require("../models/Order")
const Product = require("../models/Product")
const Cart = require("../models/Cart")

const createOrderProduct = async (req, res) => {
    try {
        if (!req.userId || Object.keys(req.body)?.length === 0) return res.status(403).json({
            success: false,
            message: "Input required!"
        })
        //trả về mảng các sản phẩm trong cart
        const infoProductInCart = await Promise.all(
            req.body.products.map(e => {
                return Cart.findOne({ productId: e })
            })
        )
        //chứa sản phẩm thep shop
        let productByShop = [/* {shopId: "",products: [],totalPrice: 0 }*/]
        //kiểm tra product có đủ inStock không và chia order sản phẩm theo shop
        const checkProduct = await Promise.all(infoProductInCart.map(async c => {
            //kiểm tra shopId đã có trong mảng hay chưa
            if (productByShop.some(p => p.shopId === c.shopId)) {
                //nếu có thì lấy ra và cập nhật lại product[] và price
                let pCart = productByShop.filter(p => p.shopId === c.shopId)[0]
                pCart.products.push(c.productId.toString())
                pCart.totalPrice += c.price
            } else {
                //nếu không exits thì thêm vào trong mảng
                productByShop.push({
                    shopId: c.shopId,
                    products: [c.productId.toString()],
                    totalPrice: c.price,
                })
            }
            const product = await Product.findOneAndUpdate({ _id: c.productId, inStock: { $gte: c.quantity } }, {
                $inc: {
                    sold: +c.quantity,
                    inStock: -c.quantity,
                }
            })
            return {
                success: product ? true : false,
                message: product ? "Success" : c.productId
            }
        }))
        const err = checkProduct.filter(e => e.success === false)
        if (err?.length > 0) {
            return res.status(401).json({
                success: false,
                message: `Sản phẩm có Id ${err.map(e => e.message).join(",")} không đủ hàng`
            })
        }
        const orderProduct = await Promise.all(productByShop.map(async e => {
            await Cart.findOneAndDelete({ shopId: e.shopId })
            return Order.create({
                createdby: req.userId,
                e,
                ...req.body,
                dateShipping: Date.now() + 5 * 24 * 60 * 60 * 1000
            })
        }
        ))

        res.status(200).json({
            success: orderProduct ? true : false,
            message: orderProduct ? orderProduct : "Failed!",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const updateOrder = async (req, res) => {
    try {
        const response = await Order.findByIdAndDelete(req.params.oId)
        res.status(200).json({
            success: response ? true : false,
            message: response ? "Success" : "Failed!",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const isConfirmOrder = async (req, res) => {
    try {
        const response = await Order.findByIdAndUpdate(req.params.oId, { isConfirm: true })
        res.status(200).json({
            success: response ? true : false,
            message: response ? "Success" : "Failed!",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const isHandleOrder = async (req, res) => {
    try {
        const response = await Order.findByIdAndUpdate(req.params.oId, { isHandle: true })
        res.status(200).json({
            success: response ? true : false,
            message: response ? "Success" : "Failed!",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const isDeliveredOrder = async (req, res) => {
    try {
        const response = await Order.findByIdAndUpdate(req.params.oId, { isDelivered: true })
        res.status(200).json({
            success: response ? true : false,
            message: response ? "Success" : "Failed!",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const isCanceledOrder = async (req, res) => {
    try {
        try {
            const response = await Order.findByIdAndUpdate(req.params.oId, { isCanceled: true })
            res.status(200).json({
                success: response ? true : false,
                message: response ? "Success" : "Failed!",
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    } catch (error) {

    }
}


module.exports = {
    createOrderProduct,
    updateOrder,
    isConfirmOrder,
    isHandleOrder,
    isDeliveredOrder,
    isCanceledOrder
}