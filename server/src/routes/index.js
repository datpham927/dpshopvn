
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const reviewsRoutes = require('./reviewsRoutes');
const cartRoutes = require('./cartRoutes');
const orderRoutes = require('./orderRoutes');
const notFound = require("../middlewares/notFound");

const routes = (app) => {
    app.use("/api/auth", authRoutes)
    app.use("/api/user", userRoutes)
    app.use("/api/product", productRoutes)
    app.use("/api/reviews", reviewsRoutes)
    app.use("/api/cart", cartRoutes)
    app.use("/api/order", orderRoutes)
    app.use(notFound)
}
module.exports = routes