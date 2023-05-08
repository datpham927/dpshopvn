const slugify = require("slugify")
const User = require("../models/User")
const Product = require("../models/Product")


const createProduct = async (req, res) => {
    try {
        if (Object.keys(req.body).length == 0) {
            return res.status(400).json({
                success: false,
                message: "Input required!"
            })
        }
        const newProducts = await Product.create({ userId: req.userId, slug: slugify(req.body.title), ...req.body })
        if (newProducts) {
            const user = await User.findById(req.userId)
            user.totalProduct++
            user.save()
        }
        return res.status(201).json({
            success: newProducts ? true : false,
            message: newProducts ? "Create success!" : 'Cannot create new product',
            createdProduct: newProducts ? newProducts : null
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
        if (!req.params.pid || Object.keys(req.body).length == 0) {
            return res.status(400).json({
                success: false,
                message: "Input required!"
            })
        }
        const newProducts = await Product.findByIdAndUpdate(req.params.pid, req.body, { new: true })
        return res.status(201).json({
            success: newProducts ? true : false,
            message: newProducts ? "Update success!" : 'Cannot update product',
            createdProduct: newProducts ? newProducts : null
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
        if (!req.params.pid) {
            return res.status(400).json({
                success: false,
                message: "Id required!"
            })
        }
        const product = await Product.findByIdAndDelete(req.params.pid)
        if (product) {
            const user = await User.findById(product.userId)
            user.totalProduct--
            user.save()
        }
        return res.status(201).json({
            success: product ? true : false,
            message: product ? "Delete success!" : `Id:${req.params.pid} not exists!`,
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
        if (!req.params.pid) {
            return res.status(400).json({
                success: false,
                message: "Id required!"
            })
        }
        const product = await Product.findById(req.params.pid)
        //cập nhật số lượng người truy cập
        if (product && !product.views.includes(req.userId)) {
            product.views.push(req.userId)
        }
        return res.status(201).json({
            success: product ? true : false,
            message: product ? "Success!" : `Id:${req.params.pid} not exists!`,
            product: product
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const getAllProducts = async (req, res) => {
    try {
        const queries = { ...req.query }
        const excludeFields = ["limit", "sort", "page"]
        excludeFields.forEach(field => delete queries[field])
        let queriesString = JSON.stringify(queries).replace(/\b(gte|gt|lte|lt)\b/g, el => `$${el}`)
        let newQueryString = JSON.parse(queriesString)
        if (req.query.title) {
            newQueryString.title = { $regex: req.query.title, $options: "i" }
        }
        if (req.query.category) {
            newQueryString.category = { category }
        }
        let products = Product.find(newQueryString).select("_id image title slug price discount userId solid")
        if (req.query.sort) {
            const sortBy = req.query.sort.toString().replace(",", " ")
            products = products.sort(sortBy)
        } else {
            products = products.sort('-createdAt')
        }
        const limit = req.query.limit || 100
        const page = req.query.page * 1 || 0
        const skip = page * limit
        products = products.limit(limit).skip(skip)
        const newProducts = await products
        const totalProducts = await Product.count()
        return res.status(201).json({
            success: newProducts ? true : false,
            totalPage: Math.ceil(totalProducts / limit),
            currentPage: page + 1,
            products: newProducts ? newProducts : null,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
// get product all ready following
const getAllProductFollowing = async (req, res) => {
    try {
        const currentUser = await User.findById(req.userId)
        const option = "-verificationEmailToken -passwordTokenExpires -updatedAt -password -cart"
        const allProduct = await Promise.all(
            currentUser.followings.map(e => {
                return Product.findOne({ userId: e }).populate("userId", option)
            })
        )
        res.status(200).json({
            success: allProduct ? true : false,
            message: allProduct ? "Success" : "Failed",
            products: allProduct ? allProduct : null
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    detailProduct,
    getAllProducts,
    getAllProductFollowing
}