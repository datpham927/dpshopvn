const Order = require("../models/Order")
const Product = require("../models/Product")
const Cart = require("../models/Cart")
const User = require("../models/User")
const sendMail = require("../ulits/sendMail")
const autoCode = require("../ulits/autoCode")
const formatMoney = require("../ulits/formatMoney")

const createOrderProduct = async (req, res) => {
    try {
        if (!req.userId || Object.keys(req.body)?.length === 0) return res.status(403).json({
            success: false,
            message: "Input required!"
        })

        const { products, ...infoUser } = req.body

        //chứa sản phẩm thep shop
        // console.log("   req.body.products", infoProductInCart)
        let productByShop = [/* {shopId: "",products: [{_id:"",quantiTy:0}],totalPrice: 0 }*/]
        //kiểm tra product có đủ inStock không và chia order sản phẩm theo shop
        const checkProduct = await Promise.all(products?.map(async c => {
            //kiểm tra shopId đã có trong mảng hay chưa
            console.log(c)
            if (productByShop.some(p => p?.shopId === c?.shopId)) {
                //nếu có thì lấy ra và cập nhật lại product[] và price
                let pCart = productByShop.filter(p => p?.shopId === c?.shopId)[0]
                pCart.products.push({ _id: c?.productId._id, quantity: c.quantity })
                pCart.totalPrice += Number(c.totalPrice)
            } else {
                //nếu không exits thì thêm vào trong mảng
                productByShop.push({
                    shopId: c?.shopId,
                    products: [{ _id: c?.productId._id, quantity: c.quantity }],
                    totalPrice: Number(c.totalPrice),
                })
            }
            const product = await Product.findOneAndUpdate({ _id: c?.productId, inStock: { $gte: c?.quantity } }, {
                $inc: {
                    sold: +Number(c.quantity),
                    inStock: -Number(c.quantity),
                }
            })
            return {
                success: product ? true : false,
                message: product ? "Success" : c?.productId
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
            // xóa product trong cart
            await Cart.findOneAndDelete({ shopId: e?.shopId })
            return Order.create({
                user: req.userId,
                totalPrice: e.totalPrice,
                ...e,
                ...infoUser,
                dateShipping: Date.now() + 60 * 60 * ((Math.random() * 10) + 3) * 24 * 1000
            })
        }
        ))
        const currentUser = await User.findOne({ _id: req.userId })

        orderProduct.forEach((order, i) => {
            const code = order?._id?.toString().substr(-7);
            sendMail({
                email: currentUser.email,
                html: `<div>  
                <h3  style="color: cornflowerblue;">Đặt hàng thành công</h3>
                           <p>Đơn hàng: ${i + 1}</p>
                          <p style="text-transform: uppercase;"> Mã đơn hàng: ${code}</p>
                          <p> Thanh toán: ${formatMoney(order?.totalPrice)}</p>
                    </div>`,
                fullName: currentUser.lastName + " " + currentUser.firstName
            })
        })


        res.status(200).json({
            success: orderProduct ? true : false,
            data: orderProduct ? orderProduct : "null",
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
const isDelivering = async (req, res) => {
    try {
        const response = await Order.findByIdAndUpdate(req.params.oId, { isDelivering: true })
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

const isSuccessOrder = async (req, res) => {
    try {
        try {
            const response = await Order.findByIdAndUpdate(req.params.oId, { isSuccess: true })
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

//----------------------------------

const getAllOrdersBought = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.userId });
        const options = "-category_code -details -description -views -userId -images -userBought -infoProduct";
        const newOrder = await Promise.all(orders.map(async (order) => {
            const user = await User.findById(order?.shopId).select(("user", "_id", "email lastName firstName"))
            const products = await Promise.all(order.products.map(async (p) => {
                const product = await Product.findById(p._id).select(options);
                return {
                    ...product.toObject(),
                    quantity: p.quantity
                };
            })
            );
            return {
                ...order.toObject(),
                user,
                products
            };
        })
        );
        res.status(200).json({
            success: true,
            data: newOrder
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}




module.exports = {
    createOrderProduct,
    updateOrder,
    isConfirmOrder,
    isDelivering,
    isDeliveredOrder,
    isCanceledOrder,
    isSuccessOrder,
    getAllOrdersBought,
}