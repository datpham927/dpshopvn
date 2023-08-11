
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const reviewsRoutes = require('./reviewsRoutes');
const cartRoutes = require('./cartRoutes');
const orderRoutes = require('./orderRoutes');
const categoryRoutes = require('./categoryRoutes');
const searchRoutes = require('./searchRoutes');
const notificationRoutes = require('./notificationRoutes');
const conversationRoutes = require('./conversationRoutes');
const messageRoutes = require('./messageRoutes');
const notFound = require("../middlewares/notFound");

const routes = (app) => {
    app.use("/api/auth", authRoutes)
    app.use("/api/user", userRoutes)
    app.use("/api/product", productRoutes)
    app.use("/api/reviews", reviewsRoutes)
    app.use("/api/cart", cartRoutes)
    app.use("/api/order", orderRoutes)
    app.use("/api/category", categoryRoutes)
    app.use("/api/search", searchRoutes)
    app.use("/api/notification", notificationRoutes)
    app.use("/api/conversation", conversationRoutes)
    app.use("/api/message", messageRoutes)
    app.use(notFound)
}
module.exports = routes