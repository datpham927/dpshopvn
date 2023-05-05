const Products = require("../models/Product")
const slugify = require("slugify")
const User = require("../models/User")


const createProducts = async (req, res) => {
    try {
        if (Object.keys(req.body).length == 0) {
            return res.status(400).json({
                success: false,
                message: "Input required!"
            })
        }
        const newProducts = await Product.create({ userId: req.userId, slug: slugify(req.body.title), ...req.body })
        if (newProduct) {
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
const updateProducts = async (req, res) => {
    try {
        if (!req.params.id || Object.keys(req.body).length == 0) {
            return res.status(400).json({
                success: false,
                message: "Input required!"
            })
        }
        const newProducts = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
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

const deleteProducts = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({
                success: false,
                message: "Id required!"
            })
        }
        const products = await Product.findByIdAndDelete(req.params.id)
        if (product) {
            const user = await User.findById(product.userId)
            user.totalProduct--
            user.save()
        }
        return res.status(201).json({
            success: products ? true : false,
            message: products ? "Delete success!" : `Id:${req.params.id} not exists!`,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const detailProducts = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({
                success: false,
                message: "Id required!"
            })
        }
        const products = await Product.findById(req.params.id)
        return res.status(201).json({
            success: products ? true : false,
            message: products ? "Success!" : `Id:${req.params.id} not exists!`,
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
        const newQueryString = JSON.parse(queriesString)
        if (req.query.title) {
            newQueryString.title = { $regex: req.query.title, $options: "i" }
        }
        const products = Product.find(newQueryString)

        if (req.query.sort) {
            const sortBy = req.query.sort.toString().replace(",", " ")
            products = products.sort(sortBy)
        } else {
            products = products.sort('-createdAt')
        }
        const limit = req.query.limit || 100
        const page = req.query.page || 0
        const skip = page * limit
        products = products.limit(limit).skip(skip)
        const newProducts = await products
        // const products = await Product.find().select("-description -reviews")
        return res.status(201).json({
            success: newProducts ? true : false,
            products: newProducts ? newProducts : null
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = { createProduct, updateProduct, deleteProduct, detailProduct, getAllProducts }