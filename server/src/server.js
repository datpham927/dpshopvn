const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config()
const mongoose = require("mongoose")
const routes = require("./routes/index")

const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }))
 
routes(app)
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("connected successfully!"))
    .catch(() => console.log("connection failed!"))

app.listen(process.env.PORT, () => {
    console.log("Server is ready!")
})