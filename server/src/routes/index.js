
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const notFound = require("../middlewares/notFound")

const routes = (app) => {
    app.use("/api/auth", authRoutes)
    app.use("/api/user", userRoutes)
    app.use(notFound)
}
module.exports = routes