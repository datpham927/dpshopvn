const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const core = require("cors")
require("dotenv").config()
const mongoose = require("mongoose")
const routes = require("./routes/index")

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }))
app.use(core({
    origin: "http://localhost:5173"
}));
app.use(cookieParser())
routes(app)
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("connected successfully!"))
    .catch(() => console.log("connection failed!"))

app.listen(process.env.PORT, () => {
    console.log("Server is ready!")
})