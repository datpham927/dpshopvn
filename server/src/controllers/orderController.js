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
        let productByShop = [/* {shopId: "",products: [{_id:"",quantiTy:0}],totalPrice: 0 }*/]
        //kiểm tra product có đủ in_stock không và chia order sản phẩm theo shop
        const checkProduct = await Promise.all(products?.map(async c => {
            //kiểm tra shopId đã có trong mảng hay chưa
            await Cart.findOneAndDelete({ productId: c?.productId._id });
            if (productByShop.some(p => p?.shopId === c?.shopId)) {
                //nếu có thì lấy ra và cập nhật lại product[] và price
                let pCart = productByShop.filter(p => p?.shopId === c?.shopId)[0]
                pCart.products.push({ _id: c?.productId._id, quantity: c.quantity })
                pCart.totalPrice += Number(c.totalPrice)
            } else {
                //nếu không exits thì thêm vào trong mảng
                productByShop.push({
                    shippingPrice: c.shippingPrice,
                    shopId: c?.shopId,
                    products: [{ _id: c?.productId._id, quantity: c.quantity }],
                    totalPrice: Number(c.totalPrice),
                })
            }
            const product = await Product.findOneAndUpdate({ _id: c?.productId, in_stock: { $gte: c?.quantity } }, {
                $inc: {
                    sold: +Number(c.quantity),
                    in_stock: -Number(c.quantity),
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
            // Delete product from cart
            return Order.create({
                user: req.userId,
                ...e,
                ...infoUser,
                totalPrice: e.totalPrice + Number(req.body.shippingPrice),
                dateShipping: Date.now() + 60 * 60 * ((Math.random() * 10) + 3) * 24 * 1000
            });
        }));

        const currentUser = await User.findOne({ _id: req.userId })

        orderProduct.forEach((order, i) => {
            const code = order?._id?.toString().substr(-7);
            sendMail({
                email: currentUser.email,
                html: `<div>  
                <h3  style="color: cornflowerblue;">Đặt hàng thành công</h3>
                           <p>Đơn hàng: ${i + 1}</p>
                          <p style="text-transform: uppercase;"> Mã đơn hàng: ${code}</p>
                          <p> Thanh toán: ${formatMoney(order?.totalPrice + req.body.shippingPrice)}</p>
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
        const response = await Order.findByIdAndDelete(req.params.oid)
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



// ---------------------
const isConfirmOrder = async (req, res) => {
    try {
        const response = await Order.findByIdAndUpdate(req.params.oid, { is_confirm: true })
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

const isConfirmDeliveredOrder = async (req, res) => {
    try {
        const response = await Order.findOneAndUpdate({ _id: req.params.oid, is_confirm: true }, { is_confirm_delivery: true })
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
const isSuccessOrder = async (req, res) => {
    try {
        const order = await Order.findOneAndUpdate(
            { _id: req.params.oid, is_confirm_delivery: true },
            { is_success: true, is_delivering: true }
        );

        for (const p of order.products) {
            const check = await Product.findOne({ _id: p._id, userBought: { $in: [order.user] } });
            if (!check) {
                await Product.findByIdAndUpdate(p._id, { $push: { userBought: order.user } });
            }
        }
        res.status(200).json({
            success: order ? true : false,
            message: order ? order : "Failed!",
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
        const response = await Order.findByIdAndUpdate(req.params.oid, {
            is_canceled: true,
            is_confirm: false,
            is_delivery: false,
            is_confirm_delivery: false,
            is_success: false,
        })
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

const isBuyOrder = async (req, res) => {
    try {
        const response = await Order.findByIdAndUpdate(req.params.oid, { is_canceled: false })
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

//----------------------------------

const getAllOrdersBought = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 });
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
                shop: user,
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



const getAllOrdersBeenBought = async (req, res) => {
    try {
        const orders = await Order.find({ shopId: req.userId }).sort({ createdAt: -1 });
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
                shop: user,
                products
            };
        })
        );
        res.status(200).json({
            success: newOrder ? true : false,
            data: newOrder
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getDetailOrder = async (req, res) => {
    try {
        if (!req.params.oid) {
            return res.status(404).json({
                success: false,
                data: "oid required!"
            });
        } const options = "-category_code -details -description -views -userId -images -userBought -infoProduct";
        const orders = await Order.findById(req.params.oid)
        const products = await Promise.all(orders.products.map(async (p) => {
            const product = await Product.findById(p._id).select(options)
            return {
                ...product.toObject(),
                quantity: p.quantity
            };
        })
        );
        res.status(200).json({
            success: orders ? true : false,
            data: orders ? { ...orders.toObject(), products } : null
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
    isConfirmDeliveredOrder,
    isCanceledOrder,
    isSuccessOrder,
    getAllOrdersBought,
    isBuyOrder, getAllOrdersBeenBought,
    getDetailOrder
}