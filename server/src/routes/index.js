
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const notFound = require("../middlewares/notFound");
const Review = require('../models/Review');

const routes = (app) => {
    app.use("/api/auth", authRoutes)
    app.use("/api/user", userRoutes)
    app.use("/api/product", productRoutes)
    app.use("/api/review", async (req, res) => {
        await Review.create({
            rating: 5,
            comment: "hihih",
            product: "64526eb62ebe3142df315dc8"
        })
    })
    app.use(notFound)
}
module.exports = routes