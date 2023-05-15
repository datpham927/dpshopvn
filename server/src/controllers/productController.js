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
        const limit = req.query.limit
        const page = req.query.page * 1 || 0
        const skip = page * limit
        products = products.limit(limit).skip(skip)
        const newProducts = await products
        const totalProducts = await Product.count()
        return res.status(201).json({
            success: newProducts ? true : false,
            totalPage: limit ? Math.ceil(totalProducts / limit) : 0,
            currentPage: page,
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
//insert products data
// const Bo_qua_tang = require("../../dataInsert/Bo-qua-tang.json")
// const Cham_soc_thu_cung = require("../../dataInsert/Cham-soc-thu-cung.json")
// const DJo_An_Vat = require("../../dataInsert/DJo-An-Vat.json")
// const DJo_Uong_Khong_Con = require("../../dataInsert/DJo-Uong-Khong-Con.json")
// const DJo_uong_Pha_che_dang_bot = require("../../dataInsert/DJo-uong-Pha-che-dang-bot.json")
// const DJo_uong_co_con = require("../../dataInsert/DJo-uong-co-con.json")
// const Gia_Vi_va_Che_Bien = require("../../dataInsert/Gia-Vi-va-Che-Bien.json")
// const Sua_va_cac_San_pham_tu_sua = require("../../dataInsert/Sua-va-cac-San-pham-tu-sua.json")
// const Thuc_pham_DJong_hop_va_Kho = require("../../dataInsert/Thuc-pham-DJong-hop-va-Kho.json")
// const data = [Bo_qua_tang,
//     Cham_soc_thu_cung, DJo_An_Vat,
//     DJo_Uong_Khong_Con, DJo_uong_Pha_che_dang_bot,
//     DJo_uong_co_con, Gia_Vi_va_Che_Bien,
//     Sua_va_cac_San_pham_tu_sua, Thuc_pham_DJong_hop_va_Kho,
// ]
// const convertArrToObject = require("../ulits/convertArrToObject")
// const { categories } = require("../ulits/const")
// const autoCode = require("../ulits/autoCode")
// const user = ["6450d1fb1d1397a25959dc17", "64611f6f10487bbfc0707e82"]
// const insertProductsData = async (req, res) => {
//     try {
//         const response = await Promise.all(data.map(async (p, i) => {
//             const categoryCode = await autoCode(categories[i].category)
//             return p.map(async (item, i) => {
//                 return await Product({
//                     image: item.images,
//                     title: item.title,
//                     slug: slugify(item.title),
//                     Star: item.star,
//                     sold: item.solid?.replace(".", ""),
//                     oldPrice: item.oldPrice?.replace(".", ""),
//                     newPrice: item.newPrice?.replace(".", ""),
//                     inStock: 1000,
//                     discount: item.discount,
//                     categoryCode: categoryCode,
//                     details: convertArrToObject(item.detail),
//                     userId: user[i % 2],
//                     description: item.description
//                 }).save()
//             })
//         }))
//         res.json(response ? response : false)

//     } catch (error) {
//         res.json({
//             err: error.message
//         })
//     }
// }


module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    detailProduct,
    getAllProducts,
    getAllProductFollowing,
    // insertProductsData
}